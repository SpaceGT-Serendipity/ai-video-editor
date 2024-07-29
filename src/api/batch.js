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


export function getBatchStepInfo(jobId) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/batch/step/' + jobId,
	})
}

export function listByIds(ids) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/jobs/listByIds/' + ids,
	})
}

export const steps = [{
	"name": "video-init-step"
}, {
	"name": "transparent-background-step"
}, {
	"name": "video-clip-step"
}, {
	"name": "video-blank-step"
}, {
	"name": "video-image-step"
}, {
	"name": "video-update-size-step"
}, {
	"name": "video-update-sampling-rate-step"
}, {
	"name": "video-update-code-rate-step"
}, {
	"name": "video-update-frame-rate-step"
}, {
	"name": "video-scale-overlay-step"
}, {
	"name": "video-concat-step"
}, {
	"name": "video-mixture-blank-step"
}, {
	"name": "video-mixture-step"
}, {
	"name": "video-channel-output-step"
}, {
	"name": "audio-init-step"
}, {
	"name": "audio-clip-step"
}, {
	"name": "blank-audio-step"
}, {
	"name": "update-sampling-rate-step"
}, {
	"name": "update-code-rate-step"
}, {
	"name": "audio-concat-step"
}, {
	"name": "audio-mixed-blank-step"
}, {
	"name": "audio-mixed-step"
}, {
	"name": "audio-channel-output-step"
}, {
	"name": "video-channel-audio-mixed-step"
}, {
	"name": "figure-init-step"
}, {
	"name": "figure-set-background-color-step"
}, {
	"name": "sadtalker-step"
}, {
	"name": "figure-transparent-format-step"
}, {
	"name": "figure-channel-mixed-blank-step"
}, {
	"name": "figure-channel-mixed-step"
}, {
	"name": "figure-channel-audio-update-code-rate-step"
}, {
	"name": "figure-channel-audio-update-sampling-rate-step"
}, {
	"name": "figure-channel-audio-mixed-blank-step"
}, {
	"name": "figure-channel-audio-mixed-step"
}, {
	"name": "clear-transparent-background-step"
}, {
	"name": "channel-checkout-step"
}]