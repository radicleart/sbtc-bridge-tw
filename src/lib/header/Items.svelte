<script lang="ts">
import { isCoordinator } from '$lib/sbtc_admin.js'
import Item from './Item.svelte';
import NavButton from './NavButton.svelte';
import { addresses } from '$lib/stacks_connect'
import { sbtcConfig } from '$stores/stores';

const coordinator = isCoordinator(addresses().stxAddress)

</script>
<div class="items">
	<div class="wrapper">
		<Item label={'Deposit'} target={'/deposit'}/>
		<Item label={'Withdraw'} target={'/withdraw'}/>
		<Item label={'History'} target={'/transactions'}/>
		<Item label={'FAQ'} target={'/faq'}/>
		{#if coordinator}<Item label={'Admin'} target={'/admin'}/>{/if}
	</div>
	<div class="frame">
		<NavButton label={'Settings'} target={'settings'} on:clicked/>
		{#if $sbtcConfig.loggedIn}
		<NavButton label={'My Account'} target={'account'} on:clicked/>
		{:else}
		<NavButton label={'Connect Wallet'} target={'connect'} on:clicked/>
		{/if}
	</div>
</div>

<style>
.items {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	gap: 48px;

	width: 100%;
	height: 36px;


	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 1;
}
.wrapper {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	gap: 32px;

	width: 408px;
	height: 36px;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
}
.frame {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
	gap: 24px;

	width: 281px;
	height: 36px;


	/* Inside auto layout */

	flex: none;
	order: 1;
	flex-grow: 0;
}
</style>
