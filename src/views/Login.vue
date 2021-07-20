<template>
	<div class="view login">
		<div class="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center">
			<div class="content text-3xl text-center md:text-left">
				<h1 class="text-5xl text-blue-500 font-bold">Pocket Sammy</h1>
				<p class="mt-1">Let <i>Sammy</i> put your URLs in the pocket. 😉</p>
			</div>
			<div class="container mx-auto flex flex-col items-center">
				<form class="shadow-sm border rounded w-80 p-4 flex flex-col bg-white" @submit.prevent>
					<input id="email" type="text" placeholder="E-mail" class="mb-3 py-3 px-4 border rounded" v-model="input.email" />
					<input id="password" type="password" placeholder="Password" class="mb-3 py-3 px-4 border rounded" v-model="input.password" />
					<button class="signin w-full text-white p-3 rounded border mb-3" type="submit" @click="loginUser()">Login</button>
					<button class="signup w-full text-white p-3 rounded border" type="submit" @click="registerUser()">Register</button>
				</form>
				<router-link to="/" class="text-center text-sm my-4"> ← Return back to <span class="font-semibold text-center w-full">Home</span> </router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				input: {
					email: "",
					password: "",
				},
			}
		},
		methods: {
			async loginUser() {
				try {
					let response = await this.$http.post("/api/login", this.input)
					let token = response.data.token
					localStorage.setItem("jwt", token)
					if (token) {
						console.log("Success", "Login Successful", "success")
						this.$router.push("/")
					}
				} catch (err) {
					console.log("Error", "Something Went Wrong", "error")
					console.log(err)
				}
			},
			async registerUser() {
				try {
					let response = await this.$http.post("/api/register", this.input)
					let token = response.data.token
					if (token) {
						localStorage.setItem("jwt", token)
						this.$router.push("/")
						console.log("Success", "Registration Was successful", "success")
					} else {
						console.log("Error", "Something Went Wrong", "error")
					}
				} catch (err) {
					let error = err.response
					if (error.status == 409) {
						console.log("Error", error.data.message, "error")
					} else {
						console.log("Error", error.data.err.message, "error")
					}
				}
			},
		},
	}
</script>

<style lang="scss">
	.login {
		background-color: #e5e8ed !important;

		.content {
			h1 {
				color: #031b4e;
			}
		}

		form {
			border-color: #dfdfdf;

			input {
				border-collapse: #dfdfdf;
			}

			button {
				font-weight: 600;
				font-size: 1.125rem;

				&.signin {
					border-color: #0069ff;
					color: #0069ff;
				}

				&.signup {
					background-color: #0069ff;
					border-color: #0069ff;
				}
			}
		}

		input {
			outline: none !important;
		}
	}
</style>
