import axios from '../axios/index.js'

export function list(uid) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/list',
		params: {
			uid
		}
	})
}

export function info(id, creator) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/info',
		params: {
			id,
			creator
		}
	})
}

export function save(id, fileName, name, size, suffix, url, cover, creator, type = 'picture') {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/save',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			id,
			fileName,
			name,
			size,
			suffix,
			url,
			cover,
			creator,
			type
		}
	})
}

export function del(id, creator) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/del',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		method: 'post',
		data: {
			id,
			creator
		}
	})
}

export function motionSelect(aid, creator) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/motion/select',
		params: {
			aid,
			creator
		}
	})
}

export function motionSave(id, aid, name, url, cover, duration, creator) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/motion/save',
		method: 'post',
		data: {
			id,
			aid,
			name,
			url,
			cover,
			duration,
			creator
		}
	})
}

export function motionDel(id, creator) {
	return axios({
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/avatar/motion/del',
		method: 'post',
		data: {
			id,
			creator
		}
	})
}