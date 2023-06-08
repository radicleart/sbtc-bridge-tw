<script lang="ts">
	import '../app.postcss';
	import "../sbtc.css";
	import Header from "$lib/header/Header.svelte";
	import Footer from "$lib/header/Footer.svelte";
	import { fetchSbtcData } from "$lib/bridge_api";
	import { fetchSbtcBalance, userSession, isLegal, makeFlash } from "$lib/stacks_connect";
	import { fetchUtxoSet, fetchCurrentFeeRates, fetchKeys } from "$lib/bridge_api";
	import { setConfig } from '$lib/config';
	import { beforeNavigate, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tick, onMount, onDestroy } from 'svelte';
	import { sbtcConfig } from '$stores/stores'
	import type { SbtcContractDataI, KeySet } from 'sbtc-bridge-lib';
	import type { SbtcConfig } from '$types/sbtc_config'
	import { defaultSbtcConfig } from '$lib/sbtc';
	import { COMMS_ERROR } from '$lib/utils.js'
	import { loginStacksJs } from '$lib/stacks_connect'

	console.log('process.env: ', import.meta.env);
	setConfig($page.url.search);
	const search = $page.url.search;
	beforeNavigate((nav) => {
		if (!isLegal(nav.to?.route.id || '')) {
			nav.cancel();
			loginStacksJs(initApplication);
			return;
		}
		const next = (nav.to?.url.pathname || '') + (nav.to?.url.search || '');
			if (nav.to?.url.search.indexOf('testnet') === -1 && search.indexOf('net=testnet') > -1) {
			nav.cancel();
			goto(next + '?net=testnet')
		}
	})
	export let data:SbtcContractDataI;
	const unsubscribe = sbtcConfig.subscribe((conf) => {});
	onDestroy(unsubscribe);
	//setUpMicroStacks();
	//setUpStacksJs();
	let inited = false;
	let errorReason:string|undefined;

	const initApplication = async () => {
		let conf = defaultSbtcConfig as SbtcConfig;
		if ($sbtcConfig) {
			conf = $sbtcConfig;
		}
		try {
			data = await fetchSbtcData();
			if (!data) data = defaultSbtcConfig.sbtcContractData;
			const keys:KeySet = await fetchKeys();
			conf.keys = keys;
			conf.loggedIn = false;
			if (userSession.isUserSignedIn()) {
				conf.loggedIn = true;
				await fetchSbtcBalance();
			}
			$sbtcConfig.sbtcContractData = data
			if ($sbtcConfig.sbtcContractData.sbtcWalletAddress && !$sbtcConfig.sbtcWalletAddressInfo) $sbtcConfig.sbtcWalletAddressInfo = await fetchUtxoSet(data.sbtcWalletAddress);
		} catch (err) {
			data = defaultSbtcConfig.sbtcContractData;
		}
		if (!$sbtcConfig.btcFeeRates) $sbtcConfig.btcFeeRates = await fetchCurrentFeeRates();
		conf.sbtcContractData = data;
		sbtcConfig.update(() => conf);
	}

	onMount(async () => {
		try {
			await initApplication();
			//await tick();
		} catch (err) {
			errorReason = COMMS_ERROR
			console.log(err)
		}
		inited = true;
	})
</script>

{#if inited}
<div class="page background text-white">
	<div class="header " style="z-index: 7;">
		<Header on:init_application={initApplication}></Header>
	</div>
	<div class="wrapper">
		<slot></slot>
	</div>
	<Footer></Footer>
</div>
{/if}

<style>
.page {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 32px 0px;
	gap: 40px;
	isolation: isolate;

	position: relative;
    min-height: 100%;
    margin: 0;

	/* Base/Gray/1000 */

	background: #121212;
}
.background {
  background-image: url("$lib/assets/bg-lines.png");
  background-size: cover;
}
.header {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;

	width: 100%;
	height: 91px;


	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
	z-index: 1;
}
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 48px 25px;
	gap: 10px;

	width: 100%;
	min-height: 60vh;
	min-height: 60vh;
	max-height: auto;
	flex: none;
	order: 2;
	flex-grow: 0;
	z-index: 2;
}

</style>