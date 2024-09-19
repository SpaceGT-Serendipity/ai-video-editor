<template>
	<div class="logo">
		<logo-vue></logo-vue>
	</div>
	<div class="button-group">
		<el-button type="primary" icon="BrushFilled" @click="router.push('/editor')">开始设计</el-button>
		<el-button v-if="accountStore.id==null" round @click="loginref.open()">登录</el-button>
		<el-popover v-else placement="bottom" :width="300" trigger="hover">
			<template #reference>
				<div style="display: flex; align-items: center; gap: 5px;">
					<el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="accountStore.avatar">
						<template #error>
							<img src="/images/avatar.png" style="width: 100%; height: 100%;" />
						</template>
					</el-image>
					<el-text round>{{accountStore.name}}</el-text>
				</div>
			</template>
			<template #default>
				<div class="profile-card">
					<div style="display: flex; gap: 10px;justify-content: space-between;">
						<!-- <el-image style="width: 60px; height: 60px;flex:0 0 60px;border-radius: 50%;"
							:src="accountStore.avatar">
							<template #error>
								<img src="/images/avatar.png" style="width: 100%; height: 100%;" />
							</template>
						</el-image> -->
						<div class="name">
							<span style="font-size: 14px;color: #666; overflow: hidden;">用户名:
								{{accountStore.account}}</span>
						</div>
					</div>
					<el-divider style="margin: 10px 0;" />
					<el-popconfirm title="是否退出登录?" @confirm="accountStore.logout()">
						<template #reference>
							<el-button text size="large">
								<el-icon>
									<font-awesome-icon icon="fa-solid fa-right-from-bracket" />
								</el-icon>
								<span>退出登录</span>
							</el-button>
						</template>
					</el-popconfirm>
				</div>
			</template>
		</el-popover>
	</div>
	<Login ref="loginref" @success="onSuccess"></Login>
</template>

<script setup>
	import logoVue from "./logo.vue";
	import {
		ElNotification
	} from 'element-plus'
	import SwitchTheme from '../../components/switch-theme.vue'
	import {
		ref
	} from 'vue'
	import {
		useWebNotification
	} from '@vueuse/core'
	import {
		useAccountStore
	} from '../../store/account.js'
	import {
		useGlobalStore
	} from '../../store/global.js'
	import {
		useLayersDataStore
	} from '../../store/layers.js'
	import {
		job
	} from '../../api/batch.js'
	import Login from '../../components/login.vue'
	import {
		useRouter
	} from 'vue-router'

	const router = useRouter()
	const globalStore = useGlobalStore()
	const accountStore = useAccountStore()
	const layersDataStore = useLayersDataStore()
	const loginref = ref()
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
	const loading = ref(false)

	onClick((event) => {
	})

	const editTitle = ref(false)

	const onSuccess = (account) => {
		accountStore.id = account.id
		accountStore.name = account.name
		accountStore.account = account.account
		accountStore.email = account.email
		accountStore.authorities = account.authorities
		accountStore.avatar = account.avatar
	}

	const onBack = () => {
		window.location.href = import.meta.env.VITE_APP_BACK_PATH
	}
	const onTitleChange = () => {
		editTitle.value = false
	}
	const compound = async () => {
		if (!accountStore.account) {
			ElNotification({
				title: '请登录后重试。',
				type: 'warning',
			})
			return;
		}
		loading.value = true
		const options = {
			"samplingRate": 44100,
			"codeRate": "192k",
			"width": 1920,
			"height": 1080,
			"codec": "libx264",
			"fps": 25,
		}
		const units = []
		if (layersDataStore.mainAudioLayer) {
			let time = 0
			layersDataStore.mainAudioLayer.units.forEach(unit => {
				if (time < unit.duration.left) {
					units.push({
						"type": "main-audio-blank",
						"duration": unit.duration.left - time
					})
				}
				units.push({
					"type": "main-audio",
					"url": unit.resource.url,
					"start": unit.duration.start,
					"end": unit.duration.end,
					"duration": unit.duration.duration
				})
				time = unit.duration.right
			})
			if (time < layersDataStore.videoTotalDuration) {
				units.push({
					"type": "main-audio-blank",
					"duration": layersDataStore.videoTotalDuration - time
				})
			}
		}
		if (layersDataStore.mainVideoLayer) {
			let time = 0
			layersDataStore.mainVideoLayer.units.forEach(unit => {
				if (time < unit.duration.left) {
					units.push({
						"type": "main-video-blank",
						"duration": unit.duration.left - time
					})
				}
				units.push({
					"type": 'main-' + unit.type,
					"url": unit.resource.url,
					"start": unit.duration.start,
					"end": unit.duration.end,
					"duration": unit.duration.duration,
					"scale": {
						"x": unit.scene.scale.x,
						"y": unit.scene.scale.y
					},
					"overlay": {
						"x": unit.scene.position.x,
						"y": unit.scene.position.y
					}
				})
				time = unit.duration.right
			})
			if (time < layersDataStore.videoTotalDuration) {
				units.push({
					"type": "main-video-blank",
					"duration": layersDataStore.videoTotalDuration - time
				})
			}
		}
		let layers = [...layersDataStore.layers]
		layers.reverse()
		layers.forEach(layer => {
			if (layer.id != layersDataStore.mainVideoLayerId &&
				layer.id != layersDataStore.mainAudioLayerId) {
				if (layer.type == 'audio') {
					layer.units.forEach(unit => {
						units.push({
							"type": 'audio',
							"url": unit.resource.url,
							"start": unit.duration.start,
							"end": unit.duration.end,
							"duration": unit.duration.duration,
							"anchor": unit.duration.left
						})
					})
				}
				if (layer.type == 'video') {
					layer.units.forEach(unit => {
						units.push({
							"type": 'video',
							"url": unit.resource.url,
							"start": unit.duration.start,
							"end": unit.duration.end,
							"duration": unit.duration.duration,
							"anchor": unit.duration.left,
							"scale": {
								"x": unit.scene.scale.x,
								"y": unit.scene.scale.y
							},
							"overlay": {
								"x": unit.scene.position.x,
								"y": unit.scene.position.y
							}
						})
					})
				}
				if (layer.type == 'image') {
					layer.units.forEach(unit => {
						units.push({
							"type": 'image',
							"url": unit.resource.url,
							"duration": unit.duration.duration,
							"anchor": unit.duration.left,
							"scale": {
								"x": unit.scene.scale.x,
								"y": unit.scene.scale.y
							},
							"overlay": {
								"x": unit.scene.position.x,
								"y": unit.scene.position.y
							}
						})
					})
				}
				if (layer.type == 'figure') {
					layer.units.forEach(unit => {
						units.push({
							"type": "figure-picture",
							"avatar": unit.resource.url,
							"audio": unit.resource.audio.url,
							"anchor": unit.duration.left,
							"scale": {
								"x": unit.scene.scale.x,
								"y": unit.scene.scale.y
							},
							"overlay": {
								"x": unit.scene.position.x,
								"y": unit.scene.position.y
							}
						})
					})
				}
			}
		})
		options.units = units;
		if ((layersDataStore.mainVideoLayer && layersDataStore.mainVideoLayer.units.length == 0) || options.units
			.length == 0) {
			ElNotification({
				title: '请添加图片或视频素材',
				type: 'warning',
			})
		} else {
			const result = await job('channel-synthesis-job', globalStore.title, options)
			if (result) {
				show()
				ElNotification({
					title: '视频合成作业已提交',
					type: 'success',
				})
			}
		}
		console.log(options)
		loading.value = false
	}
</script>

<style scoped>
	.logo {
		filter: contrast(0);
	}

	.el-page-header {
		color: var(--el-text-color-primary);
	}


	.project-name .el-button:hover .el-icon {
		opacity: 1;
	}

	.project-name .el-button .el-icon {
		opacity: 0;
		transition: opacity 0.2s;
	}

	.button-group {
		display: flex;
		gap: 10px;
		justify-content: end;
	}

	.button-group .switch-theme {
		margin-right: 20px;
	}
</style>

<style scoped>
	.profile-card {
		padding: 15px;
		display: flex;
		flex-direction: column;
	}

	.profile-card .name {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 16px;
		flex: 1 1 0%;
		overflow: hidden;
	}

	.profile-card .edit {
		flex: 0 0 32px;
	}

	.profile-card span {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.profile-card .el-button {
		margin: 0;
	}
</style>