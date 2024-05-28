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

export function loadImage() {
	return [{
		name: '带妆上阵',
		url: 'https://mobvoi-digitalhuman-public.weta365.com/93284288ca624b63a4285036d200f390.jpeg'
	}]
}

export function loadVideo() {
	return [{
		name: 'xgplayer',
		url: 'https://oss.file.yigee.cn/ai-video-editor/source/video/5fdaa3f0-e43f-4953-962e-8a4673d049ff.mp4'
	}]
}