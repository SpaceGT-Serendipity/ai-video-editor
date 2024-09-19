import axios from '../axios/index.js'

export function list() {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project',
	})
}

export function logList(pid) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project/log',
		params: {
			pid
		}
	})
}

export function logNewest(pid) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project/log/newest',
		params: {
			pid
		}
	})
}

export function logOne(logid) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project/log/' + logid
	})
}

export function save(pid, pname, data) {
	return axios({
		method: 'post',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project/save',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			pid,
			pname,
			data
		}
	})
}

export function del(pid) {
	return axios({
		method: 'post',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/project/del/' + pid
	})
}