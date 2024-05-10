import {
	defineStore
} from 'pinia'

export const useTrackStore = defineStore('track', {
	state: () => ({
		// 控制区域宽度
		controllerGroupWidth: 150,
		// 图层高度
		trackLayerHeight: 45,
		// 时间尺高度
		trackTimelineRulerHeight: 40,
		// 时间尺每个范围宽度（px）
		trackTimelineRulerScaleWidth: 150,
		// 时间尺每个范围时长（毫秒）
		trackTimelineRulerScaleTime: 1000 * 10,
		// 时间尺默认时长（毫秒）
		trackTimelineRulerDefultTime: 1000 * 60 * 20
	}),
	getters: {
		// 每秒宽度（px）
		secondWidth: (state) => state.trackTimelineRulerScaleWidth / (state.trackTimelineRulerScaleTime / 1000),
	},
})