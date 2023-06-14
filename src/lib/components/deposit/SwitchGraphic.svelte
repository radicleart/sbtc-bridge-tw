<script lang="ts">
import { onMount } from 'svelte';
import BitcoinIcon from '../shared/BitcoinIcon.svelte';
import ArrowRightIcon from '../shared/ArrowRightIcon.svelte';
import SBtcIcon from '../shared/sBTCIcon.svelte';

onMount(async () => {
})

</script>

<div class="p-2 flex align-baseline items-center rounded-s-md border-t border-t-gray-900 border-b border-b-gray-900 border-s border-s-gray-900">
    <div class="w-14"><BitcoinIcon /></div>
    <div class="w-16 grow text-2xl font-medium">BTC</div>
    <div class="w-10"><ArrowRightIcon/></div>
    <div class="w-14"><SBtcIcon /></div>
    <div class="w-16 grow text-2xl font-medium">sBTC</div>
</div>
