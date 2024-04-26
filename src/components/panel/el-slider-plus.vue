<template>
	<div class="el-slider-plus">
		<el-slider :model-value="modelValue" :min="min" :max="max" :step="step" :format-tooltip="formatTooltip"
			size="small" @input="handleInput" />
		<el-input-number :model-value="modelValue" :min="min" :max="max" :step="step" :step-strictly="true"
			controls-position="right" size="small" @input="handleInput" />
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const props = defineProps({
		modelValue: Number,
		min: Number,
		max: Number,
		step: Number
	})
	const emits = defineEmits(['update:modelValue'])

	const formatTooltip = (number) => {
		return parseInt(number * 100.00) + '%'
	}
	const handleInput = (value) => {
		emits('update:modelValue', value)
	}
</script>

<style scoped>
	.el-slider-plus {
		display: flex;
		gap: 20px;
	}

	.el-slider {
		flex: 1;
	}

	.el-input-number {
		flex-basis: 80px;
	}
</style>