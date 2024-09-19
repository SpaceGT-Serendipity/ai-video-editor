<template>
	<div class="voice-profile">
		<el-empty v-if="!(data && data.shortName)" description="请选择声音"></el-empty>
		<el-tabs v-if="data && data.shortName" v-model="tabValue">
			<el-tab-pane label="语音详细信息" name="语音详细信息">
				<div class="voice">
					<div class="cover">
						<el-image v-if="data.properties.IconFileEndpointWithSas"
							:src="data.properties.IconFileEndpointWithSas">
						</el-image>
						<div v-else>
							<el-icon size="80" v-if="data.properties.Gender=='Female'">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#avatar_female"></use>
								</svg>
							</el-icon>
							<el-icon size="80" v-if="data.properties.Gender=='Male'">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#avatar_male"></use>
								</svg>
							</el-icon>
						</div>
					</div>
					<div class="basic">
						<div class="name">
							{{data.properties.LocalName}}
						</div>
						<div class="gender">
							<span v-if="data.properties.Gender=='Female'">女</span>
							<span v-if="data.properties.Gender=='Male'">男</span>
							<span> - {{ageGrades}}</span>
						</div>
						<div class="language">
							<slot name="language"></slot>
						</div>
					</div>
				</div>
				<el-scrollbar height="440px">
					<div v-if="data.samples.roleSamples.length>0" class="voice-style">
						<el-icon>
							<Place />
						</el-icon>
						<el-text tag="b">角色风格:</el-text>
						<el-text>{{data.samples.roleSamples.length}} 风格</el-text>
					</div>
					<div v-if="data.samples.roleSamples.length>0" class="style-samples">
						<el-tag v-for="item in data.samples.roleSamples" :key="item.roleName" size="large">
							{{roleName(item.roleName)}}
							<el-button link @click="audioPlay(item.audioFileEndpointWithSas)">
								<el-icon size="30">
									<VideoPlay />
								</el-icon>
							</el-button>
						</el-tag>
					</div>
					<div v-if="styleSamples.length>0" class="voice-style">
						<el-icon>
							<ChatDotSquare />
						</el-icon>
						<el-text tag="b">说话风格:</el-text>
						<el-text>{{styleSamples.length}} 样式</el-text>
					</div>
					<div v-if="styleSamples.length>0" class="style-samples">
						<el-tag v-for="item in styleSamples" :key="item.styleName" size="large">
							{{styleName(item.styleName)}}
							<el-button link @click="audioPlay(item.audioFileEndpointWithSas)">
								<el-icon size="30">
									<VideoPlay />
								</el-icon>
							</el-button>
						</el-tag>
					</div>
					<div v-if="data.samples.languageSamples.length>0" class="voice-style">
						<el-icon>
							<MapLocation />
						</el-icon>
						<el-text tag="b">语言:</el-text>
						<el-text>{{data.samples.languageSamples.length}}</el-text>
					</div>
					<div v-if="data.samples.languageSamples.length>0" class="style-samples">
						<el-tag v-for="item in data.samples.languageSamples" :key="item.locale" size="large">
							{{language(item.locale)}}
							<el-button link @click="audioPlay(item.audioFileEndpointWithSas)">
								<el-icon size="30">
									<VideoPlay />
								</el-icon>
							</el-button>
						</el-tag>
					</div>
					<div v-if="data.description" class="voice-style">
						<el-icon>
							<ChatLineSquare />
						</el-icon>
						<el-text tag="b">说明:</el-text>
						<el-text style="text-indent: 1rem;">
							<slot name="description"></slot>
						</el-text>
					</div>
					<div v-if="data.masterpieces.length>0" class="voice-style">
						<el-icon>
							<Headset />
						</el-icon>
						<el-text tag="b">作品案例</el-text>
					</div>
					<div v-if="data.masterpieces.length>0" class="voice-masterpieces">
						<el-card v-for="item in data.masterpieces">
							<el-text>{{item.title}}</el-text>
							<el-button link @click="audioPlay(item.audioFileEndpointWithSas)">
								<el-icon size="30">
									<VideoPlay />
								</el-icon>
							</el-button>
						</el-card>
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="试试吧" name="试试吧">
				<el-scrollbar height="520px">
					<div class="voice-generate">
						<el-text tag="b">【 {{data.properties.LocalName}} 】</el-text>
						<el-input v-model="from.text" type="textarea" placeholder="在此处输入或粘贴自己的文本，然后单击播放按钮以收听语音。"
							:rows="8" show-word-limit :maxlength="500"></el-input>
						<el-text tag="b">说话风格</el-text>
						<el-select v-model="from.style">
							<el-option v-for="item in styleSamples" :key="item.styleName"
								:label="styleName(item.styleName)" :value="item.styleName" />
						</el-select>
						<el-text tag="b">语言技能</el-text>
						<el-select v-model="from.language" :disabled="data.samples.languageSamples.length==0">
							<el-option v-for="item in data.samples.languageSamples" :key="item.locale"
								:label="language(item.locale)" :value="item.locale" />
							<el-option v-if="data.samples.languageSamples.length==0" :label="language(data.locale)"
								:value="data.locale"></el-option>
						</el-select>
						<el-button type="primary" icon="VideoPlay" @click="generate">播放</el-button>
					</div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
		<audio id="masterpieces-player" crossorigin playsinline>
		</audio>
	</div>
</template>

<script setup>
	import Plyr from 'plyr';
	import ageGroupsData from './data/age-groups.json'
	import styleNameData from './data/style-name.json'
	import roleNameData from './data/role-name.json'
	import languageData from './data/language.json'
	import {
		ref,
		onMounted,
		computed,
		reactive,
		watch
	} from 'vue'
	import axios from 'axios'

	const props = defineProps({
		data: {
			type: Object
		}
	})
	const tabValue = ref('语音详细信息')
	let player = null
	const from = reactive({
		text: '',
		style: 'general',
		language: ''
	})
	const ageGrades = computed(() => {
		if (ageGroupsData[props.data.properties.AgeGroups])
			return ageGroupsData[props.data.properties.AgeGroups]
		return props.data.properties.AgeGroups
	})
	const styleSamples = computed(() => {
		return props.data.samples.styleSamples.sort((a, b) => {
			return a.styleName == 'general' ? -1 : 1
		})
	})

	watch(() => props.data, () => {
		from.style = 'general'
		from.language = props.data.locale
	})

	const styleName = (name) => {
		for (const key of Object.keys(styleNameData)) {
			if (name == 'general') return '默认'
			if (key.toLowerCase() == name.toLowerCase().replaceAll('-', '')) {
				return styleNameData[key];
			}
		}
		return name;
	}
	const roleName = (name) => {
		for (const key of Object.keys(roleNameData)) {
			if (key.toLowerCase() == name.toLowerCase().replaceAll('-', '')) {
				return roleNameData[key];
			}
		}
		return name;
	}
	const language = (name) => {
		for (const key of Object.keys(languageData)) {
			if (key.toLowerCase() == name.toLowerCase().replaceAll('-', '_')) {
				return languageData[key];
			}
		}
		return name;
	}

	const audioPlay = (url) => {
		if (player == null) {
			player = new Plyr('#masterpieces-player', {
				controls: [],
			})
		}
		player.source = {
			type: 'audio',
			sources: [{
				src: url,
				type: 'audio/mp3',
			}],
		};
		player.play()
	}
	const generate = async () => {
		console.log(from.text)
		const res = await axios.post('http://192.168.124.10:8081/speech-studio', {
			voiceName: 'zh-CN-XiaoxiaoNeural',
			text: '本文主要讲述如何通过CM禁用Federation。我前面写过两篇关于Federation的文章，**//*/#!#$%&^@&(*&可参看《HDFS Federation（联邦）简介》和《如何通过CM为HDFS启用Federation》，本来打算先发Federation测试的文章，然后再发禁用Federation的，但是这周'
		}, {
			headers: {
				"Content-Type": 'multipart/form-data'
			},
		})
		console.log(res)
	}
</script>

<style scoped>
	.voice-profile {
		width: 100px;
		border-left: 1px solid var(--el-border-color);
		flex: 1;
		padding: 10px;
	}

	.voice-profile .voice {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.voice-profile .voice .cover .el-image {
		width: 80px;
		height: 80px;
	}

	.voice-profile .voice .basic {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		justify-content: space-evenly;
	}

	.voice-profile .voice .basic .name {
		font-size: 18px;
		font-weight: 700;
	}

	.voice-profile .voice .basic .gender {
		font-size: 14px;
		color: var(--el-color-info);
	}

	.voice-profile .voice .basic .language {
		font-size: 14px;
		color: var(--el-color-info);
	}

	.voice-profile .voice-style {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}

	.voice-profile .voice-style .el-icon {
		color: var(--el-color-info);
	}

	.voice-profile .style-samples {
		margin-bottom: 10px;
		padding-left: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.voice-profile .voice-masterpieces {
		padding: 10px 30px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.voice-profile .voice-masterpieces .el-card:deep(.el-card__body) {
		padding: 20px;
		display: flex;
		justify-content: space-between;
	}

	.voice-profile .voice-masterpieces audio {
		margin-top: 10px;
		width: 100%;
	}

	.voice-generate .el-textarea,
	.voice-generate .el-select {
		margin: 10px 0 20px;
	}
</style>