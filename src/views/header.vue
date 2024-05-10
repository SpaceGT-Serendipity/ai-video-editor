<template>
	<el-page-header icon="ArrowLeft" @back="onBack">
		<template #content>
			<span> AI 视频编辑器 </span>
			<slot></slot>
		</template>
	</el-page-header>
	<div class="project-name">
		<el-button v-if="editProjectName==false" text @click="editProjectName = true">
			{{projectName}}
			<el-icon>
				<Edit />
			</el-icon>
		</el-button>
		<el-input v-else v-model="projectName" @change="onChangeProjectName">
			<template #suffix>
				<el-icon>
					<Edit />
				</el-icon>
			</template>
		</el-input>
	</div>
	<div class="button-group">
		<SwitchTheme></SwitchTheme>
		<el-button type="primary" icon="Monitor">合成视频</el-button>
	</div>
</template>

<script setup>
	import SwitchTheme from '../components/switch-theme.vue'
	import {
		ref
	} from 'vue'

	const editProjectName = ref(false)
	const projectName = ref('未命名项目')

	const onBack = () => {
		window.location.href = 'https://ai.yigee.cn'
	}
	const onChangeProjectName = () => {
		console.log(projectName.value)
		editProjectName.value = false
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