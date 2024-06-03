<template>
	<div class="menu-container">
		<el-scrollbar height="100%">
			<div class="resource-menu">
				<Item v-for="item in menuList" :label="item.label" :active="active==item.label" @click="onClick(item)">
					{{item.title}}
				</Item>
			</div>
		</el-scrollbar>
		<div class="setting-menu">
			<Item @click="settingRef.open()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#setting"></use>
				</svg>
				<div>
					项目设置
				</div>
			</Item>
		</div>
		<setting ref="settingRef"></setting>
	</div>
</template>

<script setup>
	import Setting from './setting.vue'
	import Item from './item.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useGlobalStore
	} from '../../store/global.js'

	const globalStore = useGlobalStore()
	const emits = defineEmits(['click'])
	const settingRef = ref()
	const menuList = [
		// 	{ label: 'template', title: '模板' },
		{
			label: 'figure',
			title: '数字人'
		}, {
			label: 'text',
			title: '文本'
		}, {
			label: 'subtitle',
			title: '字幕'
		}, {
			label: 'image',
			title: '图片'
		}, {
			label: 'video',
			title: '视频'
		}, {
			label: 'bgm',
			title: '背景音乐'
		}
	]
	const active = ref(globalStore.menu)

	const onClick = (menu) => {
		active.value = menu.label
		emits('click', menu)
		globalStore.menu = menu.label
	}

	onMounted(() => {
		onClick(menuList.find(item => item.label == active.value))
	})
</script>

<style scoped>
	.menu-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.resource-menu {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.setting-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid var(--el-border-color);
		padding: 6px;
		text-align: center;
	}

	.setting-menu .icon {
		width: 32px;
		height: 32px;
	}
</style>