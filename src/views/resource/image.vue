<template>
	<div class="image">
		<el-tabs model-value="预设图片" class="demo-tabs">
			<el-tab-pane label="预设图片" name="预设图片">
				<el-scrollbar>
					<div class="list">
						<resource-sample v-for="item in publicList" :key="item.id" :data="item"></resource-sample>
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="本地图片" name="本地图片">
				<el-upload v-model:file-list="fileList" :show-file-list="false" action :auto-upload="false" multiple
					accept=".jpg,.png">
					<el-button icon="Plus">点击上传本地图片</el-button>
					<el-tooltip class="box-item" effect="dark" content="支持批量上传图片,点文件不超过10MB" placement="top">
						<el-button link>
							<el-icon>
								<InfoFilled />
							</el-icon>
						</el-button>
					</el-tooltip>
				</el-upload>
				<div class="local-image-list">
					<div v-for="item in reactifyFileProcess().value">
						<resource-sample :cover="item.url" :src="item.url" :title="item.name"></resource-sample>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
	import ResourceSample from '../../components/resource-sample.vue'
	import {
		ref,
	} from 'vue'
	import {
		reactify
	} from '@vueuse/core'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'

	const publicList = ref([{
		id: '1',
		cover: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg',
		url: 'https://yigee-source.oss-cn-beijing.aliyuncs.com/ai-portal/introduce.mp4',
		name: '带妆上阵1'
	}, {
		id: '2',
		cover: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg',
		url: 'https://yigee-source.oss-cn-beijing.aliyuncs.com/ai-portal/introduce.mp4',
		name: '带妆上阵2'
	}, {
		id: '3',
		cover: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg',
		url: 'https://yigee-source.oss-cn-beijing.aliyuncs.com/ai-portal/introduce.mp4',
		name: '带妆上阵3'
	}, {
		id: '4',
		cover: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg',
		url: 'https://yigee-source.oss-cn-beijing.aliyuncs.com/ai-portal/introduce.mp4',
		name: '带妆上阵4'
	}])
	const fileList = ref([])

	const fileProcess = () => {
		return fileList.value.map(item => {
			item.url = URL.createObjectURL(item.raw);
			return item;
		})
	}
	const reactifyFileProcess = reactify(fileProcess)
</script>

<style scoped>
	.image {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: start;
		padding: 10px;
	}

	.local-image-list {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: start;
		padding: 10px;
	}
</style>