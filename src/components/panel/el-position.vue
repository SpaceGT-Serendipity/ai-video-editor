<template>
	<div class="el-position">
		<div class="key-value">
			<span>x</span>
			<el-input-number :model-value="modelValue.x" :step="1" :step-strictly="true" controls-position="right"
				size="small" @input="handleInputX" />
		</div>
		<div class="key-value">
			<span>y</span>
			<el-input-number :model-value="modelValue.y" :step="1" :step-strictly="true" controls-position="right"
				size="small" @input="handleInputY" />
		</div>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const props = defineProps({
		modelValue: Object,
	})
	const emits = defineEmits(['update:modelValue'])

	const handleInputX = (value) => {
		emits('update:modelValue', {
			...props.modelValue,
			x: value
		})
	}
	const handleInputY = (value) => {
		emits('update:modelValue', {
			...props.modelValue,
			y: value
		})
	}
</script>

<style scoped>
	.el-position {
		display: flex;
		gap: 20px;
	}

	.key-value {
		display: flex;
		gap: 10px;
	}


	.el-input-number {
		width: 80px;
	}
</style>