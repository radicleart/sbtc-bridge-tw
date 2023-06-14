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
	import { loginStacksJs, loggedIn } from '$lib/stacks_connect'

	let componentKey = 0;
	console.log('process.env: ', import.meta.env);
	setConfig($page.url.search);
	const search = $page.url.search;
	if (!isLegal(location.href)) {
		componentKey++;
		goto('/' + '?net=testnet')
	}
	beforeNavigate((nav) => {
		if (!isLegal(nav.to?.route.id || '')) {
			nav.cancel();
			loginStacksJs(initApplication);
			componentKey++;
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
			//if ($sbtcConfig.sbtcContractData.sbtcWalletAddress && !$sbtcConfig.sbtcWalletAddressInfo) $sbtcConfig.sbtcWalletAddressInfo = await fetchUtxoSet(data.sbtcWalletAddress);
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
	<div class="bg-gray-1000 bg-[url('$lib/assets/bg-lines.png')] bg-cover text-white font-extralight min-h-screen py-8">
		<div>
			<Header on:init_application={initApplication}></Header>
		</div>
		<div class="mx-auto p-6 lg:px-8 py-8">
			<slot></slot>
		</div>
		<Footer></Footer>
	</div>
{/if}
