import axios from '../axios/index.js'

export async function list(current, size) {
	const res = await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/video/list',
		params: {
			current,
			size
		}
	})
	return res.map(item => {
		return {
			id: item.id,
			name: item.name,
			url: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + item.url,
			cover: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + item.cover,
			duration: item.duration * 1000,
			size: item.size
		}
	})
}

export async function listCount() {
	return await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/video/listCount'
	})
}

export function rename(id, name){
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/video/rename/' + id,
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			id, 
			name
		}
	})
}

export function del(id){
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/video/del/' + id,
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		}
	})
}