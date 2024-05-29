<template>
	<div class="properties-panel">
		<project v-show="layersDataStore.activeUnit==null"></project>
		<el-tabs v-model="tabsActive" v-show="layersDataStore.activeUnit!=null">
			<el-tab-pane label="属性面板" name="属性面板">
				<scene></scene>
			</el-tab-pane>
			<el-tab-pane label="配音" name="配音" v-if="layersDataStore.activeUnit?.type=='figure'">
				<audio-panel></audio-panel>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
	import Project from './project.vue'
	import Scene from './scene.vue'
	import AudioPanel from './audio.vue'
	import {
		useLayersDataStore
	} from '../../store/layers.js'
	import {
		ref,
		watch
	} from 'vue'

	const layersDataStore = useLayersDataStore()
	const tabsActive = ref('属性面板')

	watch(() => layersDataStore.activeUnit, (value) => {
		if (value && value.type == 'figure') {
			tabsActive.value = '配音'
		} else {
			tabsActive.value = '属性面板'
		}
	})
</script>
<style scoped>
	.properties-panel {
		padding: 20px;
		box-sizing: border-box;
		font-size: 12px;
		color: var(--el-text-color-primary);
	}

	.properties-panel .el-tabs {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.properties-panel:deep(.el-tabs__header) {
		flex: 0 0 0%;
	}

	.properties-panel:deep(.el-tabs__content) {
		flex: 1 1 0%
	}

	.properties-panel:deep(.el-tab-pane) {
		height: 100%;
	}
</style>
<style>
	.properties-block {
		box-sizing: border-box;
		padding: 0 20px;
		display: flex;
		align-items: center;
	}

	.properties-block .block-name {
		color: var(--el-text-color-secondary);
		line-height: 44px;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 0;
	}

	.properties-block .block-name+* {
		flex: 0 0 70%;
	}

	.properties-block .block-content {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>