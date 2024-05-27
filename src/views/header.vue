<template>
	<el-page-header icon="ArrowLeft" @back="onBack">
		<template #content>
			<span> AI 视频编辑器 </span>
			<slot></slot>
		</template>
	</el-page-header>
	<div class="project-name">
		<el-button v-if="editTitle==false" text @click="editTitle = true">
			{{globalStore.title}}
			<el-icon>
				<Edit />
			</el-icon>
		</el-button>
		<el-input v-else v-model="globalStore.title" @change="onTitleChange">
			<template #suffix>
				<el-icon>
					<Edit />
				</el-icon>
			</template>
		</el-input>
	</div>
	<div class="button-group">
		<SwitchTheme></SwitchTheme>
		<el-button type="primary" icon="Monitor" @click="compound">合成视频</el-button>
	</div>
</template>

<script setup>
	import SwitchTheme from '../components/switch-theme.vue'
	import {
		ref
	} from 'vue'
	import {
		useWebNotification
	} from '@vueuse/core'
	import {
		useGlobalStore
	} from '../store/global.js'
	import {
		useLayersDataStore
	} from '../store/layers.js'

	const globalStore = useGlobalStore()
	const layersDataStore = useLayersDataStore()
	const options = {
		title: 'AI 编辑器 开始合成视频!',
		body: '点击查看详情',
		icon: '/favicon.ico',
		dir: 'auto',
		lang: 'en',
		renotify: true,
		tag: 'spacegt',
	}
	const {
		isSupported,
		show,
		onClick
	} = useWebNotification(options)

	onClick((event) => {
		window.open(import.meta.env.VITE_APP_WEB_NOTIFICATION)
	})

	const editTitle = ref(false)

	const onBack = () => {
		window.location.href = import.meta.env.VITE_APP_BACK_PATH
	}
	const onTitleChange = () => {
		editTitle.value = false
	}
	const compound = () => {
		show()
		console.log(layersDataStore.layersSerialize)
		var blob = new Blob([JSON.stringify(layersDataStore.layersSerialize)], {
			type: 'text/plain'
		});

	}
</script>

<style scoped>
	.el-page-header {
		color: var(--el-text-color-primary);
	}

	.project-name .el-button:hover .el-icon {
		opacity: 1;
	}

	.project-name .el-button .el-icon {
		margin-left: 10px;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.button-group {
		display: flex;
		gap: 30px;
		justify-content: end;
	}
</style>