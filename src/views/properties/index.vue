<template>
	<div class="properties-panel">
		<scene v-if="editorDataStore.activeUnit"></scene>
		<project v-else></project>
	</div>
</template>

<script setup>
	import Project from './project.vue'
	import Scene from './scene.vue'
	import {
		useEditorDataStore
	} from '../../store/editor.js'
	
	const editorDataStore = useEditorDataStore()
</script>

<style>
	.properties-panel {
		padding: 20px;
		box-sizing: border-box;
		font-size: 14px;
		color: var(--el-text-color-primary);
	}

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
</style>