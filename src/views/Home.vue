<template>
	<div class="view home">
		<NavBar />
		<div class="page-wrap min-w-screenx flex flex-col text-center px-5 py-5">
			<Branding />
			<List />
		</div>
	</div>
</template>

<script>
	import Branding from "../components/Branding.vue"
	import NavBar from "../components/NavBar.vue"
	import List from "../components/List.vue"

	export default {
		name: "Home",
		components: {
			Branding,
			NavBar,
			List,
		},
	}
</script>
