import axios from '../axios/index.js'

export async function loadVoices(uid) {
	const voices = []
	const res = await axios({
		method: 'get',
		/* url: 'https://ai-api.yigee.cn/audio/edge-tts-list', */
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/audio/edge-tts-list',
		params: {
			uid
		}
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
		/* url: 'https://ai-api.yigee.cn/audio/rvc-list?uid=dfcb32daa5870d271ae1f7519cadf3b8' */
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/audio/rvc-list',
		params: {
			uid
		}
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
		/* url: 'https://ai-api.yigee.cn/audio/gpt-sovits-list?uid=dfcb32daa5870d271ae1f7519cadf3b8' */
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/audio/gpt-sovits-list',
		params: {
			uid
		}
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