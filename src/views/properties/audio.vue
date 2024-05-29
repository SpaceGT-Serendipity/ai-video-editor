<template>
	<div class="audio-panel">
		<div class="setting">
			<div class="drive-mode">
				<el-button text bg :class="{'active':driveMode=='文本驱动'}" @click="driveMode='文本驱动'">文本驱动</el-button>
				<el-button text bg :class="{'active':driveMode=='音频驱动'}" @click="driveMode='音频驱动'">音频驱动</el-button>
			</div>
			<el-button text bg class="model">
				<el-icon size="24">
					<font-awesome-icon icon="fa-solid fa-headset" />
				</el-icon>
				<div class="user">
					<div>王硕</div>
					<div class="hint">切换声音</div>
				</div>
			</el-button>
		</div>
		<div class="text" v-if="driveMode=='文本驱动'">
			<el-input v-model="text" type="textarea" resize="none" maxlength="5000" show-word-limit></el-input>
			<el-button size="large">
				<el-icon>
					<font-awesome-icon icon="fa-solid fa-file-audio" />
				</el-icon>
				生成音频
			</el-button>
		</div>
		<div class="audio" v-if="driveMode=='音频驱动'">
			<el-upload :show-file-list="false" action :auto-upload="false" multiple accept=".mp3"
				:on-change="handleUpload">
				<el-button size="large">
					<el-icon size="20">
						<font-awesome-icon icon="fa-solid fa-square-plus" />
					</el-icon>
					<span>选择本地音频</span>
					<el-tooltip class="box-item" effect="dark" content="支持批量上传文件,单文件不超过10MB" placement="top">
						<el-button link type="info">
							<el-icon>
								<InfoFilled />
							</el-icon>
						</el-button>
					</el-tooltip>
				</el-button>
			</el-upload>
			<el-scrollbar>
				<div class="music" v-for="item in audioList">
					<div class="icon">
						<el-button link v-if="true">
							<el-icon size="12">
								<font-awesome-icon icon="fa-solid fa-play" />
							</el-icon>
						</el-button>
						<el-button link v-else>
							<el-icon size="12">
								<font-awesome-icon icon="fa-solid fa-pause" />
							</el-icon>
						</el-button>
					</div>
					<div class="file">
						<span class="name">{{item.name}}</span>
						<span class="duration">{{dateFormat(new Date(0).setUTCSeconds(item.duration),'mm:ss')}}</span>
					</div>
					<div class="button-group">
						<el-button link type="info">
							<el-icon size="16">
								<Delete />
							</el-icon>
						</el-button>
					</div>
					<div class="checked">
						<el-icon size="50">
							<svg aria-hidden="true">
								<use xlink:href="#undraw_happy_music_g6wc"></use>
							</svg>
						</el-icon>
					</div>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		loadAudios
	} from '../../api/audio.js'
	import {
		dateFormat
	} from '../../utils/time.js'

	const driveMode = ref('文本驱动')
	const text = ref('')
	const audioList = ref([])

	const handleUpload = async (file) => {
		console.log(file)
	}
	const load = async () => {
		const res = await loadAudios()
		audioList.value = res
	}

	onMounted(() => {
		load()
	})
</script>

<style scoped>
	.audio-panel {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.setting {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		flex: 0 0 0%;
	}

	.drive-mode .el-button {
		color: #888a;
	}

	.drive-mode .el-button.active {
		background-color: var(--el-fill-color) !important;
		color: var(--el-button-text-color);
	}

	.model {
		height: 50px;
	}

	.model .el-icon {
		margin-right: 15px;
	}

	.model .user {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 12px;
	}

	.model .hint {
		font-size: 10px;
		color: #888a;
	}

	.text {
		background-color: #141414;
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
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

	.audio {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.audio .el-scrollbar {
		margin-top: 12px;
	}

	.audio .el-icon {
		margin: 0 6px;
	}

	.audio:deep(.el-upload) {
		width: 100%;
	}

	.audio .el-button {
		width: 100%;
	}

	.audio .music {
		position: relative;
		border: 1px solid #0000;
		border-radius: 5px;
		background-color: var(--el-bg-dark-color);
		margin-bottom: 8px;
		padding: 12px;
		display: flex;
		gap: 10px;
		align-items: center;
		opacity: 0.8;
		cursor: pointer;
	}

	.audio .music:hover {
		border: 1px solid #308DFF;
		opacity: 1;
	}

	.audio .music:hover .button-group {
		display: flex;
	}

	.audio .music .icon {
		flex: 0 0 0%;
		width: 30px;
		height: 30px;
		background-image: url('data:image/png;base64,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');
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.audio .music .button-group {
		flex: 0 0 0%;
		display: none;
	}

	.audio .music .button-group .el-button {
		margin-left: 0;
	}

	.audio .music .file {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1 1 0%;
	}

	.audio .music .file .name {
		opacity: 0.9;
	}

	.audio .music .file .duration {
		opacity: 0.5;
	}

	.audio .music .checked {
		width: 50px;
		height: 50px;
		position: absolute;
		right: 10%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
<style>
	.el-textarea__inner::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px var(--scrollbar-background-color);
		border-radius: 4px;
		background-color: var(--scrollbar-background-color);
		cursor: pointer;
	}

	.el-textarea__inner::-webkit-scrollbar-thumb {
		background-color: var(--scrollbar-foreground-color);
		border-radius: 4px;
	}

	.el-textarea__inner::-webkit-scrollbar-thumb {
		width: 14px;
		border-radius: 4px;
		background-color: var(--scrollbar-foreground-color);
		cursor: pointer;
	}

	.el-textarea__inner::-webkit-scrollbar {
		width: 8px;
	}

	.el-textarea__inner:hover::-webkit-scrollbar {
		width: 8px;
		background-color: var(--scrollbar-background-color);
		cursor: pointer;
	}
</style>