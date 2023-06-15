<script lang="ts">
import { goto } from "$app/navigation";
import { sbtcConfig } from '$stores/stores';
import type { SbtcConfig } from '$types/sbtc_config'
import chevUp from '$lib/assets/box-w-chev.png';
import chevDown from '$lib/assets/box-d-chev.png';
import IntroFill from '$lib/components/shared/IntroFill.svelte'

const start = (pegin:boolean) => {
	const conf:SbtcConfig = $sbtcConfig;
	conf.pegIn = pegin;
	sbtcConfig.set(conf);
	(pegin) ? goto('/deposit') : goto('/withdraw');
}

</script>
<div class="mx-auto h-[calc(100vh-280px)] flex flex-col justify-center">
    <div class="mx-auto max-w-2xl">
        <div class="text-black-01 flex flex-col md:flex-row gap-10 ">
            <div class="background-chev-up bg-blue-500 w-80 h-80  aspect-square cursor-pointer flex rounded-lg flex-col align-middle" on:keydown on:click={() => start(true)}>
                <div class="p-2 self-end grow  text-black"><IntroFill class={'bg-black border-2 border-black rounded-full w-6 h-6'}/></div>
                <div class="self-center text-center grow">
                    <div class="text-3xl font-semibold text-gray-900">Deposit</div>
                    <div class="text-2xl text-gray-700">BTC to sBTC</div>
                </div>
                <div class="p-2 self-end grow">&nbsp;</div>
            </div>
            <div class="background-chev-down bg-warning-500 text-black-900 w-80 h-80 aspect-square cursor-pointer flex rounded-lg flex-col align-middle" on:keydown on:click={() => start(false)}>
                <div class="p-2 self-end grow  text-black"><IntroFill  class={'bg-black border-2 border-black rounded-full w-6 h-6'}/></div>
                <div class="self-center text-center grow">
                    <div class="text-3xl font-semibold text-gray-900">Withdraw</div>
                    <div class="text-2xl text-gray-700">sBTC to BTC</div>
                </div>
                <div class="p-2 self-end grow">&nbsp;</div>
            </div>
        </div>
    </div>
</div>
