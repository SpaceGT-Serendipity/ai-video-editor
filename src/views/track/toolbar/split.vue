<template>
	<el-button link size="small" :disabled="layersDataStore.activeUnit==null" @click="onSplit">
		<el-tooltip class="box-item" effect="dark" content="切割" placement="top">
			<el-icon>
				<font-awesome-icon icon="i-cursor" />
			</el-icon>
		</el-tooltip>
	</el-button>
</template>

<script setup>
	import {
		useLayersDataStore
	} from '../../../store/layers.js'
	import {
		useTrackStore
	} from '../../../store/track.js'
	import {
		nextTick
	} from 'vue'

	const layersDataStore = useLayersDataStore()
	const trackStore = useTrackStore()

	const onSplit = () => {
		if (trackStore.seekerLocation > layersDataStore.activeUnit.track.location.left &&
			trackStore.seekerLocation < layersDataStore.activeUnit.track.location.right) {
			if (layersDataStore.activeUnit.resource.type == 'video') {
				const width = trackStore.seekerLocation - layersDataStore.activeUnit.track.location.left
				const ratio = width / layersDataStore.activeUnit.track.w
				const newUnit = layersDataStore.activeUnit.split(ratio)
				const layer = layersDataStore.getLayerByUnitId(layersDataStore.activeUnit.id)
				nextTick(() => {
					layer.units.push(newUnit)
					layer.sort()
				})
			} else {
				ElNotification({
					title: '提示',
					message: '仅限于视频资源分割',
					type: 'warning',
				})
			}
		} else {
			ElNotification({
				title: '提示',
				message: '当前位置无法分割',
				type: 'warning',
			})
		}
	}
</script>

<style>
</style>