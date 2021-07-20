<template>
	<div class="view about">
		<NavBar />
		<div class="page-wrap min-w-screen flex flex-col text-center px-5 py-5">
			<div class="hero py-16">
				<!-- container -->
				<div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
					<!-- hero wrapper -->
					<div class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-3xl mx-auto">
						<!-- hero image -->
						<div class="hero-image col-span-6">
							<img src="../assets/sammy.png" />
						</div>
						<!-- hero text -->
						<div class="hero-text col-span-6">
							<h1 class="sammy font-bold text-3xl md:text-4xl max-w-xl text-left">
								Yo. I'm <span>Sammy</span><br />
								- and welcome to my <span>Pocket</span>.
							</h1>
						</div>

						<!-- hero image -->
						<div class="hero-image col-span-12 mt-16">
							<p class="text-base text-justify mb-3">
								<strong>Pocket Sammy</strong> is URL bookmarking app that was inspired by
								<a href="https://www.digitalocean.com/mongodb-hackathon" target="_blank"
									><abbr title="Digital Ocean MongoDB Hackathon"><i>DO's</i> hackathon</abbr></a
								>
								where contestants need to submit simple CRUD App that is running on <i>MongoDB</i>.
							</p>
							<p class="text-base text-justify mb-3">
								Since using <abbr title="Digital Ocean">DO</abbr>s services Sammy has always been there.. silently in background doing all the tasks that user requests. Since I always saw Sammy as a background task ninja, It didn't take
								long to realize that he has to be recognized! In a way I guess I wanted to say <i>"Thank you!"</i> to Sammy for all this time he has been working silently in background. But what
								<abbr title="Create, Read, Update and Delete">CRUD</abbr> App should I make? 🤔
							</p>
							<p class="text-base text-justify">
								<i>TODO</i> App? <i>User management</i>? <i>Blog</i>? Meh.. we've all been through countless <i>TODO</i> app tutorials and <abbr title="Create, Read, Update and Delete">CRUD</abbr> Apps. And then it clicked. Since I've
								always been crazy with bookmarking and pocketing URLs for later use I thought, why not create Pocket <abbr title="Create, Read, Update and Delete">CRUD</abbr> App? <i>Pocket Sammy</i>!? 🤯 That's it!
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- end hero -->
		</div>
	</div>
</template>

<script>
	import NavBar from "../components/NavBar.vue"

	export default {
		name: "About",
		components: {
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

		.sammy {
			span {
				color: #0248ff;
				font-weight: 800;
			}
		}
	}
</style>
