<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { PegInTransactionI } from '$lib/domain/PegInTransaction';
import type { PegOutTransactionI } from '$lib/domain/PegOutTransaction';

export let piTx: PegInTransactionI|PegOutTransactionI;

const dispatch = createEventDispatcher();
let errorReason:string|undefined;
let pegAmount:number = piTx.pegInData.amount;

const changeFee = (maxValue:boolean) => {
  errorReason = undefined;
  try {
    const rate = piTx.fees.find((o) => o === piTx.fee);
    dispatch('amount_updated', { opCode:'user', error: false, newAmount: pegAmount, newFeeRate: rate });
  } catch(err:any) {
    errorReason = err||'Amount is not valid';
  }
}

const changeRate = (event:any) => {
  const rate = event.detail.newFeeRate;
  dispatch('amount_updated', { opCode:'prio', error: false, newAmount: pegAmount, newFeeRate: rate });
}

$: low = amtData.fee === amtData.fees[0];
$: medium = amtData.fee === amtData.fees[1];
$: high = amtData.fee === amtData.fees[2];

function init(el:any) {
    el.focus()
}

</script>

<div class="row">
  <div class="col-12">
    <label for="transact-path" class="d-flex justify-content-between">
      <span>{amtData.label}</span>
      <span class="pointer text-info" data-bs-toggle="tooltip-ftux" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="The amount of Bitcoin you want to swap for sBTC. The bitcoin is locked in the protocol and you convert your sBTC back to Bitcoin when you peg out."></span>
    </label>
    <input use:init type="number" id="from-address" class="form-control" autocomplete="off" bind:value={pegAmount}  on:input={() => changeFee(false)}/>
    <div class="text-small">{amtData.info}</div>
    <!--
    <div class="text-small d-flex justify-content-end  text-info">
      {#if amtData.change > 0}<span><a href="/" class="" on:click|preventDefault={() => changeFee(true)}>set max</a></span>{/if}
    </div>
    {#if errorReason}<div class="text-danger">{errorReason}</div>{/if}
    <FeeDisplay {amtData} currentPeg={pegAmount} on:fee_rate_updated={changeRate}/>
    -->
  </div>
</div>

<style>
</style>