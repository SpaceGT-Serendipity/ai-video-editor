<template>
	<div ref="instance" class="select-unit" v-show="selectUnitStore.visible">
		请选择元素
	</div>
</template>

<script setup>
	import {
		useLayersDataStore,
		useSelectUnitStore
	} from '../../../../store/layers.js'
	import {
		ref,
		onMounted,
		onUnmounted,
		watch
	} from 'vue'

	const layersDataStore = useLayersDataStore()
	const selectUnitStore = useSelectUnitStore()
	const instance = ref(null)

	watch(() => selectUnitStore.visible, () => {
		if (selectUnitStore.visible == false) {
			selectUnitStore.cautionUnit()
		}
	})

	const followTheMouse = (event) => {
		const parentElement = instance.value.parentElement
		const parentRect = parentElement.getBoundingClientRect()
		const x = event.x - parentRect.x;
		const y = event.y - parentRect.y;
		instance.value.style.left = x + 'px';
		instance.value.style.top = y + 'px';
	}
	const selectedUnit = (event) => {
		if (selectUnitStore.visible) {
			const unit = layersDataStore.getUnitUnderMouse(event)
			selectUnitStore.visible = false
			if (selectUnitStore.callback) {
				selectUnitStore.callback(unit)
			}
		}
	}

	onMounted(() => {
		document.addEventListener('mousemove', followTheMouse);
		document.addEventListener('mousedown', selectedUnit);
	})

	onUnmounted(() => {
		document.removeEventListener('mousemove', followTheMouse)
		document.removeEventListener('mousedown', selectedUnit)
	})
</script>

<style scoped>
	.select-unit {
		position: absolute;
		background-color: #888888;
		padding: 12px;
		border-radius: 10px;
		opacity: 0.7;
		z-index: 1;
	}
</style>