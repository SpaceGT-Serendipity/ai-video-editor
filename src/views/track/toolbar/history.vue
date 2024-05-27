<template>
	<el-button link size="small" :disabled="historyStore.currentIndex<1" @click="undo">
		<el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
			<el-icon>
				<font-awesome-icon icon="arrow-rotate-left" />
			</el-icon>
		</el-tooltip>
	</el-button>
	<el-button link size="small" :disabled="(historyStore.history.length-1)-historyStore.currentIndex<1" @click="redo">
		<el-tooltip class="box-item" effect="dark" content="重做" placement="top">
			<el-icon>
				<font-awesome-icon icon="arrow-rotate-right" />
			</el-icon>
		</el-tooltip>
	</el-button>
</template>

<script setup>
	import {
		ref,
		nextTick,
		watch
	} from 'vue'
	import {
		watchTriggerable,
		watchThrottled
	} from '@vueuse/core'
	import {
		useLayersDataStore
	} from '../../../store/layers.js'
	import {
		useHistoryStore
	} from '../../../store/track.js'
	import {
		useGlobalStore
	} from '../../../store/global.js'
	import Layer from '../../../bean/Layer.js'

	const layersDataStore = useLayersDataStore()
	const historyStore = useHistoryStore()
	const globalStore = useGlobalStore()
	const source = ref()
	const {
		trigger,
		ignoreUpdates
	} = watchTriggerable(source, async (v, _, onCleanup) => {
		let canceled = false;
		onCleanup(() => canceled = true);
		await new Promise(resolve => setTimeout(resolve, 500));
		if (canceled) return;
		historyStore.push(v);
		globalStore.serialize = v
	}, )

	watch(() => layersDataStore.layersSerialize, (value) => source.value = layersDataStore.layersSerialize)

	const undo = () => {
		historyStore.undo()
		load()
	}
	const redo = () => {
		historyStore.redo()
		load()
	}
	const load = () => {
		const layers = historyStore.currentValue
		layersDataStore.delLayerById(...layersDataStore.layers.map(layer => layer.id))
		layers.forEach(layer => {
			layersDataStore.layers.push(Layer.deserialize(layer))
		})
	}
</script>

<style>
</style>