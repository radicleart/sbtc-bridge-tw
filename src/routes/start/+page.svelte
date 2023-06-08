<script lang="ts">
import { goto } from "$app/navigation";
import { sbtcConfig } from '$stores/stores';
import type { SbtcConfig } from '$types/sbtc_config'
import chevUp from '$lib/assets/box-w-chev.png';
import chevDown from '$lib/assets/box-d-chev.png';
import IntroFill from '$lib/components/shared/IntroFill.svelte'
import { breakpoint1 } from '$lib/utils'

const start = (pegin:boolean) => {
	const conf:SbtcConfig = $sbtcConfig;
	conf.pegIn = pegin;
	sbtcConfig.set(conf);
	(pegin) ? goto('/deposit') : goto('/withdraw');
}
$: innerWidth = 0
$: containerClass = (innerWidth < breakpoint1) ? 'container' : 'container-down';

</script>
<div class={containerClass}>
    <div class="frame14 pointer" on:keydown on:click={() => start(true)}>
        <div class="intro-fill"><IntroFill /></div>
        <div class="absolute">
            <div class="frame16">
                <div class="title">Deposit</div>
                <div class="subtitle">BTC to sBTC</div>
            </div>
            <div class="chevron"><img class="" src={chevDown} alt="Deposit" /></div>
        </div>
    </div>
    <div class="frame15 pointer" on:keydown on:click={() => start(false)}>
        <div class="intro-fill"><IntroFill /></div>
        <div class=" absolute">
            <div class="frame16">
                <div class="title">Withdraw</div>
                <div class="subtitle">sBTC to BTC</div>
            </div>
            <div class="chevron"><img class="" src={chevUp} alt="Withdraw" /></div>
        </div>
    </div>
</div>
<svelte:window bind:innerWidth />

<style>
.container {
    /* Container */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 64px;
    width: 100%;
    height: auto;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
.container-down {
    /* Container */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 64px;
    width: 100%;
    height: auto;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
.frame14 {
    /* Frame 14 */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 40px 80px;
    gap: 10px;
    isolation: isolate;
    width: 400px;
    height: 300px;
    /* Gradients/Primary/03 */
    background: linear-gradient(126.12deg, #D1DAFA 11.8%, #7F97F1 72.43%);
    border-radius: 24px;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
.frame15 {
    /* Frame 15 */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 40px 80px;
    gap: 10px;
    isolation: isolate;
    width: 400px;
    height: 300px;
    /* Gradients/Primary/01 */
    background: linear-gradient(306.12deg, #ED693C 21.1%, #FDC60B 84.08%);
    border-radius: 24px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}
.frame16 {
    /* Frame 16 */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 24px;
    width: 219px;
    height: 120px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
    z-index: 1;
}
.intro-fill {
    /* info-fill */
    position: relative;
    width: 32px;
    height: 32px;
    right: -180px;
    top: -124px;
    /* Inside auto layout */
    flex: none;
    order: 2;
    flex-grow: 0;
    z-index: 2;
}



.chevron {
    display: block;
    text-align: -webkit-center;
    position: absolute;
    top: -70px;
    right: 0px;
    left: 0px;
}
.title {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 900;
    font-size: 60px;
    line-height: 60px;
    color: #121212;
    text-align: center;
}
.subtitle {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #121212;
    text-align: center;
}
</style>
