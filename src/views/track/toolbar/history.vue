<template>
	<el-button link size="small" :disabled="true||historyStore.currentIndex<1" @click="undo">
		<el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
			<el-icon>
				<font-awesome-icon icon="arrow-rotate-left" />
			</el-icon>
		</el-tooltip>
	</el-button>
	<el-button link size="small" :disabled="true||(historyStore.history.length-1)-historyStore.currentIndex<1" @click="redo">
		<el-tooltip class="box-item" effect="dark" content="重做" placement="top">
			<el-icon>
				<font-awesome-icon icon="arrow-rotate-right" />
			</el-icon>
		</el-tooltip>
	</el-button>
	{{historyStore.currentIndex}}
</template>

<script setup>
	import {
		ref,
		nextTick,
		watch
	} from 'vue'
	import {
		watchThrottled
	} from '@vueuse/core'
	import {
		useLayersDataStore
	} from '../../../store/layers.js'
	import {
		useHistoryStore
	} from '../../../store/track.js'
	import Layer from '../../../bean/Layer.js'

	const layersDataStore = useLayersDataStore()
	const historyStore = useHistoryStore()

	watchThrottled(() => layersDataStore.layersSerialize, (value) => {
		console.log(Layer.deserialize(value[0]))
		historyStore.push(value)
	}, {
		throttle: 1000
	})

	const undo = () => {
		historyStore.undo()
		console.log(historyStore.currentValue)
	}
	const redo = () => {
		historyStore.redo()
		console.log(historyStore.currentValue)
	}
	
</script>

<style>
</style>