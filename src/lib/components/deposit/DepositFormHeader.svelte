<script lang="ts">
import { onMount } from 'svelte';
import SwitchGraphic from './SwitchGraphic.svelte';

onMount(async () => {
})

</script>

<div class="flex w-full py-4 mt-5  align-baseline items-center">
  <div class="ps-6 grow">
    <span class="text-2xl font-medium">Deposit BTC</span>
  </div>
  <div class="">
    <SwitchGraphic />
  </div>
</div>
<style>

</style>