import axios from '../axios/index.js'

export function getOptimumBatch(support) {
	return axios({
		method: 'get',
		url: import.meta.env.VITE_APP_BATCH_SERVER + '/batch/getOptimumBatch/' + support
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
	"name": "transparent-background-step",
	"label": "初始化背景"
}, {
	"name": "unit-init-step",
	"label": "初始化元素"
}, {
	"name": "unit-clip-step",
	"label": "裁剪元素"
}, {
	"name": "unit-image-step",
	"label": "图片合成视频"
}, {
	"name": "unit-figure-bg-color-step",
	"label": "数字人背景初始化"
}, {
	"name": "unit-figure-video-step",
	"label": "数字人视频合成"
}, {
	"name": "unit-figure-transparent-format-step",
	"label": "数字人透明通道"
}, {
	"name": "unit-blank-step",
	"label": "空白区域"
}, {
	"name": "unit-format-step",
	"label": "格式化"
}, {
	"name": "unit-scale-step",
	"label": "元素缩放"
}, {
	"name": "unit-main-overlay-step",
	"label": "元素偏移"
}, {
	"name": "unit-main-concat-step",
	"label": "组图层合并"
}, {
	"name": "unit-mixture-step",
	"label": "元素混合"
}, {
	"name": "unit-video-format-converting-step",
	"label": "视频转换格式"
}, {
	"name": "clear-transparent-background-step",
	"label": "清除背景"
}, {
	"name": "unit-checkout-step",
	"label": "校验合成结果"
}]