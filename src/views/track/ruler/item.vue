<template>
	<div class="timeline ruler-item" :style="{'width':props.width}">
		<div class="ruler-item-scale">
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
			<span></span>
		</div>
		<span class="ruler-item-num">{{dateFormat(props.time,'hh:mm:ss.SS')}}</span>
	</div>
</template>

<script setup>
	import {
		dateFormat
	} from '../../../utils/time.js'
	import {
		ref
	} from 'vue'

	const props = defineProps({
		width: String,
		time: Number
	})
</script>

<style scoped>
	.timeline.ruler-item {
		position: relative;
		display: inline-block;
		height: 22px;
		transition: width .2s ease-in-out;
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

	.ruler-item-scale i {
		width: 1px;
		height: 6px;
		background-color: var(--el-border-color-dark);
		opacity: 0.5;
	}

	.ruler-item-scale i:first-child {
		height: 10px;
		background-color: var(--el-border-color-dark);
		opacity: 1;
	}
</style>