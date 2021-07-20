<template>
	<div class="brand relative p-10">
		<inline-svg class="inline-block" :src="require('../assets/pocket-sammy.svg')" width="100" height="100"></inline-svg>
		<h1 class="p-2">Pocket <span>Sammy</span></h1>
	</div>
</template>

<script>
	export default {
		name: "Branding",
	}
</script>

<style lang="scss">
	.brand {
		h1 {
			color: #031b4e;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 2px;

			span {
				color: #031b4e;
				font-weight: 800;
			}
		}
	}
</style>
