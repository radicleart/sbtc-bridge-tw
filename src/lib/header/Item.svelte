<script lang="ts">
export let label:string;
export let target:string;

</script>
<div class="item">
	<div class="button">
		<a href={target}>
		<span class="text">{label}</span>
		<span class="icon"></span>
		</a>
	</div>
</div>

<style>
.item {
	display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 80px;
height: 36px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}
.icon {
	display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 4px;

width: 80px;
height: 36px;

border-radius: 12px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
}
.button {
	display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 4px;

width: 80px;
height: 36px;

border-radius: 12px;

/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

}
.label {
	width: 48px;
height: 20px;

font-family: 'Circular Std';
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
.icon {
	display: none;
width: 20px;
height: 20px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;

}
</style>
