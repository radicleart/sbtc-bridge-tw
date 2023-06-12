<script lang="ts">
	import { isCoordinator } from '$lib/sbtc_admin.js'
	import Item from './Item.svelte';
	import { addresses } from '$lib/stacks_connect'

	let clazz = '';
  export {clazz as class};
	const coordinator = isCoordinator(addresses().stxAddress)
</script>

<Item class={clazz} label={'Deposit'} target={'/deposit'}/>
<Item class={clazz} label={'Withdraw'} target={'/withdraw'}/>
<Item class={clazz} label={'History'} target={'/transactions'}/>
<Item class={clazz} label={'FAQ'} target={'/faq'}/>
{#if coordinator}
	<Item class={clazz} label={'Admin'} target={'/admin'}/>
{/if}
