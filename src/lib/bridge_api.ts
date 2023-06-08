import { CONFIG } from '$lib/config';
import type { PeginRequestI, WrappedPSBT, AddressObject } from 'sbtc-bridge-lib' 

function addNetSelector (path:string) {
  if (CONFIG.VITE_NETWORK === 'testnet' || CONFIG.VITE_NETWORK === 'devnet') {
    return path.replace('bridge-api', 'bridge-api/testnet');
  } else {
    return path.replace('bridge-api', 'bridge-api/mainnet');
  }
}
async function fetchCatchErrors(path:string) {
  try {
    const response = await fetch(path);
    return response;
  } catch (err:any) {
    console.log('fetchCatchErrors: ', err)
    return new Response(undefined, {
      status: 505,
    }) 
  }
}

async function extractResponse(response:any) {
  try {
    return await response.json();
  } catch(err) {
    try {
      return await response.text();
    } catch(err) {
      console.log('error fetching response.. ', err)
    }
  }
}

export async function sendRawTxDirectMempool(hex:string) {
  //const url = CONFIG.VITE_MEMPOOL_EXPLORER + '/tx';
  const url = addNetSelector(CONFIG.VITE_BLOCKCYPHER_EXPLORER + '/txs/push');
  console.log('sendRawTx:mempoolUrl: ', url)
  const response = await fetch(url, {
    method: 'POST',
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({tx: hex})
  });
  //if (response.status !== 200) console.log('Mempool error: ' + response.status + ' : ' + response.statusText);
  try {
    return await response.json();
  } catch (err) {
    try {
      console.log(err)
      return await response.text();
    } catch (err1) {
      console.log(err1)
    }
  }
  return 'success';
}

export async function sendRawTransaction(tx: { hex: string; }) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/sendrawtx');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx)
  });

  if (response.status !== 200) {
    console.log('Bitcoin tx send error.');
  }
  return await extractResponse(response);
}

export async function fetchKeys() {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/keys');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  const res = await extractResponse(response);
  return res;
}

export async function signAndBroadcast(wrappedPsbt:WrappedPSBT) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/signAndBroadcast');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wrappedPsbt)
  });
  let res:any;
  try {
    res = await response.json();
  } catch (err) {
    try {
      console.log(err)
      res = await response.text();
    } catch (err1) {
      console.log(err1)
    }
  }
  return res;
}

export async function sign(wrappedPsbt:WrappedPSBT) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/sign');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wrappedPsbt)
  });
  let res:any;
  try {
    res = await response.json();
  } catch (err) {
    try {
      console.log(err)
      res = await response.text();
    } catch (err1) {
      console.log(err1)
    }
  }
  return res;
}

export async function fetchBurnBlockCount() {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/blocks/count');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  const txs = await extractResponse(response);
  return txs;
}

export async function fetchWalletProcessPsbt(psbt: { hex: string; }) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/wallet/walletprocesspsbt');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(psbt)
  });
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  const signedPsbt = await extractResponse(response);
  return signedPsbt;
}

export async function savePeginCommit(peginRequest:PeginRequestI):Promise<any> { //<PeginRequestI|{insertedId:string; acknowledged:boolean;}>  {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/pegins');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(peginRequest)
  });
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  const signedPsbt = await extractResponse(response);
  return signedPsbt;
}
export async function fetchPeginById(_id:string):Promise<PeginRequestI> {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/pegins/' + _id);
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Commit not found.');
  }
  const pegin = await extractResponse(response);
  return pegin;
}

export async function doPeginScan():Promise<Array<PeginRequestI>> {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/pegin-scan');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Unable to scan.');
  }
  const pegins = await extractResponse(response);
  return pegins;
}

export async function fetchPegins():Promise<Array<PeginRequestI>> {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/pegins');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Request failed to url: ' + path);
    return [];
  }
  const pegins = await extractResponse(response);
  return pegins;
}

export async function fetchPeginsByStacksAddress(stxAddress:string):Promise<Array<PeginRequestI>> {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/pegins/search/' + stxAddress);
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Request failed to url: ' + path);
    return [];
  }
  const pegins = await extractResponse(response);
  return pegins;
}

export async function fetchCurrentFeeRates() {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/blocks/fee-estimate');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    return {
        feeInfo: {
          low_fee_per_kb: 19226,
          medium_fee_per_kb: 29679,
          high_fee_per_kb: 44424
        }
    }
  }
  const txs = await response.json();
  return txs;
}

export async function fetchTransaction(txid:string) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/' + txid);
  const response = await fetchCatchErrors(path);
  //if (response.status !== 200) {
  // console.log('Bitcoin tx not known - is the network correct?');
  //}
  return await extractResponse(response);
}

export async function fetchTransactionHex(txid:string) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/tx/' + txid + '/hex');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Bitcoin hex not known - is the network correct?');
  }
  return await extractResponse(response);
}

export async function fetchAddressTransactions(address:string) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/wallet/address/' + address + '/txs');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  return await extractResponse(response);
}

export async function fetchUtxoSet(address:string) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/btc/wallet/address/' + address + '/utxos?verbose=true');
  const response = await fetchCatchErrors(path);
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  return await extractResponse(response);
}

export async function fetchSbtcEvents() {
  try {
    const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/events/0');
    const response = await fetchCatchErrors(path);
    return await extractResponse(response);
  } catch (err) {
    return [];
  }
}

export async function fetchSbtcWalletAddress() {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/wallet-address');
  const response = await fetchCatchErrors(path);
  return await extractResponse(response);
}

export async function fetchSbtcData() {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/data');
  try {
    const response = await fetchCatchErrors(path);
    return await extractResponse(response);
  } catch(err) {
    return {}
  }
}

export async function fetchUserSbtcBalance(stxAddress:string) {
  try {
    const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/address/' + stxAddress + '/balance');
    const response = await fetch(path);
    return await extractResponse(response);
  } catch (err) {
    return { balance: 0 };
  }
}
export async function fetchUserBalances(adrds:AddressObject) {
  const path = addNetSelector(CONFIG.VITE_BRIDGE_API + '/sbtc/address/balances');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adrds)
  });
  if (response.status !== 200) {
    console.log('Bitcoin address not known - is the network correct?');
  }
  const res = await extractResponse(response);
  return res;
}
