import axios from '../axios/index.js'

export function sendCode(phone) {
	return axios({
		url: import.meta.env.VITE_APP_MESSAGE_SERVER + '/sms/sendCode',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			phone
		}
	})
}