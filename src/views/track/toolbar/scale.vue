<template>
	<div class="scale">
		<el-button link size="small" @click="subtraction">
			<el-icon size="20px">
				<ZoomOut />
			</el-icon>
		</el-button>
		<el-slider size="small" v-model="scale" :step="0.01" :max="2" :min="0.2" :format-tooltip="formatTooltip"
			@input="changeScale" />
		<el-button link size="small" @click="addition">
			<el-icon size="20px">
				<ZoomIn />
			</el-icon>
		</el-button>
	</div>
</template>

<script setup>
	import {
		ref,
	} from 'vue'
	import {
		useTrackStore
	} from '../../../store/track.js'

	const trackStore = useTrackStore()
	const scale = ref(1)

	const formatTooltip = (number) => {
		return parseInt(number * 100.00) + '%'
	}
	const addition = () => {
		scale.value = scale.value + 0.1
		if (scale.value > 2) scale.value = 2
		trackStore.controllerScale = scale.value.toFixed(2) * 1
	}
	const subtraction = () => {
		scale.value = scale.value - 0.1
		if (scale.value < 0.1) scale.value = 0.1
		trackStore.controllerScale = scale.value.toFixed(2) * 1
	}
	const changeScale = (value) => {
		trackStore.controllerScale = value.toFixed(2) * 1
	}
</script>

<style scoped>
	.el-icon {
		margin-right: 5px;
	}

	.el-slider {
		width: 200px;
	}
	
	.scale {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}
</style>