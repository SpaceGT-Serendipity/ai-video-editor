<template>
	<el-dialog v-model="dialogVisible" top="5vh" width="1100" :before-close="handleClose">
		<div style="padding: 10px; height: 100%; display: flex;flex-direction: column;">
			<div style="display: flex; justify-content: space-between; align-items: center;">
				<span> 上传头像 </span>
			</div>
			<div
				style="display: flex; flex-direction: column; align-items: center; gap: 30px; padding: 40px; height: 100%;">
				<div
					style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: space-evenly;">
					<div style="display: flex;  align-items: center; gap: 20px; ">
						<FileUpload class="avatar-uploader" path="ai/project/avatar" accept=".jpg,.png"
							@change="handleUpload">
							<el-button icon="Plus">选择一张图片</el-button>
						</FileUpload>
						<el-radio-group v-model="graphicsState" v-show="img">
							<el-radio-button label="方形" value="square" />
							<el-radio-button label="圆形" value="circular" />
						</el-radio-group>
					</div>
				</div>
				<div style="height: 100%; width: 100%; display: flex;overflow: hidden;">
					<div style="height:50vh; width: 60%; overflow: hidden;">
						<VueCropper ref="cropperRef" :img="img" :graphics-state="graphicsState"
							@realTime="handleRealTime">
						</VueCropper>
					</div>
					<div style="width: 40%; height: 100%; display: flex; justify-content: center; align-items: center;">
						<div style="border: 4px dashed #eee;"
							:style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px','border-radius':graphicsState=='circular'?'50%':''}">
							<div :style="previews.div">
								<img :src="previews.url" :style="previews.img">
							</div>
						</div>
					</div>
				</div>
				<el-button type="primary" icon="Check" @click="onSave()">保存</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
	import VueCropper from '../../../components/vue-cropper-portrait.vue'
	import {
		ref,
		reactive
	} from 'vue'
	import FileUpload from '../../../components/file-upload.vue'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		filePath,
		upload
	} from '../../../api/file.js'
	import {
		save
	} from '../../../api/avatar.js'

	const accountStore = useAccountStore()
	const img = ref()
	const cropperRef = ref()
	const previews = reactive({
		w: 0,
		h: 0,
		div: '',
		url: '',
		img: ''
	})
	const graphicsState = ref('square')
	const dialogVisible = ref(false)
	const emit = defineEmits(['success'])

	const handleUpload = async (e) => {
		img.value = filePath + e.url
	}
	const handleRealTime = (data) => {
		previews.w = data.w
		previews.h = data.h
		previews.div = data.div
		previews.url = data.url
		previews.img = data.img
	}
	const onSave = async () => {
		const data = await cropperRef.value.getCropBlob()
		const file = new File([data], 'portrait.png', {
			type: data.type
		})
		const res = await upload(file, 'ai/project/avatar')
		const res1 = await save(null, res.fileName, res.name, res.size, res.suffix, res.url, res.cover, accountStore.id, 'portrait')
		emit('success', res1)
		handleClose()
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
</style>