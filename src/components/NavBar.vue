<template>
	<nav class="component navbar">
		<div class="container mx-auto py-4 flex items-center flex-no-wrap max-w-3xl">
			<div class="w-full w-auto flex-grow flex items-center">
				<ul class="flex flex-row items-center">
					<li>
						<router-link class="block px-4 py-1 p-2 lg:px-4" to="/" title="Link" active-class="text-do-blue" exact>All URLs</router-link>
					</li>
					<li v-if="loggedIn">
						<router-link to="/account" class="block px-4 py-1 p-2 lg:px-4" active-class="text-do-blue">Your URLs</router-link>
					</li>
					<li>
						<router-link to="/about" class="block px-4 py-1 p-2 lg:px-4" active-class="text-do-blue">Help</router-link>
					</li>
				</ul>

				<ul class="flex flex-row items-center ml-auto">
					<li v-if="loggedIn">
						<a href="#" class="block px-4 py-1 p-2 lg:px-4" @click="logOut">Logout</a>
					</li>
					<li v-if="!loggedIn">
						<router-link class="block px-4 py-1 p-2 lg:px-4" to="/login">Register</router-link>
					</li>
					<li v-if="!loggedIn">
						<router-link class="block px-4 py-1 p-2 lg:px-4" to="/login">Login</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: "NavBar",
		data: () => {
			return {
				loggedIn: false,
			}
		},
		methods: {
			logOut() {
				localStorage.removeItem("jwt")
				this.$router.go()
			},
		},
		mounted() {
			if (localStorage.getItem("jwt") !== null) {
				this.loggedIn = true
			}
		},
	}
</script>

<style lang="scss">
	.text-do-blue {
		color: #0069ff;
	}
</style>
