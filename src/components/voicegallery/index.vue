<template>
	<div style="padding-right: 10px;">
		<h2>语音库</h2>
		<div style="display: flex; flex-direction: column; gap: 10px; ">
			<div style="display: flex; justify-content: space-between;">
				<div style="display: flex; gap: 10px;">
					<el-input v-model="search" style="width: 240px" placeholder="搜索" prefix-icon="Search" />
					<el-select v-model="language" filterable placeholder="语言" style="width: 240px" @change="active.shortName=null">
						<el-option v-for="key in Object.keys(languageData)" :key="key" :label="languageData[key]"
							:value="key" />
					</el-select>
				</div>
				<el-text size="small">{{voicesDataTarget.length}}个语言</el-text>
			</div>
			<el-collapse>
				<el-collapse-item name="4">
					<template #title>
						<el-text style="margin-left: 10px;">
							<el-icon>
								<Filter />
							</el-icon>
							筛选
						</el-text>
					</template>
					<div class="filters">
						<div class="filters-item">
							<el-text class="filters-label">
								<el-icon>
									<User />
								</el-icon>
								性别
							</el-text>
							<div class="tags">
								<el-button text bg size="small" v-for="item in gender" :key="item.value"
									:type="tags.find(tag=>tag.value==item.value)?'primary':null"
									@click="onClickTag(item)">{{item.label}}</el-button>
							</div>
						</div>
						<div class="filters-item">
							<el-text class="filters-label">
								<el-icon>
									<Connection />
								</el-icon>
								功能
							</el-text>
							<div class="tags">
								<el-button text bg size="small" v-for="item in functions" :key="item.value"
									:type="tags.find(tag=>tag.value==item.value)?'primary':null"
									@click="onClickTag(item)">{{item.label}}</el-button>
							</div>
						</div>
						<div class="filters-item">
							<el-text class="filters-label">
								<el-icon>
									<ChatDotSquare />
								</el-icon>
								说话风格
							</el-text>
							<div class="tags">
								<el-button text bg size="small" v-for="item in styles"
									:type="tags.find(tag=>tag.value==item.value)?'primary':null"
									@click="onClickTag(item)">{{item.label}}</el-button>
							</div>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
			<div class="tags">
				<el-tag v-for="(item,index) in tags" :key="item.value" closable
					@close="tags.splice(index,1)">{{item.label}}</el-tag>
				<el-button v-if="tags.length>0" icon="close" size="small" text
					@click="tags.splice(0,999)">全部清除</el-button>
			</div>
			<div class="voice-content">
				<el-scrollbar height="100%" style="width: 820px;">
					<el-empty v-if="voicesDataTarget.length==0" description="找不到匹配的语音"></el-empty>
					<div class="voice-card-items">
						<div class="voice-card" :class="{'active':active.shortName==item.shortName}"
							v-for="item in voicesDataTarget" :key="item.shortName" @click="active=item">
							<div class="stack">
								<div class="voice">
									<div class="cover">
										<el-image v-if="item.properties.IconFileEndpointWithSas"
											:src="item.properties.IconFileEndpointWithSas">
										</el-image>
										<div v-else>
											<el-icon size="40" v-if="item.properties.Gender=='Female'">
												<svg class="icon" aria-hidden="true">
													<use xlink:href="#avatar_female"></use>
												</svg>
											</el-icon>
											<el-icon size="40" v-if="item.properties.Gender=='Male'">
												<svg class="icon" aria-hidden="true">
													<use xlink:href="#avatar_male"></use>
												</svg>
											</el-icon>
										</div>
									</div>
									<div class="basic">
										<div class="name">
											{{item.properties.LocalName}}
										</div>
										<div class="gender">
											<span v-if="item.properties.Gender=='Female'">女</span>
											<span v-if="item.properties.Gender=='Male'">男</span>
										</div>
									</div>
								</div>
								<div class="audio-player">
									<el-button link v-if="item.samples.styleSamples.length>0"
										@click="audioPlay(getDefaultSamples(item))">
										<el-icon size="30">
											<VideoPlay />
										</el-icon>
									</el-button>
								</div>
							</div>
							<div class="detail-info">
								<div>
									<el-tag effect="plain" round>
										{{languageData[language]}}
										<span
											v-if="item.samples.languageSamples.length>1">+{{item.samples.languageSamples.length-1}}</span>
									</el-tag>
								</div>
								<div v-if="item.samples.styleSamples.length>1">
									<el-tag effect="plain" round>
										<el-icon>
											<ChatDotSquare />
										</el-icon>
										{{item.samples.styleSamples.length}} 风格样式
									</el-tag>
								</div>
								<div class="description">
									{{voicesDescriptionTarget(item)}}
								</div>
							</div>
						</div>
					</div>
				</el-scrollbar>
				<profile-vue :data="active">
					<template v-slot:language>
						{{languageData[language]}}
					</template>
					<template v-slot:description>
						{{voicesDescriptionTarget(active)}}
					</template>
				</profile-vue>
			</div>
			<audio id="player" crossorigin playsinline>
			</audio>
		</div>
		<svg-library-vue v-show="false"></svg-library-vue>
	</div>
</template>

<script setup>
	import profileVue from './profile.vue'
	import svgLibraryVue from './svg-library.vue';
	import Plyr from 'plyr';
	import languageData from './data/language.json'
	import voicesData from './data/voices.json'
	import descriptionData from './data/description.json'
	import styleNamesData from './data/style-name.json'
	import {
		ref,
		reactive,
		onMounted,
		nextTick,
		computed
	} from 'vue'

	const gender = [{
		label: '男',
		value: 'Male',
		type: 'gender'
	}, {
		label: '女',
		value: 'Female',
		type: 'gender'
	}]
	const functions = [{
		label: '多语言',
		value: 'languageSamples',
		type: 'functions'
	}, {
		label: '多样式',
		value: 'styleSamples',
		type: 'functions'
	}]
	const styles = []
	for (const key of Object.keys(styleNamesData)) {
		styles.push({
			"label": styleNamesData[key],
			"value": key,
			"type": "styles"
		})
	}
	const search = ref('')
	const language = ref('ZH_CN')
	const tags = reactive([])
	const active = ref({
		"properties": {},
		"categories": [],
		"masterpieces": [],
		"samples": {
			"languageSamples": [],
			"roleSamples": [],
			"styleSamples": []
		},
	})
	let player = null
	const voicesDataTarget = computed(() => voicesData
		.filter(item => item.samples.styleSamples.length > 0)
		.filter(item => language.value.toUpperCase() == item.locale.toUpperCase().replaceAll('-', '_'))
		.filter(item => {
			if (tags.length > 0) {
				let gender_verify = false
				let functions_verify = false
				let styles_verify = false
				const gender_tags = tags.filter(tag => tag.type == 'gender')
				const functions_tags = tags.filter(tag => tag.type == 'functions')
				const styles_tags = tags.filter(tag => tag.type == 'styles')
				if (gender_tags.length > 0) {
					for (const tag of gender_tags) {
						if (tag.value == item.properties.Gender) gender_verify = true
					}
				} else gender_verify = true
				if (functions_tags.length > 0) {
					for (const tag of functions_tags) {
						if (item.samples[tag.value].length > 1) functions_verify = true
					}
				} else functions_verify = true
				if (styles_tags.length > 0) {
					for (const tag of styles_tags) {
						if (item.properties.VoiceStyleNames.replaceAll('-', '').includes(tag.value.toLowerCase()))
							styles_verify = true
					}
				} else styles_verify = true
				return gender_verify && functions_verify && styles_verify;
			}
			return true;
		})
	)
	const voicesDescriptionTarget = (voice) => {
		if (descriptionData[voice.properties.DisplayName + 'Description'])
			return descriptionData[voice.properties.DisplayName + 'Description']
		return voice.description;
	}

	const onClickTag = (tag) => {
		const findIndex = tags.findIndex(item => item.type == tag.type && item.value == tag.value)
		if (findIndex >= 0) {
			tags.splice(findIndex, 1)
		} else {
			tags.push(tag)
		}
	}
	const getDefaultSamples = (voice) => {
		for (const item of voice.samples.styleSamples) {
			if (item.styleName == 'general') return item.audioFileEndpointWithSas
		}
		return voice.samples.styleSamples[0].audioFileEndpointWithSas;
	}
	const audioPlay = (url) => {
		if (player == null) {
			player = new Plyr('#player', {
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
</script>

<style scoped>
	.el-collapse {
		border: 1px solid var(--el-collapse-border-color);
	}

	.filters {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.filters-item {
		display: flex;
	}

	.filters-label {
		flex-basis: 100px;
		flex-shrink: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.tags .el-button {
		margin-left: 0;
	}

	.voice-content {
		border: 1px solid var(--el-border-color);
		display: flex;
		height: 600px;
		margin-bottom: 50px;
	}

	.voice-card-items {
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.voice-card {
		width: 260px;
		height: 170px;
		padding: 10px;
		box-sizing: border-box;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px;
		cursor: pointer;
	}

	.voice-card:hover {
		background-color: #deecf9;
	}

	.voice-card.active {
		background-color: #c7e0f4;
	}

	.voice-card .stack {
		display: flex;
		justify-content: space-between;
	}

	.voice-card .voice {
		display: flex;
		gap: 10px;
	}

	.voice-card .voice .cover .el-image {
		width: 40px;
		height: 40px;
	}

	.voice-card .voice .basic {
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	.voice-card .voice .basic .gender {
		font-size: 12px;
		color: var(--el-color-info-light-3);
	}

	.voice-card .audio-player {
		color: #0a7dd6;
	}

	.voice-card .detail-info {
		font-size: 12px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding-top: 5px;

	}

	.voice-card .detail-info .description {
		display: -webkit-box;
		overflow-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.voice-card .detail-info .el-tag:deep(.el-tag__content) {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>