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
			url: import.meta.env.VITE_APP_FILE_API + '/download/' + item.url,
			duration: item.duration
		}
	})
}