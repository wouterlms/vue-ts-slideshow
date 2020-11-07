<template>
	<div>
		<Nuxt />
	</div>
</template>

<style lang="scss">

body {
	background: $primary-light;
	color: $primary-dark;
}

body,
input,
textarea,
button {
	@include sans-serif;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

p {
    line-height: 1.6;
}

img {
    width: 100%;
	height: 100%;
	object-fit: cover;
}

// .default {

// 	&-enter-active,
// 	&-leave-active {
		
// 	}

// 	&-enter-active {
		
// 	}

// 	&-leave-active {
		
// 	}

// 	&-leave-to {
		
// 	}

// 	&-enter-to {
		
// 	}
// }

</style>
