<template>
	<div class="sound-panel">
		<div class="properties-block">
			<span class="block-name">音量大小</span>
			<div>
				<el-slider-plus v-model="volume" :min="0.1" :max="5" :step="0.1"></el-slider-plus>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ElSliderPlus from '../../components/panel/el-slider-plus.vue'
	import {
		ref,
		watch
	} from 'vue'
	import {
		useLayersDataStore
	} from '../../store/layers.js'

	const layersDataStore = useLayersDataStore()
	const volume = ref(1)

	watch(volume, (value) => {
		if (layersDataStore.activeUnit) {
			layersDataStore.activeUnit.resource.volume = value
		}
	})
</script>

<style>
</style>