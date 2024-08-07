<template>
	<div class="template">
		<p>模板</p>
		<el-scrollbar>
			<div class="list">
				<resource-sample v-for="item in publicFileList" :key="item.id" :data="item" :drag="false"></resource-sample>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import ResourceSample from '../../components/resource-sample.vue'
	import {
		reactive
	} from 'vue'

	const publicFileList = reactive([{
		cover: 'https://oss.file.yigee.cn/ai-video-editor/source/image/49242ace-34d2-449c-baca-1b24f3247bfa.jpg',
		url: 'https://oss.file.yigee.cn/ai-video-editor/source/image/49242ace-34d2-449c-baca-1b24f3247bfa.jpg',
		name: '恬静片头',
		loaded: true
	}, {
		cover: 'https://oss.file.yigee.cn/ai-video-editor/source/image/32438e9b-2f08-4240-84f0-e775cc3b6af7.jpg',
		url: 'https://oss.file.yigee.cn/ai-video-editor/source/image/32438e9b-2f08-4240-84f0-e775cc3b6af7.jpg',
		name: '科技片头',
		loaded: true
	}])
</script>

<style scoped>
	.template {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	p {
		margin-top: 0;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: start;
	}
</style>