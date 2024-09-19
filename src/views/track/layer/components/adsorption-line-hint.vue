<template>
	<div class="adsorption-line-hint" v-show="adsorptionLineStore.visible" :style="{'left':adsorptionLineStore.x+'px'}"></div>
</template>

<script setup>
	import {
		useAdsorptionLineStore
	} from '../../../../store/layers.js'

	const adsorptionLineStore = useAdsorptionLineStore()
</script>

<style scoped>
	.adsorption-line-hint {
		height: 100%;
		width: 0px;
		position: absolute;
		left: 100px;
		border-right: 2px dashed var(--el-color-primary-light-5);
		z-index: 1;
	}
</style>