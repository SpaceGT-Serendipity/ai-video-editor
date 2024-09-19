import axios from '../axios/index.js'
import {
	useStateStore
} from '../store/global.js'
import {
	v4 as uuidv4
} from 'uuid'

export const filePath = import.meta.env.VITE_APP_FILE_RESOURCE + '/'

export function upload(file, path) {
	const stateStore = useStateStore()
	const id = uuidv4()
	return axios({
		method: 'post',
		url: import.meta.env.VITE_APP_FILE_SERVER + '/upload',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: false,
		data: {
			file,
			path
		},
		onUploadProgress(progressEvent) {
			stateStore.push(id, `正在上传文件请勿关闭页面,当前进度${parseInt(progressEvent.progress*100)}%.`)
			if (progressEvent.progress == 1)
				stateStore.destroy(id)
		}
	})
}

export function download(url) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_FILE_SERVER + '/download/' + url,
		responseType: 'blob',
		withCredentials: false,
	})
}

export function ppt2image(file) {
	return axios({
		method: 'post',
		url: import.meta.env.VITE_APP_FILE_SERVER + '/ppt/ppt2image',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: false,
		data: {
			file
		}
	})
}