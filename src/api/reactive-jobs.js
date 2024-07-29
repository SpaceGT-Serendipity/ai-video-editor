import axios from '../axios/index.js'

export function selectOwn(current, size) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/jobs/selectOwn',
		params: {
			current,
			size
		}
	})
}

export async function result(id) {
	const res = await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/jobs/result/' + id,
	})
	return {
		name: res.name,
		url: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + res.url,
		cover: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + res.cover,
		duration: res.duration * 1000,
		size: res.size
	}
}