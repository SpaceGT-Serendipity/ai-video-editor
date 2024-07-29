import axios from '../axios/index.js'

export async function loadAudios() {
	const res = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/audio/list?uid=dfcb32daa5870d271ae1f7519cadf3b8'
	})
	return res.map(item => {
		return {
			id: item.id,
			name: item.name,
			url: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + item.url,
			duration: item.duration * 1000
		}
	})
}

export async function loadVoices() {
	const voices = []
	const res = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/audio/edge-tts-list'
	})
	voices.push(...res.map(item => {
		return {
			type: 'edge',
			name: item.name,
			voice: item.voice,
		}
	}))
	const res2 = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/audio/rvc-list?uid=dfcb32daa5870d271ae1f7519cadf3b8'
	})
	voices.push(...res2.map(item => {
		return {
			type: 'rvc',
			name: item.name,
			model: item.rvc,
			voice: item.voice,
		}
	}))
	const res3 = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/audio/gpt-sovits-list?uid=dfcb32daa5870d271ae1f7519cadf3b8'
	})
	voices.push(...res3.map(item => {
		return {
			type: 'gpt-sovits',
			name: item.name,
			model: item.modelName,
			promptAudio: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + item.promptAudio,
			promptText: item.promptText
		}
	}))
	return voices
}