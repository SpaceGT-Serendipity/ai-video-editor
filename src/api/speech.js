import axios from '../axios/index.js'

export function speechText(file) {
	return axios({
		url: import.meta.env.VITE_APP_SPEECH_SERVER + '/speech-text',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			file
		}
	})
}