<template>
	<div class="view home">
		<NavBar />
		<div class="page-wrap min-w-screenx flex flex-col text-center px-5 py-5">
			<Branding />
			<List />
		</div>
		<Footer />
	</div>
</template>

<script>
	import Branding from "../components/Branding.vue"
	import Footer from "../components/Footer.vue"
	import NavBar from "../components/NavBar.vue"
	import List from "../components/List.vue"

	export default {
		name: "Home",
		components: {
			Branding,
			Footer,
			NavBar,
			List,
		},
	}
</script>
