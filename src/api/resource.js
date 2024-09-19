import axios from '../axios/index.js'

export async function loadResource(type, current, size) {
	return await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/resource/list',
		params: {
			type,
			current,
			size
		}
	})
}

export async function count(type) {
	return await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/resource/count',
		params: {
			type
		}
	})
}

export async function loadFigure() {
	const res = await axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/list'
	})
	return res.map(item => {
		return {
			...item,
			tag: item.type
		}
	})
}

export function save(id, name, type, size, duration, url, cover, creator) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/resource/save',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			id,
			name,
			type,
			size,
			duration,
			url,
			cover,
			creator
		}
	})
}

export function del(id) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/resource/del/' + id,
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		}
	})
}

export function rename(id, name) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/resource/rename/' + id,
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			name
		}
	})
}
