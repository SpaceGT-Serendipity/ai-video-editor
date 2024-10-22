<template>
	<div class="subtitle">
		<div class="header">
			<span>字幕</span>
			<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".srt"
				:on-change="handleUpload">
				<el-button icon="Plus">点击上传字幕文件(.srt)</el-button>
				<el-tooltip class="box-item" effect="dark" content="支持批量上传文件,单文件不超过10MB" placement="top">
					<el-button link>
						<el-icon>
							<InfoFilled />
						</el-icon>
					</el-button>
				</el-tooltip>
			</el-upload>
		</div>
		<el-scrollbar max-height="calc(100% - 32px)">
			<div v-if="subtitleDataStore.data.length > 0" style="display: flex; justify-content: space-between;">
				<el-button text @click="subtitleDataStore.clear()">清除字幕</el-button>
				<el-checkbox v-model="subtitleDataStore.visible">显示</el-checkbox>
			</div>
			<div class="list" v-if="subtitleDataStore.data.length > 0">
				<div class="item" v-for="(item, index) in subtitleDataStore.data" :key="item.number">
					<div class="item-number">
						{{ index + 1 }}
					</div>
					<div style="flex: 1;">
						<el-button text @click="timesetRef.open(item, index)">
							<div class="time-quantum">
								<div class="time-start">
									{{ subtitleDataStore.timeFormat(item.startTime).label }}
								</div>
								-
								<div class="time-end">
									{{ subtitleDataStore.timeFormat(item.endTime).label }}
								</div>
							</div>
						</el-button>
						<div>
							<el-input v-model="item.text"></el-input>
						</div>
					</div>
				</div>
			</div>
			<el-button v-else class="generate-button" :loading="loading" icon="HelpFilled"
				@click="generate">一键生成字幕</el-button>
		</el-scrollbar>
		<Timeset ref="timesetRef"></Timeset>
	</div>
</template>

<script setup>
import {
	ref,
	onMounted,
	watch
} from 'vue'
import {
	getOptimumBatch,
	subtitleJob
} from '../../../api/batch.js'
import {
	useLayersDataStore
} from '../../../store/layers.js'
import {
	useSubtitleDataStore
} from '../../../store/data/subtitle'
import { ElButton } from 'element-plus'
import Timeset from './timeset.vue';

const subtitleDataStore = useSubtitleDataStore()
const layersDataStore = useLayersDataStore()
const loading = ref(false)
const timesetRef = ref()

const handleUpload = async (file) => {
	const reader = new FileReader();
	reader.readAsText(file.raw);
	reader.onload = (res) => {
		subtitleDataStore.data = subtitleDataStore.formatting(reader.result)
	}
}
const generate = async () => {
	loading.value = true
	const units = layersDataStore.layers
		.filter(layer => layer.type == 'figure')
		.reduce((previousValue, currentValue) => {
			previousValue.push(...currentValue.units)
			return previousValue;
		}, [])
		.filter(unit => unit.resource.audio != null)
	const batch = await getOptimumBatch('SUBTITLE')
	if (batch) {
		const blob = await subtitleJob(batch, {
			"samplingRate": 44100,
			"codeRate": "192k",
			"totalTime": 10000,
			"audios": units.map(unit => {
				return {
					url: unit.resource.audio.url,
					anchor: unit.duration.left
				}
			})
		})
		if (blob) {
			const reader = new FileReader()
			reader.readAsText(blob);
			reader.onload = (res) => {
				subtitleDataStore.data = subtitleDataStore.formatting(reader.result)
			}
		}
	}
	loading.value = false
}


</script>

<style scoped>
.subtitle {
	height: 100%;
}

.header {
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.el-checkbox {
	display: block;
	text-align: right;
	line-height: 32px;
}

.generate-button {
	padding: 40px 60px;
	margin: auto;
	display: block;
	height: auto;
	margin-top: 60px;
}

.list {
	display: flex;
	flex-direction: column;
}

.list .item {
	display: flex;
	align-items: center;
	gap: 8px;
}

.list .item .item-number {
	background-color: rgba(0, 0, 0, 0.2);
	width: 32px;
	height: 64px;
	line-height: 64px;
	border-radius: 4px;
	text-align: center;
}

.time-quantum {
	display: flex;
	gap: 10px;
}
</style>