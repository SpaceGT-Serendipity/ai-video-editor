<template>
	<el-dialog v-model="dialogVisible" title="定制数字人" top="10vh" width="1100" :before-close="handleClose">
		<div v-loading="loading" element-loading-text="正在处理,请勿操作...">
			<!-- <el-alert title="使用 Rembg 去除背景,请确保人物和背景有清晰的对比." type="warning" /> -->
			<div style="margin: 20px 0; display: flex; justify-content: space-between; align-items: center;">
				<span> 我的数字形象 ({{avatars.length}}) </span>
				<div>
					<el-button icon="Upload" type="success" @click="dynamicRef.open()">上传动态形象</el-button>
					<el-button icon="Upload" type="info" @click="portraitRef.open()">上传头像</el-button>
				</div>
			</div>
			<div style="display: flex; gap: 16px; flex-wrap: wrap; ">
				<FileUpload class="avatar-uploader" path="ai/project/avatar" accept=".jpg,.png,.mp4" @change="handleUpload">
					<el-icon class="avatar-uploader-icon">
						<Plus />
					</el-icon>
				</FileUpload>
				<el-popover v-for="(item,index) in avatars" :key="item.id" placement="bottom" width="auto" :hide-after="50"
					trigger="hover">
					<template #reference>
						<div class="avatars-body" style="position: relative;">
							<el-image class="avatars-image" :src="filePath + item.cover" fit="cover" preview-teleported
								:preview-src-list="avatars.map(item=>filePath + item.cover)" :initial-index="index">
								<template #error>
									{{filePath + item.cover}}
								</template>
							</el-image>
							<div class="tag" v-if="item.type=='dynamic'" style="background-color: rgb(245, 108, 108);">
								<span> 动态 </span>
							</div>
							<div class="tag" v-else-if="item.type=='video'" style="background-color: rgb(245, 108, 108);">
								<span> 视频 </span>
							</div>
							<div class="tag" v-else-if="item.type=='picture'" style="background-color: rgb(108 183 245);">
								<span> 静态 </span>
							</div>
							<div class="tag" v-else-if="item.type=='portrait'" style="background-color: rgb(108 183 245);">
								<span> 肖像 </span>
							</div>
						</div>
					</template>
					<div style="text-align: center;">
						<el-button size="small" icon="Delete" text type="danger" @click="handleDel(item.id)"> 删除形象
						</el-button>
					</div>
				</el-popover>
			</div>
		</div>
		<dynamic ref="dynamicRef" @success="loadAvatars"></dynamic>
		<portrait ref="portraitRef" @success="loadAvatars"></portrait>
	</el-dialog>
</template>

<script setup>
	import {
		ElNotification
	} from 'element-plus'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		list,
		save,
		del
	} from '../../../api/avatar.js'
	import {
		filePath,
		download,
		upload
	} from '../../../api/file.js'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import FileUpload from '../../../components/file-upload.vue'
	import Dynamic from './dynamic.vue'
	import Portrait from './portrait.vue'

	const accountStore = useAccountStore()
	const emit = defineEmits(['submit'])
	const avatars = ref([])
	const loading = ref(false)
	const dialogVisible = ref(false)
	const selectAvatar = ref([])
	const dynamicRef = ref()
	const portraitRef = ref()

	const handleDel = async (id) => {
		const res = await del(id, accountStore.id)
		await loadAvatars()
	}

	const handleUpload = async (e) => {
		await save(null, e.fileName, e.name, e.size, e.suffix, e.url, e.cover, accountStore.id,
			e.suffix == 'mp4' ? 'video' : 'picture')
		loadAvatars()
	}

	const open = () => {
		if (!accountStore.account) {
			ElNotification({
				title: '请登录后重试。',
				type: 'warning',
			})
			return;
		}
		dialogVisible.value = true
	}

	const handleClose = () => {
		dialogVisible.value = false
	}
	
	const loadAvatars = async () => {
		avatars.value = await list(accountStore.id)
	}

	onMounted(() => {
		loadAvatars()
	})

	defineExpose({
		open
	})
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 200px;
		height: 150px;
		text-align: center;
	}

	.avatars-image {
		position: relative;
		width: 200px;
		height: 150px;
		overflow: initial;
		transition: all 0.2s;
		/* box-shadow: 1px 1px 10px 1px #aaa; */
		background-color: rgb(247, 248, 250);
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatars-image:hover {
		z-index: 10;
		transform: scale(1.1);
	}

	.avatars-image>img {
		transition: all 0.2s;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		filter: drop-shadow(2px 4px 6px #999);
		transition: all 0.2s;
		object-position: top;
	}

	.avatars-image:hover img {
		width: 130px;
		height: 180px;
	}


	.avatars-image-del {
		display: none;
		position: absolute;
		top: 0px;
		right: 0px;
		z-index: 12;
	}

	.avatars-body:hover .avatars-image-del {
		display: initial;
	}

	.avatar {
		transition: all 0.2s;
		cursor: pointer;
	}

	.avatar.selected {
		background-color: #aaa;
	}

	.avatar.selected .avatars-image {
		transform: scale(0.85);
	}

	.avatars-body .tag {
		position: absolute;
		top: 0;
		left: 0;
		color: #eee;
		font-size: 0.5rem;
		padding: 2px 5px;
		border-radius: 2px;
		z-index: 10;
	}
</style>