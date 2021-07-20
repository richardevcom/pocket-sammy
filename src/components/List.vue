<template>
	<div class="component list">
		<div v-for="url in urls" :key="url.id" class="bookmark w-full mx-auto border rounded bg-white shadow-sm text-gray-800 h-64 relative overflow-hidden min-w-80 max-w-3xl mb-5">
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "List",
		data() {
			return {
				urls: [],
			}
		},
		mounted() {
			this.getUrl("/api/urls")
		},
		methods: {
			async getUrl(url) {
				try {
					let response = await this.$http.get(url)
					this.urls = response.data
					this.urls.reverse()
				} catch (err) {
					console.log("Error", "Something Went Wrong while fetching API URL", "error")
					console.log(err)
				}
			},
		},
	}
</script>

<style lang="scss">
	.bookmark {
		border-color: #dfdfdf;

		h5 {
			color: #99a1b3;
			font-style: italic;
			display: inline-block;
			width: 100%;
			white-space: nowrap;
			overflow: hidden !important;
			text-overflow: ellipsis;
		}

		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			content: "";
			width: 100%;
			height: 100%;
			background-color: rgba(0, 105, 255, 0.9);
			z-index: 100;
			transition: all 0.075s cubic-bezier(0.17, 0.67, 0.83, 0.67);
			opacity: 0;

			.btn {
				color: #99a1b3;
				background-color: #031b4e;
				border-color: #010e28;
			}
		}

		&:hover {
			.overlay {
				opacity: 1;
			}
		}

		.thumb {
			background-repeat: no-repeat;
			background-position: center center;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
	}
</style>
