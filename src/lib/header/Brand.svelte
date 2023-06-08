<script lang="ts">
import logoWhite from '$lib/assets/Stacks Logo White.png';


</script>
<div class="frame">
	<div class="logo">
		<a href="/"><img width="100%" height="60px" class="nav-logo" src={logoWhite} alt="sBTC Bridge" /></a>
	</div>
	<div class="text-gradient">sBTC Bridge</div>
</div>

<style>
.frame {
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
.logo {
	width: 87.37px;
	height: 17px;


	/* Inside auto layout */

	flex: none;
	order: 0;
	flex-grow: 0;
}
.text-gradient {
	width: 95px;
	height: 18px;

	font-family: 'Circular Std';
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

	flex: none;
	order: 1;
	flex-grow: 0;
}
</style>
