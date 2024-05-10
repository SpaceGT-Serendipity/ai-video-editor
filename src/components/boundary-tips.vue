<template>
	<div class="yellow-demarcartion-line">
		<div class="right" v-show="right">
			右侧超出
		</div>
		<div class="bottom" v-show="bottom">
			底部超出
		</div>
	</div>

</template>

<script setup>
	defineProps({
		right: Boolean,
		bottom: Boolean
	})
</script>

<style scoped>
	.yellow-demarcartion-line {
		font-size: 12px;
		opacity: 0.8;
		position: relative;
		z-index: 98;
	}

	.yellow-demarcartion-line .right {
		position: fixed;
		right: 0;
		width: 16px;
		height: 100vh;
		background-image: repeating-linear-gradient(40deg, transparent, transparent 20px, #F1C40F55 10px, #F1C40F55 40px);
		writing-mode: inherit;
		text-align: center;
		display: flex;
		align-items: center;
	}

	.yellow-demarcartion-line .bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 16px;
		background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #F1C40F55 10px, #F1C40F55 40px);
		text-align: center;
		line-height: 16px;
	}
</style>