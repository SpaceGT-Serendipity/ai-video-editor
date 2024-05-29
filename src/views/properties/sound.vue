<template>
	<div class="sound-panel">
		<div class="properties-block">
			<span class="block-name">音量大小</span>
			<div>
				<el-slider-plus v-model="volume" :min="0.5" :max="2" :step="0.1"></el-slider-plus>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ElSliderPlus from '../../components/panel/el-slider-plus.vue'
	import {
		ref
	} from 'vue'

	const volume = ref(1)
</script>

<style>
</style>