<template>
	<div class="loading-shade"></div>
	<div class="container">
		<div class="gearbox">
			<div class="overlay"></div>
			<div class="gear one">
				<div class="gear-inner">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
			<div class="gear two">
				<div class="gear-inner">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
			<div class="gear three">
				<div class="gear-inner">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
			<div class="gear four large">
				<div class="gear-inner">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
		</div>
		<h1>Loading...</h1>
	</div>

</template>

<script>
</script>

<style scoped>
	body {
		background: #333;
		position: relative;
		height: 100%;
		margin: 0px;
	}

	@-webkit-keyframes clockwise {
		0% {
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-moz-keyframes clockwise {
		0% {
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes counter-clockwise {
		0% {
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-webkit-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}

	@-moz-keyframes counter-clockwise {
		0% {
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-webkit-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}

	.loading-shade {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100vw;
		height: 100vh;
		background-image: radial-gradient(#000000, #00000066);
		z-index: 98;
	}

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -100px;
		height: 150px;
		width: 200px;
		margin-top: -75px;
		z-index: 99;
	}

	.gearbox {
		background: #111;
		height: 150px;
		width: 200px;
		position: relative;
		border: none;
		overflow: hidden;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		-moz-box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
		-webkit-box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
		box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
	}

	.gearbox .overlay {
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		-moz-box-shadow: inset 0px 0px 20px black;
		-webkit-box-shadow: inset 0px 0px 20px black;
		box-shadow: inset 0px 0px 20px black;
		-moz-transition: background 0.2s;
		-o-transition: background 0.2s;
		-webkit-transition: background 0.2s;
		transition: background 0.2s;
	}

	.gearbox.turn .overlay {
		background: transparent;
	}

	.gear {
		position: absolute;
		height: 60px;
		width: 60px;
		-moz-box-shadow: 0px -1px 0px 0px #888888, 0px 1px 0px 0px black;
		-webkit-box-shadow: 0px -1px 0px 0px #888888, 0px 1px 0px 0px black;
		box-shadow: 0px -1px 0px 0px #888888, 0px 1px 0px 0px black;
		-moz-border-radius: 30px;
		-webkit-border-radius: 30px;
		border-radius: 30px;
	}

	.gear.large {
		height: 120px;
		width: 120px;
		-moz-border-radius: 60px;
		-webkit-border-radius: 60px;
		border-radius: 60px;
	}

	.gear.large:after {
		height: 96px;
		width: 96px;
		-moz-border-radius: 48px;
		-webkit-border-radius: 48px;
		border-radius: 48px;
		margin-left: -48px;
		margin-top: -48px;
	}

	.gear.one {
		top: 12px;
		left: 10px;
	}

	.gear.two {
		top: 61px;
		left: 60px;
	}

	.gear.three {
		top: 110px;
		left: 10px;
	}

	.gear.four {
		top: 13px;
		left: 128px;
	}

	.gear:after {
		content: "";
		position: absolute;
		height: 36px;
		width: 36px;
		-moz-border-radius: 36px;
		-webkit-border-radius: 36px;
		border-radius: 36px;
		background: #111;
		top: 50%;
		left: 50%;
		margin-left: -18px;
		margin-top: -18px;
		z-index: 3;
		-moz-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1), inset 0px 0px 10px rgba(0, 0, 0, 0.1), inset 0px 2px 0px 0px #090909, inset 0px -1px 0px 0px #888888;
		-webkit-box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1), inset 0px 0px 10px rgba(0, 0, 0, 0.1), inset 0px 2px 0px 0px #090909, inset 0px -1px 0px 0px #888888;
		box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1), inset 0px 0px 10px rgba(0, 0, 0, 0.1), inset 0px 2px 0px 0px #090909, inset 0px -1px 0px 0px #888888;
	}

	.gear-inner {
		position: relative;
		height: 100%;
		width: 100%;
		background: #555;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		-moz-border-radius: 30px;
		-webkit-border-radius: 30px;
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.large .gear-inner {
		-moz-border-radius: 60px;
		-webkit-border-radius: 60px;
		border-radius: 60px;
	}

	.gear.one .gear-inner {
		-webkit-animation: counter-clockwise 3s infinite linear;
		-moz-animation: counter-clockwise 3s infinite linear;
	}

	.gear.two .gear-inner {
		-webkit-animation: clockwise 3s infinite linear;
		-moz-animation: clockwise 3s infinite linear;
	}

	.gear.three .gear-inner {
		-webkit-animation: counter-clockwise 3s infinite linear;
		-moz-animation: counter-clockwise 3s infinite linear;
	}

	.gear.four .gear-inner {
		-webkit-animation: counter-clockwise 6s infinite linear;
		-moz-animation: counter-clockwise 6s infinite linear;
	}

	.gear-inner .bar {
		background: #555;
		height: 16px;
		width: 76px;
		position: absolute;
		left: 50%;
		margin-left: -38px;
		top: 50%;
		margin-top: -8px;
		-moz-border-radius: 2px;
		-webkit-border-radius: 2px;
		border-radius: 2px;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}

	.large .gear-inner .bar {
		margin-left: -68px;
		width: 136px;
	}

	.gear-inner .bar:nth-child(2) {
		-moz-transform: rotate(60deg);
		-ms-transform: rotate(60deg);
		-webkit-transform: rotate(60deg);
		transform: rotate(60deg);
	}

	.gear-inner .bar:nth-child(3) {
		-moz-transform: rotate(120deg);
		-ms-transform: rotate(120deg);
		-webkit-transform: rotate(120deg);
		transform: rotate(120deg);
	}

	.gear-inner .bar:nth-child(4) {
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.gear-inner .bar:nth-child(5) {
		-moz-transform: rotate(30deg);
		-ms-transform: rotate(30deg);
		-webkit-transform: rotate(30deg);
		transform: rotate(30deg);
	}

	.gear-inner .bar:nth-child(6) {
		-moz-transform: rotate(150deg);
		-ms-transform: rotate(150deg);
		-webkit-transform: rotate(150deg);
		transform: rotate(150deg);
	}

	h1 {
		font-family: "Helvetica";
		text-align: center;
		text-transform: uppercase;
		color: #888;
		font-size: 19px;
		padding-top: 10px;
		text-shadow: 1px 1px 0px #111;
	}
</style>