<script lang="ts">
	export let label:string;
	export let target:string;

	let clazz = '';
  export {clazz as class};
</script>

<a href={target} class={clazz}>{label}</a>
