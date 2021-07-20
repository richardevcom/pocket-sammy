<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "App",
	}
</script>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

	body {
		font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 14px;
		line-height: 1.2;
		color: #031b4e;
		font-weight: 400;
	}
</style>
