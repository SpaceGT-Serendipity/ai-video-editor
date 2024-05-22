<template>
	<div class="controller layer">
		<el-button link size="small" v-if="data.display" @click="data.display=false">
			<el-icon size="16px">
				<View />
			</el-icon>
		</el-button>
		<el-button link size="small" v-else @click="data.display=true">
			<el-icon size="16px">
				<Hide />
			</el-icon>
		</el-button>
		<el-button link size="small" @click="onDel">
			<el-icon size="16px">
				<Delete />
			</el-icon>
		</el-button>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useLayersDataStore
	} from '../../../store/layers.js'

	const props = defineProps({
		data: Object
	})
	const layersDataStore = useLayersDataStore()

	const onDel = () => {
		layersDataStore.delLayerById(props.data.id)
	}
</script>

<style scoped>
	.controller.layer {
		display: flex;
		justify-content: center;
	}
</style>