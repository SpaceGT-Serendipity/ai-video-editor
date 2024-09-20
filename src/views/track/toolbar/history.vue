<template>
	<el-button link size="small" :disabled="!(recordStore.index < recordStore.list.length - 1)"
		@click="recordStore.undo()">
		<el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
			<el-icon>
				<font-awesome-icon icon="arrow-rotate-left" />
			</el-icon>
		</el-tooltip>
	</el-button>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick,
		watch
	} from 'vue'
	import {
		watchDebounced
	} from '@vueuse/core'
	import {
		watchTriggerable,
		watchThrottled
	} from '@vueuse/core'
	import {
		useLayersDataStore
	} from '../../../store/layers.js'
	import {
		useGlobalStore
	} from '../../../store/global.js'
	import Layer from '../../../bean/Layer.js'
	import {
		useRecordStore
	} from '../../../store/record.js'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		useRoute
	} from 'vue-router'

	const route = useRoute()
	const recordStore = useRecordStore()
	const layersDataStore = useLayersDataStore()
	const globalStore = useGlobalStore()
	const accountStore = useAccountStore()
	const source = ref()
	const {
		trigger,
		ignoreUpdates
	} = watchTriggerable(source, async (v, _, onCleanup) => {
		let canceled = false;
		onCleanup(() => canceled = true);
		await new Promise(resolve => setTimeout(resolve, 500));
		if (canceled) return;
	})


	watch(() => route.path, () => recordStore.loadCurrent())
	// 自动保存
	watchDebounced(() => layersDataStore.stringify, () => {
		if (accountStore.id) {
			recordStore.saveProject()
		}
	}, {
		debounce: 1000 * 60,
		maxWait: 1000 * 60 * 5
	})
	// 每次操作保存本地
	watchDebounced(() => layersDataStore.stringify, () => {
		if (layersDataStore.stringify) {
			recordStore.push(layersDataStore.stringify)
		}
	}, {
		debounce: 1000,
		maxWait: 1000 * 5
	})

	onMounted(() => recordStore.loadCurrent())
</script>

<style>
</style>