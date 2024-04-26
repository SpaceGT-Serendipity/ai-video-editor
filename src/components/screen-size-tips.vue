<template>
	<section class="screen-size-tips">
		<div class="box box1">
			<h2>Scroll</h2>
		</div>
		<div class="box box2">
			<h2>Scroll</h2>
		</div>
		<h2>为了您的使用体验，窗口分辨率需高于<br />800 x 600</h2>
	</section>
</template>

<script setup>
	import {
		onMounted
	} from 'vue'

	onMounted(() => {
		const box1 = document.querySelector(".box1");

		const box2 = document.querySelector(".box2");

		// Depending on screen size how much the circles will grow?
		const modifier = window.innerWidth / 520;

		window.addEventListener("scroll", () => {
			const scrollY = window.scrollY;
			box1.style.clipPath = "circle(" + scrollY * modifier + "px at 0 0)";

			box2.style.clipPath = "circle(" + scrollY * modifier + "px at 100% 100%)";
		});

	})
</script>

<style scoped>
	.screen-size-tips {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 99;
	}

	section {
		--yellow: #ffcc33;
		--blue: #03a9f4;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: #333;
	}

	section .box {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	section .box.box1 {

		background-color: var(--yellow);
		clip-path: circle(10vw at 0 0);
	}

	section .box.box2 {
		background-color: var(--blue);
		clip-path: circle(8vw at 100% 100%);
	}

	section h2 {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 3vw;
		margin: 0;
		line-height: 6vw;
	}

	section .box.box1 h2 {
		color: transparent;
		-webkit-text-stroke: 3px #333;
	}

	section .box.box2 h2 {
		color: transparent;
		-webkit-text-stroke: 3px #333;
	}
</style>