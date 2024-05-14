<template>
	<div @keydown="enter">
		<div style="width: 1000px;height: 1000px;background-color: #000;">
			<vue-draggable-resizable ref="unitRef" :parent="true" :x="config.x" :y="config.y" :h="100" :w="300"
				:on-drag="onDrag" :draggable="config.draggable">
				<p>You cannot move me or resize me outside my parent.</p>
			</vue-draggable-resizable>
		</div>
		<div style="position: absolute; height: 100%; width: 1px; background-color: #fff; top: 0; left: 200px;"></div>
	</div>
	{{config.x}} {{config.grid}}
	<el-button @click="config.x = 300">x:300</el-button>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick
	} from 'vue'
	import {
		useMouse
	} from '@vueuse/core'

	const mouse = useMouse()

	const unitRef = ref()
	const config = reactive({
		x: 100,
		y: 100,
		draggable: true,
	})
	const config_tmp = reactive({
		x: 100,
		y: 100,
		draggable: true,
	})
	const subline = 200
	const scope = 10

	const onDrag = (x, y) => {
		config.y = y = y
		// 在区域内
		if ((x > (subline - scope) && x < (subline + scope))) {
			config.x = subline;
			return false
		} else {
			config.x = x
			return true
		}
	}
</script>

<style>
</style>