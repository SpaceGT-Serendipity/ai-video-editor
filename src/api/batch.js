import axios from '../axios/index.js'

export function getOptimumBatch() {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/batch/getOptimumBatch'
	})
}

export function ttsJob(batch, options) {
	return axios({
		method: 'post',
		url: batch.path + '/tts-job',
		headers: {
			'Content-Type': 'application/json'
		},
		responseType: 'blob',
		data: options
	})
}

export function edgeTtsVoicesJob(batch) {
	return axios({
		method: 'get',
		url: batch.path + '/edge-tts-voices-job'
	})
}


export function job(jobName, jobTitle, options) {
	return axios({
		method: 'post',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/jobs/' + jobName + '/' + jobTitle,
		headers: {
			"Content-Type": "application/json"
		},
		data: options
	})
}