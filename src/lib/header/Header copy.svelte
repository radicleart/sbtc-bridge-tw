<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Navbar, NavBrand, 
		NavLi, NavUl, Chevron, 
	} from 'flowbite-svelte'
	import Brand from './Brand.svelte'
	import Items from './Items.svelte'
	import Button from '$lib/components/ui/Button.svelte'
	import { sbtcConfig } from '$stores/stores';
	import type { SbtcConfig } from '$types/sbtc_config';
	import { goto } from "$app/navigation";
	import { isCoordinator } from '$lib/sbtc_admin.js'
	import { loginStacksJs } from '$lib/stacks_connect'
	import type { SbtcBalance } from 'sbtc-bridge-lib' 
	import { logUserOut, addresses } from '$lib/stacks_connect'
	import AccountMenu from './AccountMenu.svelte'
	import SettingsMenu from './SettingsMenu.svelte'

	const dispatch = createEventDispatcher();

	let activeClass = 'nav-link'
	let hidden = true;
	let dropdownOpen1 = false;
	let dropdownOpen2 = false;
	let showSettingsMenu = false;
	let showAccountMenu = false;
	let menuTarget:{ offsetTop: number; offsetLeft: number } | undefined;
	
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

	const coordinator = isCoordinator(addresses().stxAddress)
	const togglePeg = (pegin:boolean) => {
		const conf:SbtcConfig = $sbtcConfig;
		conf.pegIn = pegin;
		sbtcConfig.set(conf);
		(pegin) ? goto('/deposit') : goto('/withdraw');
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

	const openSettingsMenu = (e:any) => {
		showAccountMenu = false;
		if (menuTarget) {
			menuTarget = undefined;
			showSettingsMenu = false;
		} else {
			menuTarget = { offsetTop: e.target.offsetTop, offsetLeft: e.target.offsetLeft };
			console.log(menuTarget)
			showSettingsMenu = true;
		}
	}

	const openAccountMenu = (e:any) => {
		showSettingsMenu = false;
		if (showAccountMenu) {
			menuTarget = undefined;
			showAccountMenu = false;
		} else {
			menuTarget = { offsetTop: e.target.offsetTop, offsetLeft: e.target.offsetLeft };
			console.log(menuTarget)
			showAccountMenu = true;
		}
		menuTarget = { offsetTop: e.target.offsetTop, offsetLeft: e.target.offsetLeft };
	}

</script>
<div class="nav-wrapper">
	<div class="container" color="none">
		<Brand />
		<Items />
		<div class="flex order-3 ">
			<button on:click={toggle} type="button" class="focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400  hover:bg-gray-100 dark:hover:bg-gray-600 ml-3 md:hidden" aria-label="Open main menu"><span class="sr-only">Open main menu</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> </svg></button>
		</div>
		{#if !hidden}
		<div class="w-4/5 p-4 rounded-lg border border-gray-100 dark:border-gray-700 box1-shown order-2">
			<div id="navLinks" class="mb-4 w-full md:block md:w-auto">
				<ul class="flex flex-row md:flex-row justify-between md:space-x-8 md:mt-0 md:text-sm md:font-medium">
					<li class={activeClass}>
						<a href="/deposit"  on:click|preventDefault={() => togglePeg(true)}>Deposit</a>
					</li>
					<li class={activeClass}>
						<a href="/withdraw"  on:click|preventDefault={() => togglePeg(false)}>Withdraw</a>
					</li>
					<li class={activeClass}>
						<a href="/history">History</a>
					</li>
					{#if coordinator}
					<li class={activeClass}>
						<a href="/admin">Admin</a>
						
					</li>
					{/if}
				</ul>
			</div>
			<div id="navButtons" class="w-full md:block md:w-auto">
				<ul class="flex flex-row md:flex-row justify-around flex-row md:flex-row justify-between md:space-x-8 md:mt-0 md:text-sm md:font-medium">
					<Button btnName={'settings'}>
						<span on:keydown on:click={() => dropdownOpen1 = !dropdownOpen1} id="settings-menu" slot="label" class="text-yellow-300">
							Settings
							<span><svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.42602 1.4428L5.17822 5.94046C5.15517 5.96403 5.12767 5.9828 5.09732 5.99571C5.06639 6.00885 5.03313 6.01563 4.99953 6.01563C4.96593 6.01563 4.93266 6.00885 4.90174 5.99571C4.87138 5.9828 4.84389 5.96403 4.82084 5.94046L0.573036 1.4428L0.573051 1.44278L0.569843 1.43945C0.5239 1.39169 0.498795 1.32765 0.500045 1.2614C0.501295 1.19515 0.528798 1.1321 0.57651 1.08611L0.229535 0.726113L0.57619 1.08642C0.623943 1.04048 0.687983 1.01537 0.754236 1.01662C0.819795 1.01786 0.882215 1.0448 0.928072 1.09159L4.6356 5.02697L4.99953 5.41327L5.36346 5.02697L9.07346 1.08897L9.07353 1.08903L9.07987 1.08203C9.10235 1.05725 9.12957 1.03724 9.15993 1.02317C9.19029 1.0091 9.22316 1.00127 9.2566 1.00014C9.29004 0.999013 9.32336 1.00461 9.3546 1.01659C9.38584 1.02858 9.41435 1.04671 9.43845 1.06992C9.46255 1.09313 9.48175 1.12094 9.4949 1.1517C9.50806 1.18246 9.5149 1.21555 9.51504 1.24901C9.51517 1.28247 9.50858 1.31561 9.49567 1.34648C9.48276 1.37734 9.46378 1.40531 9.43987 1.4287L9.43281 1.43561L9.42602 1.4428Z" fill="white" stroke="url(#paint0_linear_3556_1643)"/>
								<defs>
								<linearGradient id="paint0_linear_3556_1643" x1="-1.61111" y1="3.50781" x2="3.08358" y2="9.21229" gradientUnits="userSpaceOnUse">
								<stop stop-color="#ED693C"/>
								<stop offset="0.9036" stop-color="#FEDB63"/>
								</linearGradient>
								</defs>
							</svg>
							</span>
						</span>
					</Button>
				{#if $sbtcConfig.loggedIn}
				<div class="h-{1}">&nbsp;</div>
				<Button btnName={'account'}>
					<span on:keydown on:click={() => dropdownOpen2 = !dropdownOpen2} id="account-menu" slot="label" class="mb-2">
						<span class="me-2">My Account</span>
						<svg width="11" height="9" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.42602 1.4428L5.17822 5.94046C5.15517 5.96403 5.12767 5.9828 5.09732 5.99571C5.06639 6.00885 5.03313 6.01563 4.99953 6.01563C4.96593 6.01563 4.93266 6.00885 4.90174 5.99571C4.87138 5.9828 4.84389 5.96403 4.82084 5.94046L0.573036 1.4428L0.573051 1.44278L0.569843 1.43945C0.5239 1.39169 0.498795 1.32765 0.500045 1.2614C0.501295 1.19515 0.528798 1.1321 0.57651 1.08611L0.229535 0.726113L0.57619 1.08642C0.623943 1.04048 0.687983 1.01537 0.754236 1.01662C0.819795 1.01786 0.882215 1.0448 0.928072 1.09159L4.6356 5.02697L4.99953 5.41327L5.36346 5.02697L9.07346 1.08897L9.07353 1.08903L9.07987 1.08203C9.10235 1.05725 9.12957 1.03724 9.15993 1.02317C9.19029 1.0091 9.22316 1.00127 9.2566 1.00014C9.29004 0.999013 9.32336 1.00461 9.3546 1.01659C9.38584 1.02858 9.41435 1.04671 9.43845 1.06992C9.46255 1.09313 9.48175 1.12094 9.4949 1.1517C9.50806 1.18246 9.5149 1.21555 9.51504 1.24901C9.51517 1.28247 9.50858 1.31561 9.49567 1.34648C9.48276 1.37734 9.46378 1.40531 9.43987 1.4287L9.43281 1.43561L9.42602 1.4428Z" fill="white" stroke="black"/>
						</svg>
					</span>
				</Button>
				{:else}
				<Button btnName={'connect'}>
					<span slot="label" on:keydown on:click={() => doLogin()}>
						<span class="me-0">Connect Wallet</span>
						<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.5 8.5C16.5 8.00272 16.3025 7.52581 15.9508 7.17417C15.5992 6.82254 15.1223 6.625 14.625 6.625H11.5C11.5 7.28804 11.2366 7.92393 10.7678 8.39277C10.2989 8.86161 9.66304 9.125 9 9.125C8.33696 9.125 7.70107 8.86161 7.23223 8.39277C6.76339 7.92393 6.5 7.28804 6.5 6.625H3.375C2.87772 6.625 2.40081 6.82254 2.04917 7.17417C1.69754 7.52581 1.5 8.00272 1.5 8.5M16.5 8.5V13.5C16.5 13.9973 16.3025 14.4742 15.9508 14.8258C15.5992 15.1775 15.1223 15.375 14.625 15.375H3.375C2.87772 15.375 2.40081 15.1775 2.04917 14.8258C1.69754 14.4742 1.5 13.9973 1.5 13.5V8.5M16.5 8.5V6M1.5 8.5V6M16.5 6C16.5 5.50272 16.3025 5.02581 15.9508 4.67417C15.5992 4.32254 15.1223 4.125 14.625 4.125H3.375C2.87772 4.125 2.40081 4.32254 2.04917 4.67417C1.69754 5.02581 1.5 5.50272 1.5 6M16.5 6V3.5C16.5 3.00272 16.3025 2.52581 15.9508 2.17417C15.5992 1.82254 15.1223 1.625 14.625 1.625H3.375C2.87772 1.625 2.40081 1.82254 2.04917 2.17417C1.69754 2.52581 1.5 3.00272 1.5 3.5V6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</Button>
				{/if}
				</ul>
			</div>
		</div>
		{:else}
		<div class="flex order-2">
			<NavUl class="md:space-x-2">
				<Button btnName={'settings'}><span on:keydown on:click={(event) => openSettingsMenu(event)} slot="label" class="text-yellow-300"><Chevron>Settings</Chevron></span></Button>
				{#if $sbtcConfig.loggedIn}
				<Button btnName={'account'}><span on:keydown on:click={(event) => openAccountMenu(event)} slot="label"><Chevron>My account</Chevron></span></Button>
				{:else}
				<Button btnName={'connect'}>
				<span slot="label" on:keydown on:click={() => doLogin()}>
					<span class="me-0">Connect Wallet</span>
					<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.5 8.5C16.5 8.00272 16.3025 7.52581 15.9508 7.17417C15.5992 6.82254 15.1223 6.625 14.625 6.625H11.5C11.5 7.28804 11.2366 7.92393 10.7678 8.39277C10.2989 8.86161 9.66304 9.125 9 9.125C8.33696 9.125 7.70107 8.86161 7.23223 8.39277C6.76339 7.92393 6.5 7.28804 6.5 6.625H3.375C2.87772 6.625 2.40081 6.82254 2.04917 7.17417C1.69754 7.52581 1.5 8.00272 1.5 8.5M16.5 8.5V13.5C16.5 13.9973 16.3025 14.4742 15.9508 14.8258C15.5992 15.1775 15.1223 15.375 14.625 15.375H3.375C2.87772 15.375 2.40081 15.1775 2.04917 14.8258C1.69754 14.4742 1.5 13.9973 1.5 13.5V8.5M16.5 8.5V6M1.5 8.5V6M16.5 6C16.5 5.50272 16.3025 5.02581 15.9508 4.67417C15.5992 4.32254 15.1223 4.125 14.625 4.125H3.375C2.87772 4.125 2.40081 4.32254 2.04917 4.67417C1.69754 5.02581 1.5 5.50272 1.5 6M16.5 6V3.5C16.5 3.00272 16.3025 2.52581 15.9508 2.17417C15.5992 1.82254 15.1223 1.625 14.625 1.625H3.375C2.87772 1.625 2.40081 1.82254 2.04917 2.17417C1.69754 2.52581 1.5 3.00272 1.5 3.5V6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</span>
				</Button>
				{/if}
			</NavUl>
		</div>
		<div {hidden} class="flex flex-grow order-1">
			<NavUl>
				<li class={activeClass}>
					<a href="/deposit"  on:click|preventDefault={() => togglePeg(true)}>Deposit</a>
				</li>
				<li class={activeClass}>
					<a href="/withdraw"  on:click|preventDefault={() => togglePeg(false)}>Withdraw</a>
				</li>
				<li class={activeClass}>
					<a href="/history">History</a>
				</li>
				{#if coordinator}
				<li class={activeClass}>
					<a href="/admin">Admin</a>
					
				</li>
				{/if}
		</NavUl>
		</div>
		{/if}
		{#if showSettingsMenu}<SettingsMenu {menuTarget}/>{/if}
		{#if showAccountMenu}<AccountMenu {menuTarget} on:init_logout={() => doLogout()}/>{/if}
	</div>
</div>

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
.container {
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
}
.frame3 {
	display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 95px;
height: 43px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}

.box1-shown {
	background-color: #000;
	position: absolute;
	top: 90px;
	right: 25px;
}
.nav-link {
	width: 48px;
	height: 20px;

	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	/* identical to box height, or 143% */

	letter-spacing: -0.02em;

	/* Base/White */

	color: #FFFFFF;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
}
.heading-2 {
	width: 98px;
	height: auto;
	/* xs/Light */
	font-family: 'Circular Std';
	font-style: normal;
	font-weight: 300;
	font-size: 12px;
	line-height: 16px;
	/* identical to box height, or 133% */
	color: #FFFFFF;
	/* Inside auto layout */
	flex: none;
	order: 1;
	flex-grow: 0;
}
.navbar-brand {
	width: 100px;
}
.text-gradient {
	width: 170px;
	height: 21px;
	margin-top: 10px;
	white-space: nowrap;
	font-style: normal;
	font-weight: 900;
	font-size: 18px;
	line-height: 18px;
	/* identical to box height, or 100% */
	letter-spacing: -1px;
	/* Gradients/Primary/01 */
	background: linear-gradient(306.12deg, #ED693C 21.1%, #FDC60B 84.08%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	/* Inside auto layout */
}


</style>
