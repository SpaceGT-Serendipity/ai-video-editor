<template>
	<el-dialog v-model="dialogVisible" title="上传动态形象" width="1100" :before-close="handleClose">
		<div v-loading="loading" element-loading-text="正在处理,请勿操作..." style="padding: 10px;">
			<!-- <div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
				<span> 上传动态形象 </span>
			</div> -->
			<div style="display: flex; flex-direction: column; align-items: center; gap: 30px; padding: 40px;">
				<div
					style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: space-evenly;">
					<div style="display: flex; flex-direction: column; align-items: center; gap: 20px; ">
						<FileUpload class="avatar-uploader" path="ai/project/avatar" accept=".jpg,.png"
							@change="handleUploadStatic">
							<div v-if="staticObj" style="display: flex;">
								<el-image :src="filePath + staticObj.cover" fit="cover"
									style="width: 200px; height: 250px;"></el-image>
							</div>
							<el-icon v-else class="avatar-uploader-icon">
								<Plus />
							</el-icon>
						</FileUpload>
						<span class="title">上传静止状态形象</span>
						<div class="title" style="min-height: 20px;">
							<span v-if="staticObj">DPI:{{staticObj.dpiWidth}} x {{staticObj.dpiHeight}}
								Size:{{parseInt(staticObj.size/1000)/1000}} MB</span>
						</div>
					</div>
					<div v-for="(item,index) in dynamicObj"
						style="display: flex; flex-direction: column; align-items: center; gap: 20px; ">
						<el-image :src="filePath + item.cover" fit="cover"
							style="width: 200px; height: 250px; border-radius: 5px;"></el-image>
						<div>
							<el-button class="title" link icon="Edit"
								@click="onchangeName(item)">{{item.name}}</el-button>
							<el-button class="title" link icon="Delete" @click="handleDel(index)">删除</el-button>
						</div>
						<div class="title" style="min-height: 20px;" v-if="item">
							<span v-if="item">DPI:{{item.dpiWidth}} x {{item.dpiHeight}}
								Size:{{parseInt(item.size/1000)/1000}} MB</span>
						</div>
					</div>
					<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
						<FileUpload multiple class="avatar-uploader" path="ai/project/avatar" accept=".mp4"
							@upload-before="loading=true" @change="handleUploadDynamic">
							<el-icon class="avatar-uploader-icon">
								<Plus />
							</el-icon>
						</FileUpload>
						<span class="title">上传动作视频</span>
						<div class="title" style="min-height: 20px;"> </div>
					</div>
				</div>
				<el-input v-model="name" style="width: 300px;">
					<template #prepend>形象名称</template>
				</el-input>
				<el-button type="primary" @click="onsubmit"> 保存 </el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
	import * as uuid from 'uuid';
	import {
		ElMessageBox
	} from 'element-plus'
	import FileUpload from '../../../components/file-upload.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		filePath
	} from '../../../api/file.js'
	import {
		info,
		save,
		motionSelect,
		motionSave,
		motionDel
	} from '../../../api/avatar.js'

	const loading = ref(false)
	const accountStore = useAccountStore()
	const emit = defineEmits(['success'])
	const staticObj = ref()
	const dynamicObj = ref([])
	const name = ref()
	const dialogVisible = ref(false)

	const handleDel = (index) => {
		dynamicObj.value.splice(index, 1)
	}
	
	const handleUploadStatic = async (e) => {
		staticObj.value = {
			id: null,
			fileName: e.fileName,
			name: e.name,
			size: e.size,
			suffix: e.suffix,
			url: e.url,
			cover: e.cover,
			dpiWidth: e.dpiWidth,
			dpiHeight: e.dpiHeight
		}
	}
	
	const handleUploadDynamic = async (e) => {
		loading.value = false
		dynamicObj.value.push({
			id: null,
			aId: null,
			name: e.name,
			size: e.size,
			url: e.url,
			cover: e.cover,
			duration: e.duration,
			dpiWidth: e.dpiWidth,
			dpiHeight: e.dpiHeight
		})
	}
	
	const onchangeName = (dynamic) => {
		ElMessageBox.prompt('请输入新的动作名称', '修改名称', {
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(({
			value
		}) => {
			if (value) {
				dynamic.name = value
			}
		}).catch(() => {})
	}
	
	const onsubmit = async () => {
		if (name.value && staticObj.value && dynamicObj.value.length > 0) {
			const id = await save(staticObj.value.id, staticObj.value.fileName, name.value,
				staticObj.value.size, staticObj.value.suffix, staticObj.value.url,
				staticObj.value.cover, accountStore.id, 'dynamic')
			const res =  motionDel(id, accountStore.id)
			dynamicObj.value.forEach(item => {
				motionSave(null, id, item.name, item.url, item.cover, item.duration, accountStore.id)
			})
			emit('success', res)
			handleClose()
		}
	}

	const open = () => {
		dialogVisible.value = true
	}
	
	const handleClose = () => {
		dialogVisible.value = false
	}
	
	defineExpose({
		open
	})
</script>

<style scoped>
	.avatar-uploader:deep(.el-upload) {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader:deep(.el-upload):hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 200px;
		height: 250px;
		text-align: center;
	}

	.title {
		font-size: 13px;
	}
</style>