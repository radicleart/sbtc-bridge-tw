<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'
	import { createEventDispatcher } from "svelte";
	import Brand from './Brand.svelte'
	import { sbtcConfig } from '$stores/stores';
	import type { SbtcConfig } from '$types/sbtc_config';
	import { goto } from "$app/navigation";
	import { loginStacksJs } from '$lib/stacks_connect'
	import { logUserOut, addresses } from '$lib/stacks_connect'
	import AccountMenu from './AccountMenu.svelte'
	import NavButton from './NavButton.svelte';
	import { isCoordinator } from '$lib/sbtc_admin.js'
	import SettingsDropdown from './SettingsDropdown.svelte';

	const coordinator = isCoordinator(addresses().stxAddress)
	const dispatch = createEventDispatcher();

	const doLogout = () => {
		logUserOut();
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
		const res = await loginStacksJs(doLoginAfter);
		console.log(res)
	}

	const doLoginAfter = async (result:boolean) => {
		if (result) dispatch('init_application', { from: 'header' });
	}
</script>

<Navbar
	class="mx-auto flex max-w-7xl items-center !px-6 lg:px-8 !bg-transparent"
	navDivClass="flex flex-wrap justify-between md:justify-start items-center flex-1" let:hidden let:toggle fluid={true}>
  <NavBrand href="/">
		<Brand />
  </NavBrand>

	<div class="flex justify-between w-full md:w-auto mt-4 md:mt-0 md:order-2 gap-4">
		<div class="flex gap-2 md:gap-5">
			<SettingsDropdown />
			{#if $sbtcConfig.loggedIn}
				<NavButton label={'My account'} target={'account'} />
			{:else}
				<NavButton label={'Connect wallet'} target={'connect'} on:clicked={doLogin} />
			{/if}
		</div>
    <NavHamburger class="text-white hover:bg-gray-1000" on:click={toggle} />
  </div>


	<NavUl
		{hidden}
		class="order-1 md:flex-1"
		ulClass="dark:bg-black dark:md:bg-transparent md:border-0 border border-black flex flex-col p-4 mt-4 md:flex-row md:mt-0 md:text-sm md:font-medium !md:space-x-4"
	>
    <NavLi nonActiveClass="font-normal text-base text-white !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]" href="/deposit">Deposit</NavLi>
    <NavLi nonActiveClass="font-normal text-base text-white !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]" href="/withdraw">Withdraw</NavLi>
    <NavLi nonActiveClass="font-normal text-base text-white !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]" href="/transactions">History</NavLi>
    <NavLi nonActiveClass="font-normal text-base text-white !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]" href="/faq">FAQ</NavLi>
		{#if coordinator}
			<NavLi nonActiveClass="font-normal text-base text-white !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%]" href="/admin">Admin</NavLi>
		{/if}
  </NavUl>
</Navbar>
