<template>
	<div class="footer">
		<el-alert title="状态栏 记录一些自动保存信息等等,一些信息提示" type="info" show-icon :closable="false" />
		<div class="short-message">
			<el-tag type="info">自动保存时间 90s</el-tag>
			<el-tag type="info">视频总时长 00:{{editorDataStore.videoTotalDuration}}</el-tag>
			<el-tag type="info" :class="{'open-debug':editorDataStore.debug}"
				@click="openDebug(!editorDataStore.debug)">Debug</el-tag>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useEditorDataStore
	} from '../store/editor.js'

	const editorDataStore = useEditorDataStore()

	const openDebug = (state) => {
		editorDataStore.debug = state
		if (editorDataStore.debug) document.querySelector('html').classList.add('debug-open')
		else document.querySelector('html').classList.remove('debug-open')
	}

	onMounted(() => {
		openDebug(editorDataStore.debug)
	})
</script>

<style scoped>
	.footer {
		height: 100%;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.el-alert {
		width: initial;
		padding: 0;
		padding-right: 40px;
		background-color: initial;
	}

	.short-message {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.open-debug {
		color: aqua;
	}
</style>