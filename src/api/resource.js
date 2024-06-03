import axios from '../axios/index.js'

export async function loadFigure() {
	const res = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/avatar/list'
	})
	return res.map(item => {
		return {
			name: item.name,
			url: import.meta.env.VITE_APP_FILE_API + '/download/' + item.url,
			cover: import.meta.env.VITE_APP_FILE_API + '/download/' + item.cover,
			tag: item.type
		}
	})
}

export async function loadImage() {
	return [{
		name: '带妆上阵',
		url: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg'
	}]
}

export async function loadVideo() {
	const res = await axios({
		method: 'get',
		url: 'https://ai-api.yigee.cn/video/list?uid=dfcb32daa5870d271ae1f7519cadf3b8'
	})
	return res.map(item => {
		return {
			name: item.name,
			url: import.meta.env.VITE_APP_FILE_API + '/download/' + item.url,
			cover: import.meta.env.VITE_APP_FILE_API + '/download/' + item.cover,
			duration: item.duration * 1000,
			size: item.size
		}
	})
}