<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Brand from './Brand.svelte'
	import Items from './Items.svelte'
	import { sbtcConfig } from '$stores/stores';
	import type { SbtcConfig } from '$types/sbtc_config';
	import { goto } from "$app/navigation";
	import { loginStacksJs } from '$lib/stacks_connect'
	import { logUserOut } from '$lib/stacks_connect'
	import AccountMenu from './AccountMenu.svelte'
	import SettingsMenu from './SettingsMenu.svelte'
	import NavButton from './NavButton.svelte';

	const dispatch = createEventDispatcher();

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

<header>
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex items-center gap-x-12">
			<Brand />

			<div class="hidden lg:flex lg:gap-x-8">
				<Items class={'font-normal text-base text-white px-4 py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]'} on:clicked={navAction}/>
			</div>

			{#if showSettingsMenu}<SettingsMenu {menuTarget}/>{/if}
			{#if showAccountMenu}<AccountMenu {menuTarget} on:init_logout={() => doLogout()}/>{/if}
    </div>
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span class="sr-only">Open main menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex">
			<NavButton label={'Settings'} target={'settings'} on:clicked/>
			{#if $sbtcConfig.loggedIn}
				<NavButton label={'My Account'} target={'account'} on:clicked/>
			{:else}
				<NavButton label={'Connect Wallet'} target={'connect'} on:clicked/>
			{/if}
    </div>
  </nav>
  <!-- Mobile menu, show/hide based on menu open state. -->
  <div class="lg:hidden" role="dialog" aria-modal="true">
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0 z-10"></div>
    <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black-01 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between">
				<Brand />

        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Close menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
						<Items class={'-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-1000'} on:clicked={navAction}/>
          </div>
          <div class="py-6">
						<NavButton label={'Settings'} target={'settings'} on:clicked/>
						{#if $sbtcConfig.loggedIn}
							<NavButton label={'My Account'} target={'account'} on:clicked/>
						{:else}
							<NavButton label={'Connect Wallet'} target={'connect'} on:clicked/>
						{/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
