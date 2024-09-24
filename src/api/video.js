import axios from '../axios/index.js'

export async function list(current, size) {
	return await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/video/list',
		params: {
			current,
			size
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