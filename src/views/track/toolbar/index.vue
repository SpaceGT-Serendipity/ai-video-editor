<template>
	<div class="toolbar">
		<div class="button-group-left">
			<el-button link size="small" disabled>
				<el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
					<el-icon>
						<font-awesome-icon icon="arrow-rotate-left" />
					</el-icon>
				</el-tooltip>
			</el-button>
			<el-button link size="small" disabled>
				<el-tooltip class="box-item" effect="dark" content="重做" placement="top">
					<el-icon>
						<font-awesome-icon icon="arrow-rotate-right" />
					</el-icon>
				</el-tooltip>
			</el-button>
			<el-button link size="small" :disabled="editorDataStore.activeUnit==null" @click="onSplit">
				<el-tooltip class="box-item" effect="dark" content="切割" placement="top">
					<el-icon>
						<font-awesome-icon icon="i-cursor" />
					</el-icon>
				</el-tooltip>
			</el-button>
		</div>
		<div class="button-group-right">
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
	</div>
</template>

<script setup>
	import {
		ElNotification
	} from 'element-plus'
	import {
		ref,
		nextTick
	} from 'vue'
	import {
		useEditorDataStore
	} from '../../../store/editor.js'
	import {
		useTrackStore
	} from '../../../store/track.js'

	const editorDataStore = useEditorDataStore()
	const trackStore = useTrackStore()
	const emits = defineEmits(['changeScale'])
	const scale = ref(1)

	const onSplit = () => {
		if (trackStore.seekerLocation > editorDataStore.activeUnit.track.location.left &&
			trackStore.seekerLocation < editorDataStore.activeUnit.track.location.right) {
			const width = trackStore.seekerLocation - editorDataStore.activeUnit.track.location.left
			const ratio = width / editorDataStore.activeUnit.track.w
			const newUnit = editorDataStore.activeUnit.split(ratio)
			const layer = editorDataStore.getLayerByUnitId(editorDataStore.activeUnit.id)
			nextTick(() => {
				layer.units.push(newUnit)
				layer.sort()
			})
		} else {
			ElNotification({
				title: '提示',
				message: '当前位置无法分割',
				type: 'warning',
			})
		}
	}
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
	.toolbar {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom: 1px solid var(--el-border-color);
		background-color: var(--track-toolbar-bg);
	}

	.el-icon {
		margin-right: 5px;
	}

	.el-slider {
		width: 200px;
	}

	.button-group-right {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}
</style>