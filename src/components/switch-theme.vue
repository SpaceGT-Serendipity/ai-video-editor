<template>
	<div class="switch-theme">
		<label class="switch">
			<input class="switch__input" type="checkbox" role="switch" v-model="checkbox" @change="onSwitchTheme">
			<svg class="switch__icon switch__icon--light" viewBox="0 0 12 12" width="12px" height="12px"
				aria-hidden="true">
				<g fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round">
					<circle cx="6" cy="6" r="2" />
					<g stroke-dasharray="1.5 1.5">
						<polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
						<polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
					</g>
				</g>
			</svg>
			<svg class="switch__icon switch__icon--dark" viewBox="0 0 12 12" width="12px" height="12px"
				aria-hidden="true">
				<g fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="round" transform="rotate(-45,6,6)">
					<path
						d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
				</g>
			</svg>
			<span class="switch__sr">Dark Mode</span>
		</label>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const checkbox = ref(true)

	const onSwitchTheme = () => {
		const html = document.querySelector('html')
		console.log(checkbox.value)
		if (checkbox.value) {
			html.classList.add('dark')
		} else {
			html.classList.remove('dark')
		}
	}
</script>

<style>
	:root {
		--hue: 223;
		--bg: hsl(var(--hue), 10%, 90%);
		--fg: hsl(var(--hue), 10%, 10%);
		--primary: hsl(var(--hue), 90%, 50%);
		--trans-dur: 0.3s;
		--trans-timing: cubic-bezier(0.76, 0.05, 0.24, 0.95);
		--trans-timing-in: cubic-bezier(0.76, 0.05, 0.86, 0.06);
		--trans-timing-out: cubic-bezier(0.05, 0.76, 0.06, 0.86);
	}

	input {
		color: var(--fg);
		font: 18px sans-serif;
	}

	.switch-theme {
		position: relative;
		width: 52px;
	}


	.switch {
		margin: auto;
		position: relative;
		vertical-align: sub;
	}

	.switch__icon,
	.switch__input {
		display: block;
	}

	.switch__icon {
		position: absolute;
		top: 6px;
		right: 3px;
		width: 14px;
		height: 14px;
		transition:
			opacity calc(var(--trans-dur) / 2),
			transform calc(var(--trans-dur) / 2);
	}

	.switch__icon polyline {
		transition: stroke-dashoffset calc(var(--trans-dur) / 2);
	}

	.switch__icon--light,
	.switch__icon--light polyline {
		transition-delay: calc(var(--trans-dur) / 2);
		transition-timing-function: var(--trans-timing-out);
	}

	.switch__icon--dark {
		opacity: 0;
		transform: translateX(-0.75em) rotate(30deg) scale(0.75);
		transition-timing-function: var(--trans-timing-in);
	}

	.switch__input {
		background-color: hsl(210, 90%, 70%);
		border-radius: 0.75em;
		box-shadow:
			0 0 0 0.125em hsla(var(--hue), 90%, 50%, 0),
			0.125em 0.125em 0.25em hsla(var(--hue), 90%, 10%, 0.2);
		outline: transparent;
		position: relative;
		width: 3em;
		height: 1.5em;
		-webkit-appearance: none;
		appearance: none;
		-webkit-tap-highlight-color: transparent;
		transition:
			background-color var(--trans-dur) var(--trans-timing),
			box-shadow 0.15s linear;
	}

	.switch__input:focus-visible {
		box-shadow:
			0 0 0 0.125em hsl(var(--hue), 90%, 50%),
			0.125em 0.125em 0.25em hsla(var(--hue), 90%, 10%, 0.2);
	}

	.switch__input:before,
	.switch__input:after {
		content: "";
		display: block;
		position: absolute;
	}

	.switch__input:before {
		background-color: hsl(50, 90%, 50%);
		border-radius: inherit;
		mask-image: linear-gradient(120deg, hsl(0, 0%, 0%) 20%, hsla(0, 0%, 0%, 0) 80%);
		-webkit-mask-image: linear-gradient(120deg, hsl(0, 0%, 0%) 20%, hsla(0, 0%, 0%, 0) 80%);
		inset: 0;
		transition: background-color var(--trans-dur) var(--trans-timing);
	}

	.switch__input:after {
		background-color: hsl(0, 0%, 100%);
		border-radius: 50%;
		box-shadow: 0.05em 0.05em 0.05em hsla(var(--hue), 90%, 10%, 0.1);
		top: 0.125em;
		left: 0.125em;
		width: 1.25em;
		height: 1.25em;
		transition:
			background-color var(--trans-dur) var(--trans-timing),
			transform var(--trans-dur) var(--trans-timing);
		z-index: 1;
	}

	.switch__input:checked {
		background-color: hsl(290, 90%, 40%);
	}

	.switch__input:checked:before {
		background-color: hsl(220, 90%, 40%);
	}

	.switch__input:checked:after {
		background-color: hsl(0, 0%, 0%);
		transform: translateX(1.5em);
	}

	.switch__input:checked~.switch__icon--light,
	.switch__input:checked~.switch__icon--light polyline {
		transition-delay: 0s;
		transition-timing-function: var(--trans-timing-in);
	}

	.switch__input:checked~.switch__icon--light {
		opacity: 0;
		transform: translateX(-0.75em) rotate(-30deg) scale(0.75);
	}

	.switch__input:checked~.switch__icon--light polyline {
		stroke-dashoffset: 1.5;
	}

	.switch__input:checked~.switch__icon--dark {
		opacity: 1;
		transform: translateX(-1.5em);
		transition-delay: calc(var(--trans-dur) / 2);
		transition-timing-function: var(--trans-timing-out);
	}

	.switch__sr {
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
	}
</style>