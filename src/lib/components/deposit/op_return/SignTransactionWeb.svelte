<script lang="ts">
import { onMount } from 'svelte';
import { createEventDispatcher } from "svelte";
import { hex, base64 } from '@scure/base';
import type { SigData } from 'sbtc-bridge-lib' 
import { openPsbtRequestPopup } from '@stacks/connect'
import * as btc from '@scure/btc-signer';
import { hexToBytes } from "@stacks/common";
import { sendRawTxDirectMempool } from '$lib/bridge_api';
import { sbtcConfig } from '$stores/stores';
import { truncate, explorerBtcAddressUrl, fmtSatoshiToBitcoin, convertOutputsBlockCypher } from "$lib/utils";
import type { PegInTransactionI } from '$lib/domain/PegInTransaction';
import type { PegOutTransactionI } from '$lib/domain/PegOutTransaction';
import { savePeginCommit } from '$lib/bridge_api';
import Button from '$lib/components/shared/Button.svelte';
import type { PeginRequestI } from 'sbtc-bridge-lib' 
import ArrowUpRight from '$lib/components/shared/ArrowUpRight.svelte';
import FileIcon from '$lib/components/shared/FileIcon.svelte';
import CopyClipboard from '$lib/components/common/CopyClipboard.svelte';
import { makeFlash } from "$lib/stacks_connect";

export let piTx: PegInTransactionI|PegOutTransactionI;

const dispatch = createEventDispatcher();
let sigData:SigData;
let currentTx:string;
let errorReason: string|undefined;
let cypherResp: any|undefined;
let peginRequest:PeginRequestI;

const getExplorerUrl = () => {
  return explorerBtcAddressUrl(piTx.pegInData.sbtcWalletAddress)
}
const getAddress = (chars:number) => {
  try {
			return truncate(piTx.pegInData.sbtcWalletAddress, chars).toUpperCase()
		} catch (err) {
      return 'not connected'
    }
	}

  const copy = (ele:string, val:string) => {
  let clippy = {
    target: document.getElementById('clipboard')!,
    props: { name: val },
  }
  const app = new CopyClipboard(clippy);
  app.$destroy();
  makeFlash(document.getElementById(ele))
}

export async function requestSignPsbt() {
  console.log(currentTx);
  openPsbtRequestPopup({
    hex: currentTx,
    appDetails: {
      name: 'My App',
      icon: window.location.origin + '/my-app-logo.svg',
    },
    onFinish(data:any) {
      broadcastTransaction(data.hex);
    },
    onCancel() {
      console.log('User cancelled operation');
      return;
    }
  });
}

const updateTransaction = () => {
  dispatch('update_transaction', { success: true });
}

let resp:any;
let broadcasted:boolean;
const broadcastTransaction = async (psbtHex:string) => {
  let errMessage = undefined;
  try {
    const tx = btc.Transaction.fromPSBT(hexToBytes(psbtHex));
    try {
      tx.finalize();
    } catch (err) {
      console.log('finalize error: ', err)
      errorReason = 'Unable to create the transaction - this can happen if your wallet is connected to a different account to the one your logged in with. Try hitting the \'back\` button, switching account in the wallet and trying again?';
      return;
    }
    const txHex = hex.encode(tx.toBytes(true, tx.hasWitnesses));
    currentTx = txHex;
    errorReason = undefined;
    resp = await sendRawTxDirectMempool(txHex);
    console.log('sendRawTxDirectMempool: ', resp);
    if (resp && resp.tx) {
      broadcasted = true;
      try {
        if ($sbtcConfig.userSettings.useOpDrop) {
          const peginRequest:PeginRequestI = piTx.getOpDropPeginRequest()
          await savePeginCommit(peginRequest)
        } else {
          const peginRequest:PeginRequestI = piTx.getOpReturnPeginRequest()
          peginRequest.status = 5;
          peginRequest.btcTxid = (resp.tx.hash) ? resp.tx.hash : resp.tx.txid;
          convertOutputsBlockCypher(resp.tx, peginRequest)
          await savePeginCommit(peginRequest);
          cypherResp = resp;
        }
      } catch (err) {
        console.log('Error saving pegin request', err)
        // duplicate.. ok to ignore
      }
    } else if (resp && resp.error) {
      errMessage = resp.error;
      broadcasted = false;
      errorReason = resp.error + ' Unable to broadcast transaction - please try hitting \'back\' and refreshing the bitcoin input data.'
    }
  } catch (err:any) {
    console.log('Broadcast error: ', err)
    errorReason = 'Request already being processed with these details - change the amount to send another request.'
    //errorReason = errMessage + '. Unable to broadcast transaction - please try hitting \'back\' and refreshing the bitcoin input data.'
  }
}
onMount(async () => {
	sigData = {
    webWallet: true,
		pegin: $sbtcConfig.pegIn,
		outputsForDisplay: piTx?.getOutputsForDisplay(),
		inputsForDisplay: piTx?.addressInfo.utxos
	}
  peginRequest = piTx.getOpDropPeginRequest();
  if ($sbtcConfig.userSettings.useOpDrop) {
    //testSignReveal(opDrop);
    const tx = piTx?.buildOpDropTransaction();
    currentTx = hex.encode(tx.toPSBT());

  } else {
    currentTx = hex.encode(piTx?.buildOpReturnTransaction().toPSBT());
  }
})
</script>
<div id="clipboard"></div>

<div class="flex w-full flex-wrap align-baseline items-start px-5">
  <div class="">
    {#if !broadcasted}
    <p class="text-lg">Sign and broadcast your transaction.</p>
    {/if}
  </div>
  <div class="qr-frame p-3  flex flex-col md:flex-row gap-y-8 w-full">
    <div class="grow flex flex-col gap-4 mb-5">
      <div class="flex align-baseline text-gray-300 p-1 bg-black-01 rounded-md border border-gray-700">
          <div id="address-field" class="grow ml-auto flex items-center">{getAddress(12)}</div>
          <ArrowUpRight class="-mr-0.5 h-5 w-5 text-white" target={explorerBtcAddressUrl(piTx.pegInData.sbtcWalletAddress)} />
          <FileIcon on:clicked={() => copy('address-field', piTx.pegInData.sbtcWalletAddress)} class={'-mr-0.5 h-5 w-5 text-white'}/>
      </div>
      <div class="flex text-gray-300 text-2xl">
        <div id="amount-field" class="grow ">{fmtSatoshiToBitcoin(piTx.pegInData.amount)}</div>
        <FileIcon on:clicked={() => copy('amount-field', '' + piTx.pegInData.amount)} class={'-mr-0.5 h-5 w-5 text-white'}/>
      </div>
      <div class="flex text-gray-300 text-2xl">
        <div class="grow ">BITCOIN</div>
      </div>
    </div>
  </div>
  {#if !broadcasted && !errorReason}
  <div class="mt-8 flex">
    <Button darkScheme={false} label={'Make changes'} target={'back'} on:clicked={() => updateTransaction()}/>
    <Button darkScheme={true} label={'Sign & broadcast'} target={'sign'} on:clicked={() => requestSignPsbt()}/>
  </div>
  {:else if broadcasted}
  <div class="my-3 text-2xl">
    <p>View transaction on the <a class="text-warning-700" href={getExplorerUrl()} target="_blank" rel="noreferrer">Bitcoin network</a>.</p>
    {#if peginRequest.requestType === 'deposit'}
    <p>Once confirmed your sBTC will be deposited to your Stacks Wallet. </p>
    {:else}
    <p>Once confirmed your sBTC will be withdrawn from your Stacks Account and your Bitcoin returned. </p>
    {/if}
  </div>
  <Button darkScheme={false} label={'Start over'} target={'next'} on:clicked={() => updateTransaction()}/>
  {:else if errorReason}
  <div class="">
    {#if errorReason}<div class="text-warning-400"><p>{errorReason}</p></div>{/if}
  </div>
  {/if}

</div>

