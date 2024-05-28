<template>
	<div class="controller layer">
		<el-button link size="small" disabled type="info">
			<el-tooltip v-if="data.type=='video'" effect="dark" content="视频" placement="top">
				<el-icon size="16px">
					<VideoCamera />
				</el-icon>
			</el-tooltip>
			<el-tooltip v-if="data.type=='image'" effect="dark" content="图片" placement="top">
				<el-icon size="16px">
					<Picture />
				</el-icon>
			</el-tooltip>
			<el-tooltip v-if="data.type=='text'" effect="dark" content="文本" placement="top">
				<el-icon size="16px">
					<ChatLineSquare />
				</el-icon>
			</el-tooltip>
			<el-tooltip v-if="data.type=='figure'" effect="dark" content="数字人" placement="top">
				<el-icon size="16px">
					<font-awesome-icon icon="fa-solid fa-person" />
				</el-icon>
			</el-tooltip>
		</el-button>
		<el-button link size="small" @click="data.display=!data.display">
			<el-icon size="16px" v-if="data.display">
				<View />
			</el-icon>
			<el-icon size="16px" v-else>
				<Hide />
			</el-icon>
		</el-button>
		<el-button link size="small" @click="data.muted=!data.muted">
			<el-icon size="16px" v-if="data.muted">
				<font-awesome-icon icon="fa-solid fa-volume-xmark" />
			</el-icon>
			<el-icon size="16px" v-else>
				<font-awesome-icon icon="fa-solid fa-volume-low" />
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