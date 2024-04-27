<template>
	<div class="timeline ruler-item" :style="{'width':props.width}">
		<div class="ruler-item-scale">
			<span></span>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
		</div>
		<span class="ruler-item-num">00:00:00.00</span>
	</div>
</template>

<script setup>
	const props = defineProps({
		width: String
	})
</script>

<style scoped>
	.timeline.ruler-item {
		position: relative;
		display: inline-block;
		height: 22px;
		transition: width .3s ease-in-out;
	}

	.ruler-item-scale {
		position: absolute;
		display: flex;
		width: 100%;
		top: 0;
		justify-content: space-between;
	}

	.ruler-item-num {
		position: absolute;
		font-size: 12px;
		color: var(--el-text-color-disabled);
		line-height: 1;
		left: 2px;
		bottom: 0;
	}

	.ruler-item-scale i{
		width: 1px;
		height: 6px;
		background-color: var(--el-border-color-dark);
	}

	.ruler-item-scale i:last-child {
		height: 10px;
		background-color: var(--el-border-color-dark);
	}
</style>