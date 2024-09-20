<template>
	<div class="menu-container">
		<el-scrollbar height="100%">
			<div class="resource-menu">
				<Item v-for="item in menuList" :label="item.label" :active="active==item.label" @click="onClick(item)">
					{{item.title}}
				</Item>
			</div>
		</el-scrollbar>
		<div v-show="accountStore.authorities != null && accountStore.authorities.includes('ai_video_admin')" class="res-menu">
			<Item @click="manageRef.open()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#resource"></use>
				</svg>
				<div>
					公共资源
				</div>
			</Item>
		</div>
		<div v-show="accountStore.id" class="video-menu">
			<Item @click="videosRef.open()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#video"></use>
				</svg>
				<div>
					我的视频
				</div>
			</Item>
		</div>
		<div v-show="accountStore.id" class="project-menu">
			<Item @click="projectRef.open()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#project"></use>
				</svg>
				<div>
					项目管理
				</div>
			</Item>
		</div>
		<div v-show="accountStore.id" class="work-menu">
			<Item @click="menuStore.jobProgressDialogVisible = true">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#work"></use>
				</svg>
				<div>
					作业进度
				</div>
			</Item>
		</div>
		<!-- <div class="setting-menu">
			<Item @click="settingRef.open()">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#setting"></use>
				</svg>
				<div>
					项目设置
				</div>
			</Item>
		</div> -->
		<setting ref="settingRef"></setting>
		<jobs ref="jobsRef"></jobs>
		<videos ref="videosRef"></videos>
		<project ref="projectRef"></project>
		<resource-manage ref="manageRef"></resource-manage>
	</div>
</template>

<script setup>
	import Setting from './setting.vue'
	import Item from './item.vue'
	import Jobs from '../jobs/index.vue'
	import Videos from '../video/index.vue'
	import Project from '../project/index.vue'
	import ResourceManage from '../resource/manage/index.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useGlobalStore
	} from '../../store/global.js'
	import {
		useMenuStore
	} from '../../store/menu.js'
	import {
		useAccountStore
	} from '../../store/account.js'
	
	const accountStore = useAccountStore()
	const menuStore = useMenuStore()
	const globalStore = useGlobalStore()
	const emits = defineEmits(['click'])
	const settingRef = ref()
	const jobsRef = ref()
	const videosRef = ref()
	const projectRef = ref()
	const manageRef = ref()
	const menuList = [
		// 	{ label: 'template', title: '模板' },
		{
			label: 'figure',
			title: '数字人'
		},
		// {
		// 	label: 'text',
		// 	title: '文本'
		// }, 
		// {
		// 	label: 'subtitle',
		// 	title: '字幕'
		// }, 
		{
			label: 'image',
			title: '图片'
		}, {
			label: 'video',
			title: '视频'
		}, {
			label: 'bgm',
			title: '背景音乐'
		}, {
			label: 'template',
			title: '模板库'
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
	
	.res-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid var(--el-border-color);
		padding: 6px;
		text-align: center;
	}
	
	.res-menu .icon {
		width: 20px;
		height: 20px;
	}
	
	.video-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid var(--el-border-color);
		padding: 6px;
		text-align: center;
	}
	
	.video-menu .icon {
		width: 25px;
		height: 25px;
	}
	
	.project-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid var(--el-border-color);
		padding: 6px;
		text-align: center;
	}
	
	.project-menu .icon {
		width: 28px;
		height: 28px;
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

	.work-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid var(--el-border-color);
		padding: 6px;
		text-align: center;
	}

	.work-menu .icon {
		width: 58px;
		height: 32px;
		margin-left: -32px;
	}
</style>