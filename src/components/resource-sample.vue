<template>
	<div class="resource-sample" ref="resourceSampleRef">
		<div class="card" :class="{'drag':props.drag}">
			<el-image :src="data.cover" fit="contain">
				<template #placeholder>
					<div class="image-slot">
						<el-icon size="20">
							<font-awesome-icon icon="fa-solid fa-spinner" spin-pulse />
						</el-icon>
					</div>
				</template>
				<template #error>
					<div class="image-slot">
						<el-icon size="40">
							<Picture />
						</el-icon>
					</div>
				</template>
			</el-image>
			<div class="shade">
			</div>
			<div v-if="down" class="shade">
				<el-button link @click="download(data.url)">
					<el-icon size="26">
						<Download />
					</el-icon>
				</el-button>
			</div>
			<a class="glightbox" :href="data.url">
				<el-button link>
					<el-icon size="26">
						<View />
					</el-icon>
				</el-button>
			</a>
			<el-button v-if="delFlag" class="item-btn" text @click="handleDel(data.id)">
				<el-icon size="25">
					<Delete />
				</el-icon>
			</el-button>
		</div>
		<p v-if="rechange" class="title" @dblclick.stop="handleRename(data.id)">{{data.name}}</p>
		<div v-else class="title">{{data.name}}</div>
		<div class="tag" v-if="data.tag">
			<el-tag type="info" effect="dark" v-if="data.tag=='picture'">
				静态
			</el-tag>
			<el-tag type="warning" effect="dark" v-if="data.tag=='video'">
				视频
			</el-tag>
			<el-tag type="warning" effect="dark" v-if="data.tag=='dynamic'">
				动作
			</el-tag>
		</div>
	</div>
</template>

<script setup>
	import {
		saveAs
	} from 'file-saver';
	import GLightbox from 'glightbox';
	import {
		useResourceDragStore
	} from '../store/resource.js'
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	import {
		ElNotification,
		ElMessageBox
	} from 'element-plus'
	import {
		rename
	} from '../api/video.js'
	import {
		del as delOne
	} from '../api/avatar.js'
	import {
		useAccountStore
	} from '../store/account.js'
	import {
		useFigureDataStore
	} from '../store/data/figure.js'

	const figureDataStore = useFigureDataStore()
	const accountStore = useAccountStore()
	const emit = defineEmits(['load'])
	const props = defineProps({
		data: Object,
		drag: {
			type: Boolean,
			default: true
		},
		size: {
			type: String,
			default: 'default' // 'large'| 'default'| 'small'
		},
		rechange: {
			type: Boolean,
			default: false
		},
		down: {
			type: Boolean,
			default: false
		},
		delFlag: {
			type: Boolean,
			default: false
		},
	})
	const store = useResourceDragStore()
	const resourceSampleRef = ref()
	let drop = false

	const download = (url) => {
		saveAs(url, 'mp4')
	}

	function handleMousedown() {
		drop = true
	}

	function handleMouseup() {
		drop = false
	}

	function handleMouseleave() {
		if (drop)
			store.data = props.data
		drop = false
	}

	const handleRename = (id) => {
		ElMessageBox.prompt('请输入新文件名', '重命名', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({
				value
			}) => {
				if (value) {
					rename(id, value).then(res => {
						emit('load', res)
					})
				} else {
					ElNotification({
						title: '消息',
						message: '新文件名不得为空',
					})
				}
			})
			.catch(() => {})
	}

	const handleDel = async (id) => {
		ElMessageBox.confirm(
				'确定删除吗？',
				'警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					draggable: true,
					overflow: true,
				}
			)
			.then(() => {
				delOne(id, accountStore.id).then(res => {
					ElNotification({
						title: '消息',
						message: '删除成功',
					})
					figureDataStore.load()
				})
			})
			.catch(() => {
				ElNotification({
					title: '消息',
					message: '删除失败',
				})
			})
	}

	onMounted(() => {
		GLightbox({
			type: ['image', 'video'].includes(props.data.type) ? props.data.type : 'image'
		});
		if (props.drag) {
			resourceSampleRef.value.addEventListener('mousedown', handleMousedown)
			resourceSampleRef.value.addEventListener('mouseup', handleMouseup)
			resourceSampleRef.value.addEventListener('mouseleave', handleMouseleave)
		}
	})

	onBeforeUnmount(() => {
		if (props.drag) {
			resourceSampleRef.value.removeEventListener('mousedown', handleMousedown)
			resourceSampleRef.value.removeEventListener('mouseup', handleMouseup)
			resourceSampleRef.value.removeEventListener('mouseleave', handleMouseleave)
		}
	})
</script>

<style scoped>
	.resource-sample {
		position: relative;
	}

	.title {
		font-size: 14px;
		color: var(--el-menu-text-color);
		margin: 6px 0;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 160px;
	}

	.card {
		position: relative;
		width: 160px;
		height: 90px;
		background-color: var(--resource-card-bg);
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		background-size: cover;
		border-radius: 5px;
	}

	.card.drag {
		cursor: all-scroll;
	}

	.card .el-image {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: height 0.3s, width 0.3s;
	}

	.card .shade {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		opacity: 0;
		background: radial-gradient(#0006, #000a);
		border-radius: 5px;
		transition: height 0.2s, width 0.2s, opacity 0.2s;
	}

	.card .el-button {
		opacity: 0;
		transition: opacity 0.3s;
	}

	.card:hover .el-button {
		opacity: 1;
	}

	.card:hover .shade {
		opacity: 0.7;
	}

	.card a {
		-webkit-user-drag: none;
	}

	.card .image-slot {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.4;
	}

	.tag {
		position: absolute;
		top: 4px;
		left: 4px;
	}
	
	
	.item-btn {
		position: absolute;
		opacity: 0;
		transition: all 0.3s;
		top: 5px;
		right: 5px;
		width: 30px;
		height: 30px;
		font-size: 11px;
	}
	
	.item-btn:hover {
		color: white;
		background-color: transparent !important;
	}
</style>