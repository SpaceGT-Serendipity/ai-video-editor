import axios from '../axios/index.js'
import AES from 'crypto-js/aes'
import MD5 from 'crypto-js/md5'
import CryptoJS from 'crypto-js'

export function loginPhone(phone, code) {
	return axios({
		url: import.meta.env.VITE_APP_ACCOUNT_SERVER + '/loginPhone',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			phone,
			code
		}
	})
}

export function loginAccount(account, password) {
	return axios({
		url: import.meta.env.VITE_APP_ACCOUNT_SERVER + '/loginAccount',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			account,
			password
		}
	})

}

export function changePassword(phone, code, password) {
	return axios({
		url: import.meta.env.VITE_APP_ACCOUNT_SERVER + '/changePassword',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			phone,
			code,
			password
		}
	})
}

export function changeAvatar(avatar){
	return axios({
		url: import.meta.env.VITE_APP_ACCOUNT_SERVER + '/changeAvatar',
		method: 'post',
		headers: {
			"Content-Type": 'multipart/form-data'
		},
		data: {
			avatar
		}
	})
}