<template>
	<div class="figure">
		<div class="header">
			<span>数字人</span>
			<el-button text type="info" @click="digitalHumanRef.open()">
				<el-icon>
					<font-awesome-icon icon="fa-solid fa-pen-ruler" />
				</el-icon>
				定制数字人
			</el-button>
		</div>
		<el-tabs model-value="全部" class="tabs">
			<el-tab-pane label="全部" name="全部">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in figureDataStore.data" :key="item.id"
							:data="item"></resource-sample>
					</div>
					<el-empty v-if="figureDataStore.data.length == 0" description="暂无形象"></el-empty>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="静态" name="静态">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in figureDataStore.pictureData" :key="'静态' + item.id"
							:data="item"></resource-sample>
					</div>
					<el-empty v-if="figureDataStore.pictureData.length == 0" description="暂无形象"></el-empty>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="视频" name="视频">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in figureDataStore.videoData" :key="'视频' + item.id"
							:data="item"></resource-sample>
					</div>
					<el-empty v-if="figureDataStore.videoData.length == 0" description="暂无形象"></el-empty>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="动作" name="动作">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in figureDataStore.dynamicData" :key="item.id"
							:data="item"></resource-sample>
					</div>
					<el-empty v-if="figureDataStore.dynamicData.length == 0" description="暂无形象"></el-empty>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="我的" name="我的">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in figureDataStore.privateData" :key="item.id"
							:data="item"></resource-sample>
					</div>
					<el-empty v-if="figureDataStore.privateData.length == 0" description="暂无形象"></el-empty>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
		<digital-human ref="digitalHumanRef"></digital-human>
	</div>
</template>

<script setup>
	import ResourceSample from '../../../components/resource-sample.vue'
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import DigitalHuman from './separation.vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		useFigureDataStore
	} from '../../../store/data/figure.js'

	const figureDataStore = useFigureDataStore()
	const accountStore = useAccountStore()
	const digitalHumanRef = ref()

	watch(() => accountStore.id, () => {
		figureDataStore.load()
	})

	onMounted(() => {
		figureDataStore.load()
	})
</script>

<style scoped>
	.figure {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header .el-icon {
		margin-right: 5px;
	}

	.tabs {
		height: calc(100% - 42px);
	}

	.tabs .el-tabs__header {
		flex: 0 0 0%;
	}

	.tabs .el-tabs__content {
		flex: 1 1 0%
	}

	.tabs .el-tab-pane {
		height: 100%;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: start;
	}
</style>