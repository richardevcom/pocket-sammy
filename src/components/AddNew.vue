<template>
	<div>
		<div v-if="!isEditing" class="search-bar w-full mx-auto border rounded bg-white shadow-sm p-10 text-gray-800  relative overflow-hidden min-w-80 max-w-3xl mb-5">
			<div class="relative mt-1 flex">
				<input type="text" id="url" class="pl-3 pr-3 py-2 border rounded w-11/12" placeholder="Enter URL..." v-model="url.url" />
				<button type="submit" class="w-1/12" @click="saveUrl">
					<inline-svg class="inline-block" :src="require('../assets/plus.svg')" width="20" height="20"></inline-svg>
				</button>
			</div>
			<div class="absolute top-0 left-0 w-full h-2 flex">
				<div class="top-line h-2 flex-1"></div>
			</div>
		</div>

		<div v-if="isEditing" class="search-bar w-full mx-auto border rounded bg-white shadow-sm p-10 text-gray-800  relative overflow-hidden min-w-80 max-w-3xl mb-5">
			<div class="relative mt-1 flex flex-col">
				<input type="text" id="image" class="pl-3 pr-3 py-2 border rounded w-11/12 mb-3" placeholder="Edit image..." v-model="edit.image" />
				<input type="text" id="title" class="pl-3 pr-3 py-2 border rounded w-11/12 mb-3" placeholder="Edit title..." v-model="edit.title" />
				<input type="text" id="url" class="pl-3 pr-3 py-2 border rounded w-11/12 mb-8" placeholder="Edit url..." v-model="edit.url" />
				<button type="submit" class="w-full" @click="updateUrl">
					<inline-svg class="inline-block" :src="require('../assets/tick.svg')" width="30" height="30"></inline-svg>
				</button>
			</div>
			<div class="absolute top-0 left-0 w-full h-2 flex">
				<div class="top-line h-2 flex-1"></div>
			</div>
		</div>

		<div v-for="url in urls" :key="url._id" class="bookmark w-full mx-auto border rounded bg-white shadow-sm text-gray-800 h-64 relative overflow-hidden min-w-80 max-w-3xl mb-5">
			<div class="flex w-full h-full">
				<div class="w-1/3">
					<div class="thumb h-64 bg-cover rounded-l w-full h-full" :style="{ 'background-image': 'url(' + url.image + ')' }"></div>
				</div>
				<div class="py-12 px-6 w-2/3 m-auto">
					<h2 class="text-2xl text-gray-800 font-bold mb-1">{{ url.title }}</h2>
					<h5 class="text-base text-gray-500 font-medium">{{ url.url }}</h5>
				</div>
			</div>
			<div class="overlay absolute top-0 left-0 w-full h-full flex h-full justify-center items-center">
				<div class="relative w-full h-full flex h-full justify-center items-center">
					<a :href="url.url" target="_blank" class="btn border rounded px-3 py-2 m-1 bg-blue-700">
						<inline-svg class="inline-block" :src="require('../assets/url.svg')" width="20" height="20"></inline-svg>
					</a>

					<a @click="editUrl(url)" href="#" class="btn border rounded px-3 py-2 m-1 bg-blue-700">
						<inline-svg class="inline-block" :src="require('../assets/edit.svg')" width="20" height="20"></inline-svg>
					</a>

					<a @click="removeUrl(url._id)" href="#" class="btn border rounded px-3 py-2 m-1 bg-blue-700">
						<inline-svg class="inline-block" :src="require('../assets/trash.svg')" width="20" height="20"></inline-svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VueJwtDecode from "vue-jwt-decode"

	export default {
		name: "AddNew",
		data() {
			return {
				isEditing: false,
				user: {},
				url: {
					userId: "",
					title: "",
					url: "",
					image: "",
				},
				edit: {
					userId: "",
					title: "",
					url: "",
					image: "",
				},
				editId: "",
				urls: [],
				submitted: false,
			}
		},
		methods: {
			async saveUrl() {
				var data = {
					userId: String(this.user._id),
					title: "",
					url: this.url.url,
					image: "",
				}

				this.$http
					.post("/urls", data)
					.then((response) => {
						this.url.id = response.data.id
						this.userUrls("/urls/user/" + this.user._id)
						this.submitted = true
					})
					.catch((e) => {
						console.log(e)
					})
			},

			async updateUrl() {
				var data = {
					userId: String(this.user._id),
					title: this.edit.title,
					url: this.edit.url,
					image: this.edit.image,
				}

				this.$http
					.put("/urls/" + this.editId, data)
					.then((response) => {
						this.url.id = response.data.id
						this.userUrls("/urls/user/" + this.user._id)
						this.submitted = true
						this.isEditing = false
					})
					.catch((e) => {
						console.log(e)
					})
			},

			newUrl() {
				this.submitted = false
				this.url = {}
			},

			getUserDetails() {
				let token = localStorage.getItem("jwt")
				let decoded = VueJwtDecode.decode(token)
				this.user = decoded
			},

			editUrl(url) {
				this.editId = url._id
				this.edit.image = url.image
				this.edit.title = url.title
				this.edit.url = url.url
				this.isEditing = true
			},

			async userUrls(url) {
				try {
					let response = await this.$http.get(url)
					this.urls = response.data
					this.urls.reverse()
				} catch (err) {
					console.log("Error", "Something Went Wrong while fetching API URL", "error")
					console.log(err)
				}
			},

			async removeUrl(id) {
				try {
					await this.$http.delete("/urls/" + id)
					this.userUrls("/urls/user/" + this.user._id)
				} catch (err) {
					console.log("Error", "Something Went Wrong while fetching API URL", "error")
					console.log(err)
				}
			},
		},
		created() {
			this.getUserDetails()
		},
		mounted() {
			this.userUrls("/urls/user/" + this.user._id)
		},
	}
</script>

<style lang="scss">
	.search-bar {
		border-color: #dfdfdf;

		#search {
			border-color: #dfdfdf;
			font-size: 1rem;

			&:focus {
				outline: none !important;
			}
		}

		.top-line {
			background-color: #0069ff;
		}

		#search,
		.top-line {
			transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
		}
	}
</style>
