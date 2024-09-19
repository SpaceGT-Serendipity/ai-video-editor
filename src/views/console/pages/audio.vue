<template>
	<div style="padding-right: 15px;">
		<h2 class="title">
			我的声音
			<el-text style=" margin-left: 20px; opacity: 0.7;">双击标题可以重命名</el-text>
		</h2>
		<div class="container">
			<div class="main">
				<el-empty v-if="voiceDataStore.privateData.length == 0" description="暂无声音" />
				<div class="basic" :style="{'height' : voiceDataStore.privateData.length > 15 ? '510px' : '300px'}">
					<div class="active" v-for="(item, index) in voiceDataStore.privateData" :key="item.id"
						@click="handleOpen(item.url)">
						<el-button class="item-btn" text round @click="handleDel(item.id)">删除</el-button>
						<div class="audio-player">
							<div>
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#audio"></use>
								</svg>
							</div>
							<div class="text-gradient" @dblclick="handleRename(item.id)">
								{{item.name}}
							</div>
						</div>
					</div>
				</div>
				<div style="position: fixed; bottom: 20px; left: calc(50% - 300px);">
					<audio controls v-if="music">
						<source :src="music.src" />
					</audio>
				</div>
			</div>
			<div class="aside">
				<div style="display: flex; justify-content: space-between;margin-bottom: 10px;">
					<el-text size="large">生成音频</el-text>
					<select-voice-button-vue class="model" :voice="voice.name"
						@click="selectVoiceRef.open()"></select-voice-button-vue>
					<select-voice-vue ref="selectVoiceRef" @change="(event)=>voice=event"></select-voice-vue>
				</div>
				<div class="text">
					<el-input v-model="voiceTitle" placeholder="音频标题"></el-input>
					<el-input v-model="voiceText" type="textarea" resize="none" maxlength="5000"
						show-word-limit></el-input>
					<el-button size="large" :loading="loadingGenerateAudio" :disabled="!voiceTitle||!voiceText"
						@click="onGenerateAudio">
						<el-icon>
							<font-awesome-icon icon="fa-solid fa-file-audio" />
						</el-icon>
						生成音频
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ElNotification,
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import selectVoiceButtonVue from '../../../components/select-voice-button.vue';
	import selectVoiceVue from '../../../components/select-voice.vue';
	import {
		ref,
		reactive,
		nextTick,
		onMounted
	} from 'vue'
	import Plyr from 'plyr';
	import {
		upload,
		filePath
	} from '../../../api/file.js'
	import {
		rename,
		del as voiceDel
	} from '../../../api/resource.js'
	import {
		getOptimumBatch,
		ttsJob,
		edgeTtsVoicesJob
	} from '../../../api/batch.js'
	import {
		useAccountStore
	} from '../../../store/account.js'
	import {
		useVoiceDataStore
	} from '../../../store/data/voice.js'

	const accountStore = useAccountStore()
	const voiceDataStore = useVoiceDataStore()
	const selectVoiceRef = ref()
	const voice = ref({
		type: "edge",
		name: "中文-晓晓-女",
		voice: "zh-CN-XiaoxiaoNeural",
		model: null,
		promptAudio: null,
		promptText: null
	})
	const voiceTitle = ref('')
	const voiceText = ref('')
	const loadingGenerateAudio = ref(false)
	const music = ref()
	const selectAudio = ref([])
	let player = null;

	const handleOpen = (url) => {
		music.value = null
		nextTick(() => {
			music.value = {
				title: url.substring(url.lastIndexOf('/') + 1),
				artist: ':',
				src: url
			}
		})
	}

	const handleRename = async (id) => {
		ElMessageBox.prompt('请输入音频名', '重命名', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({
				value
			}) => {
				if (value) {
					rename(id, value).then(res => {
						load()
					})
				} else {
					ElNotification({
						title: '消息',
						message: '音频名不得为空',
					})
				}
			})
			.catch(() => {})
	}

	const load = async () => {
		await voiceDataStore.load()
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
				voiceDel(id).then(res => {
					ElNotification({
						title: '消息',
						message: '删除成功',
					})
					load()
				})
			})
			.catch(() => {})
	}

	const onGenerateAudio = async () => {
		if (!voiceText.value) {
			ElNotification({
				title: '请输入文案。',
				type: 'warning',
			})
			return;
		}
		loadingGenerateAudio.value = true
		try {
			const batch = await getOptimumBatch('TTS')
			const blob = await ttsJob(batch, {
				type: voice.value.type,
				text: voiceText.value,
				voice: voice.value.voice,
				model: voice.value.model,
				promptAudio: voice.value.promptAudio,
				promptText: voice.value.promptText,
				rate: 0,
				volume: 0,
				pitch: 0
			})
			const localFile = new File([blob], 'voice.mp3', {
				type: blob.type
			})
			const remoteFile = await upload(localFile, 'audio')
			await voiceDataStore.save({
				name: voiceTitle.value,
				size: remoteFile.size,
				url: remoteFile.url,
				duration: parseInt(remoteFile.duration * 1000),
				creator: accountStore.id
			})
			voiceText.value = ''
			voiceTitle.value = ''
		} catch (e) {}
		loadAudioPreview()
		loadingGenerateAudio.value = false
	}

	const loadAudioPreview = () => {
		nextTick(() => {
			if (player != null) {
				player.source = {
					type: 'audio',
					sources: [{
						src: audio.url,
						type: 'audio/mp3',
					}],
				};
			} else {
				player = new Plyr('#player')
			}
		})
	}

	onMounted(() => {
		load()
	})
</script>

<style scoped>
	.title {
		font-weight: 600;
	}

	.container {
		display: flex;
	}

	.container .main {
		flex: 1;
	}

	.container .aside {
		flex-shrink: 0;
		width: 300px;
		border-left: 1px solid rgb(238, 238, 238);
		padding-left: 20px;
		padding-bottom: 20px;
	}

	.text {
		background-color: var(--layer-bg-dark);
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		height: 400px;
	}

	.text .el-icon {
		margin-right: 6px;
	}

	.text .el-textarea {
		flex: 1 1 0%;
	}

	.text .el-textarea:deep(.el-textarea__inner) {
		height: 100%;
	}
</style>
<style scoped>
	.main .basic {
		display: flex;
		flex-wrap: wrap;
		overflow-x: auto;
	}

	.main .active {
		margin-left: 12px;
		position: relative;
		width: 170px;
		height: 140px;
		transition: all 0.2s;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.active:hover {
		transform: scale(1.1);
	}

	.main .audio-player {
		display: flex;
		text-align: center;
		box-sizing: border-box;
		flex-direction: column;
	}

	.audio-player svg {
		width: 75px;
		height: 75px;
	}

	.text-gradient {
		font-size: 14px;
		color: #616161;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}


	.active:hover .item-btn {
		opacity: 1;
	}

	.active .item-btn {
		position: absolute;
		opacity: 0;
		transition: all 0.3s;
		top: 10px;
		right: 10px;
		width: 60px;
		height: 25px;
		font-size: 11px;
		color: white;
		background-color: #f1314e;
	}
	
	
	.active .item-btn:hover {
		color: #d0d0d0;
		background-color: #f1314e;
	}
</style>