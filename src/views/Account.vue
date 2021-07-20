<template>
	<div class="view account">
		<NavBar />

		<div class="page-wrap min-w-screen flex flex-col text-center px-5 py-5">
			<Branding />
			<AddNew />
		</div>
	</div>
</template>

<script>
	import AddNew from "../components/AddNew.vue"
	import Branding from "../components/Branding.vue"
	import NavBar from "../components/NavBar.vue"

	export default {
		name: "Account",
		components: {
			AddNew,
			Branding,
			NavBar,
		},
	}
</script>

<style lang="scss">
	.page-wrap {
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
	}
</style>
