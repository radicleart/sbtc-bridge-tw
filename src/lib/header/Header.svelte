<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Brand from './Brand.svelte'
	import Items from './Items.svelte'
	import { sbtcConfig } from '$stores/stores';
	import type { SbtcConfig } from '$types/sbtc_config';
	import { goto } from "$app/navigation";
	import { breakpoint1 } from '$lib/utils'
	import { loginStacksJs } from '$lib/stacks_connect'
	import { logUserOut } from '$lib/stacks_connect'
	import AccountMenu from './AccountMenu.svelte'
	import SettingsMenu from './SettingsMenu.svelte'

	const dispatch = createEventDispatcher();

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0
    $: hidden = innerWidth < breakpoint1;
	$: containerClass = (!hidden) ? 'container1' : 'container2';
	let showSettingsMenu = false;
	let showAccountMenu = false;
	let menuTarget:{ offsetTop: number; offsetLeft: number } | undefined;
	
	const navAction = (evt:any) => {
		const details = evt.detail;
		if (details.action === 'settings') {
			openSettingsMenu(details.menuTarget)
		} else if (details.action === 'account') {
			openAccountMenu(details.menuTarget)
		} else if (details.action === 'connect') {
			doLogin()
		}
	}
	const doLogout = () => {
		logUserOut(); 
		showSettingsMenu = false;
		showAccountMenu = false;
		menuTarget = undefined;
		sbtcConfig.update((conf:SbtcConfig) => {
			conf.loggedIn = false;
			conf.addressObject = undefined;
			conf.pegInTransaction = undefined;
			conf.pegOutTransaction = undefined;
			return conf;
		});
		goto('/')
	}

	const toggle = () => {
		// collapse menu
	}

	const doLogin = async () => {
		menuTarget = undefined;
		showSettingsMenu = false;
		showAccountMenu = false;
		const res = await loginStacksJs(doLoginAfter);
		console.log(res)
	}

	const doLoginAfter = async (result:boolean) => {
		if (result) dispatch('init_application', { from: 'header' });
	}

	const openSettingsMenu = (pos:{ offsetTop: number; offsetLeft: number }) => {
		showAccountMenu = false;
		if (menuTarget) {
			menuTarget = undefined;
			showSettingsMenu = false;
		} else {
			menuTarget = pos;
			console.log(menuTarget)
			showSettingsMenu = true;
		}
	}

	const openAccountMenu = (pos:{ offsetTop: number; offsetLeft: number }) => {
		showSettingsMenu = false;
		if (showAccountMenu) {
			menuTarget = undefined;
			showAccountMenu = false;
		} else {
			menuTarget = pos;
			console.log(menuTarget)
			showAccountMenu = true;
		}
	}

</script>
<div class="nav-wrapper">
	{#if !hidden}
	<div class={containerClass} color="none">
		<Brand />
		<Items on:clicked={navAction}/>
		{#if showSettingsMenu}<SettingsMenu {menuTarget}/>{/if}
		{#if showAccountMenu}<AccountMenu {menuTarget} on:init_logout={() => doLogout()}/>{/if}
	</div>
	{:else}
	<div class={containerClass}>
		<Brand />
		<div class="flex order-3 ">
			<button on:click={toggle} type="button" class="focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400  hover:bg-gray-100 dark:hover:bg-gray-600 ml-3" aria-label="Open main menu"><span class="sr-only">Open main menu</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> </svg></button>
		</div>
	</div>
	{/if}
</div>
<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />
  
<style>
.nav-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px 215px;
	gap: 10px;

	width: 100%;
	height: 91px;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
}
.container1 {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 64px;

	width: 100%;
	height: 43px;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
	justify-content: center;
}
.container1 {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px;
	gap: 64px;

	width: 100%;
	height: 43px;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
	justify-content: center;
}
.container2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;
		gap: 64px;

		min-width: 200%;
		height: 43px;


		/* Inside auto layout */

		flex: none;
		order: 0;
		flex-grow: 0;
		justify-content: space-around;
}

</style>
