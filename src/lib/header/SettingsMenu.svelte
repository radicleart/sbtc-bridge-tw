<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { CONFIG, setConfig } from '$lib/config';
	import { truncate } from '$lib/utils'
	import { sbtcConfig } from '$stores/stores';
	import { onMount } from 'svelte';
	import type { SbtcConfig } from '$types/sbtc_config';
	import { fetchSbtcBalance, addresses } from '$lib/stacks_connect'

	export let menuTarget:{ offsetTop: number; offsetLeft: number } | undefined;
	let inited = false;
	let style:string;
	const dispatch = createEventDispatcher();

	const getContractAddress = () => {
		const contract = CONFIG.VITE_SBTC_CONTRACT_ID
		return truncate(contract.split('.')[0]) + '.' + contract.split('.')[1]
	}
	const getAddress = () => {
		if ($sbtcConfig?.sbtcContractData?.sbtcWalletAddress) {
			return truncate($sbtcConfig.sbtcContractData.sbtcWalletAddress)
		}
		return 'not connected'
	}
	const toggleSettings = (arg:string) => {
		const conf:SbtcConfig = $sbtcConfig;
		if (typeof conf.userSettings === 'undefined') {
			conf.userSettings = {
				useOpDrop: false,
				debugMode: false,
				testAddresses: false
			}
		}
		if (arg === 'txmode') conf.userSettings.useOpDrop = !conf.userSettings.useOpDrop;
		if (arg === 'debug') conf.userSettings.debugMode = !conf.userSettings.debugMode;
		if (arg === 'testAddresses') conf.userSettings.testAddresses = !conf.userSettings.testAddresses;
		sbtcConfig.update(() => conf);
	}

	const toggleNetwork = async () => {
		let net = 'mainnet';
		if ('mainnet' === CONFIG.VITE_NETWORK) net = 'testnet';
		setConfig(net);
		await fetchSbtcBalance();
		sbtcConfig.update((conf:SbtcConfig) => {
			conf.stxAddress = addresses().stxAddress;
			if (conf.pegInTransaction) {
				conf.pegInTransaction.fromBtcAddress = addresses().ordinal;
				if (conf.pegInTransaction.pegInData) conf.pegInTransaction.pegInData.stacksAddress = addresses().stxAddress;
			}
			if (conf.pegOutTransaction) {
				conf.pegOutTransaction.fromBtcAddress = addresses().ordinal;
			}
			return conf;
		});
		const url = new URL(location.href);
		url.searchParams.set('net', net);
		location.assign(url.search);
	}

	onMount(async () => {
		if (menuTarget && menuTarget.offsetLeft) {
			//style = "position: absolute; top: " + 120 + "; right: " + 120;
			style = "transform: translate3d(" + (menuTarget.offsetLeft - 290) + "px, " + (40 + menuTarget.offsetTop) + "px, 0px); position: absolute; inset: 0px auto auto 0px; margin: 0px; ";
			inited = true;
		} else {
			style = "transform: translate3d(" + 623.636 + "px, " + 102.2727 + "px, 0px); position: absolute; inset: 0px auto auto 0px; margin: 0px; ";
		}
	})
</script>

{#if inited}
<div role="tooltip" tabindex="-1" id="account" 
	class="menu-box rounded border-gray-100 dark:border-gray-700 shadow-md outline-none divide-y divide-gray-100 dark:divide-gray-600" 
	data-popper-placement="bottom" 
	{style}>
	<div class="menu-panel grid grid-cols-6 gap-1 border-none">
		<div class="col-span-2 menu-text-col1">Network:</div>
		<div class="col-span-2 menu-badge-bg grow"><div class="menu-text-col2">{CONFIG.VITE_NETWORK}</div></div>
		<div class="col-span-2 w-full text-right" style="text-align: -webkit-right;">
			<div class="menu-switcher pointer" on:keydown on:click={() => toggleNetwork()}>
				<span class="menu-switcher-text ">Switch</span>
				<span>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.50008 1.16657L8.50014 1.1665L10.8333 3.33296L10.8335 3.33323L10.8333 3.3335L8.50018 5.49993L8.50016 5.49994L8.50014 5.49995L8.50013 5.49994L8.50011 5.49993L8.5001 5.49992L8.5001 5.4999L8.50011 5.49988L8.50012 5.49987L8.50037 5.49963L9.90037 4.19963L10.8334 3.33323L9.90037 2.46684L8.50037 1.16684L8.50008 1.16657ZM3.50015 6.49984L3.50021 6.4999L3.49992 6.50017L2.09992 7.80017L1.16688 8.66657L2.09992 9.53296L3.49992 10.833L3.50018 10.8332L3.50019 10.8332L3.50019 10.8332L3.50019 10.8332L3.50018 10.8333L3.50017 10.8333L3.50015 10.8333L3.50013 10.8333L3.50012 10.8333L1.16704 8.66684L1.16675 8.66657L1.16704 8.6663L3.50015 6.49984ZM2.97861 7.66657L3.84015 6.86657L0.826813 8.2999C0.776328 8.34671 0.736052 8.40343 0.708508 8.46653C0.680965 8.52962 0.666748 8.59772 0.666748 8.66657C0.666748 8.73541 0.680965 8.80351 0.708508 8.86661C0.736052 8.9297 0.776328 8.98643 0.826813 9.03323L3.16015 11.1999C3.2083 11.2445 3.26477 11.2793 3.32634 11.3021C3.38792 11.3249 3.45338 11.3354 3.519 11.3329C3.58462 11.3304 3.64911 11.3151 3.70879 11.2877C3.76847 11.2603 3.82216 11.2214 3.86681 11.1732C3.91146 11.1251 3.94619 11.0686 3.96901 11.007C3.99184 10.9455 4.00231 10.88 3.99984 10.8144C3.99736 10.7488 3.98198 10.6843 3.95458 10.6246C3.92718 10.5649 3.8883 10.5112 3.84015 10.4666L2.97861 9.66657H2.44015V9.16657L2.78037 8.80017L3.17495 9.16657H8.16681C8.29942 9.16657 8.4266 9.11389 8.52037 9.02012C8.61413 8.92635 8.66681 8.79918 8.66681 8.66657C8.66681 8.53396 8.61413 8.40678 8.52037 8.31301C8.4266 8.21925 8.29942 8.16657 8.16681 8.16657H3.17495L2.78037 8.53296L2.44015 8.16657V7.66657H2.97861Z" fill="white" stroke="white"/>
					</svg>
				</span>
			</div>
		</div>
	</div>
	<div class="menu-panel grid grid-cols-6 gap-3 border-none">
		<div class="col-span-2 menu-text-col1">sBTC Contract:</div>
		<div class="col-span-3 menu-text-col2">{getContractAddress()}</div>
		<div class="col-span-1 text-right">
			<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.5 9H8.625M5.5 11.5H8.625M5.5 14H8.625M11.125 14.625H13C13.4973 14.625 13.9742 14.4275 14.3258 14.0758C14.6775 13.7242 14.875 13.2473 14.875 12.75V4.09C14.875 3.14417 14.1708 2.34167 13.2283 2.26333C12.9167 2.23749 12.6047 2.21526 12.2925 2.19667M12.2925 2.19667C12.3478 2.3759 12.3751 2.56243 12.375 2.75C12.375 2.91576 12.3092 3.07473 12.1919 3.19194C12.0747 3.30915 11.9158 3.375 11.75 3.375H8C7.655 3.375 7.375 3.095 7.375 2.75C7.375 2.5575 7.40417 2.37167 7.45833 2.19667M12.2925 2.19667C12.0567 1.43167 11.3433 0.875 10.5 0.875H9.25C8.84937 0.875094 8.45929 1.00345 8.13688 1.24128C7.81448 1.47911 7.57669 1.81392 7.45833 2.19667M7.45833 2.19667C7.145 2.21583 6.83333 2.23833 6.52167 2.26333C5.57917 2.34167 4.875 3.14417 4.875 4.09V5.875M4.875 5.875H2.0625C1.545 5.875 1.125 6.295 1.125 6.8125V16.1875C1.125 16.705 1.545 17.125 2.0625 17.125H10.1875C10.705 17.125 11.125 16.705 11.125 16.1875V6.8125C11.125 6.295 10.705 5.875 10.1875 5.875H4.875ZM3.625 9H3.63167V9.00667H3.625V9ZM3.625 11.5H3.63167V11.5067H3.625V11.5ZM3.625 14H3.63167V14.0067H3.625V14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
	<div class="menu-panel grid grid-cols-6 gap-3 border-none">
		<div class="col-span-2 menu-text-col1">sBTC Wallet:</div>
		<div class="col-span-3 menu-text-col2">{getAddress()}</div>
		<div class="col-span-1 text-right">
			<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.5 9H8.625M5.5 11.5H8.625M5.5 14H8.625M11.125 14.625H13C13.4973 14.625 13.9742 14.4275 14.3258 14.0758C14.6775 13.7242 14.875 13.2473 14.875 12.75V4.09C14.875 3.14417 14.1708 2.34167 13.2283 2.26333C12.9167 2.23749 12.6047 2.21526 12.2925 2.19667M12.2925 2.19667C12.3478 2.3759 12.3751 2.56243 12.375 2.75C12.375 2.91576 12.3092 3.07473 12.1919 3.19194C12.0747 3.30915 11.9158 3.375 11.75 3.375H8C7.655 3.375 7.375 3.095 7.375 2.75C7.375 2.5575 7.40417 2.37167 7.45833 2.19667M12.2925 2.19667C12.0567 1.43167 11.3433 0.875 10.5 0.875H9.25C8.84937 0.875094 8.45929 1.00345 8.13688 1.24128C7.81448 1.47911 7.57669 1.81392 7.45833 2.19667M7.45833 2.19667C7.145 2.21583 6.83333 2.23833 6.52167 2.26333C5.57917 2.34167 4.875 3.14417 4.875 4.09V5.875M4.875 5.875H2.0625C1.545 5.875 1.125 6.295 1.125 6.8125V16.1875C1.125 16.705 1.545 17.125 2.0625 17.125H10.1875C10.705 17.125 11.125 16.705 11.125 16.1875V6.8125C11.125 6.295 10.705 5.875 10.1875 5.875H4.875ZM3.625 9H3.63167V9.00667H3.625V9ZM3.625 11.5H3.63167V11.5067H3.625V11.5ZM3.625 14H3.63167V14.0067H3.625V14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
	<div class="grid grid-cols-6 gap-3 border-none pt-3">
		<div class="col-span-2 p-3">
			{#if $sbtcConfig.userSettings?.useOpDrop}
			<label class="relative inline-flex items-center cursor-pointer">
				<input  on:click|preventDefault={() => toggleSettings('txmode')} type="checkbox" value="" class="sr-only peer" checked>
				<div style="background: #ED693C;" class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
			</label>
			{:else}
			<label class="relative inline-flex items-center cursor-pointer">
				<input  on:click|preventDefault={() => toggleSettings('txmode')} type="checkbox" value="" class="sr-only peer">
				<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
			</label>
			{/if}
		</div>
		<div class="col-span-4 p-3">
			<div class="menu-settings-1">Tx Mode</div>
			<div class="menu-settings-2">{#if $sbtcConfig.userSettings?.useOpDrop}Using OP_DROP Mechanism{:else}Using OP_RETURN Mechanism{/if}</div>
		</div>
	</div>
	<div class="grid grid-cols-6 gap-3 border-none pt-3">
		<div class="col-span-2 p-3">
			{#if $sbtcConfig.userSettings?.debugMode}
			<label class="relative inline-flex items-center cursor-pointer">
				<input  on:click|preventDefault={() => toggleSettings('debug')} type="checkbox" value="" class="sr-only peer" checked>
				<div style="background: #ED693C;" class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
			</label>
			{:else}
			<label class="relative inline-flex items-center cursor-pointer">
				<input  on:click|preventDefault={() => toggleSettings('debug')} type="checkbox" value="" class="sr-only peer">
				<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
			</label>
			{/if}
		</div>
		<div class="col-span-4 p-3">
			<div class="menu-settings-1">Debug Mode</div>
			<div class="menu-settings-2">{#if $sbtcConfig.userSettings?.debugMode}Showing advanced info{:else}Advanced info off{/if}</div>
		</div>
	</div>
</div>
{/if}

<style>
	
</style>
