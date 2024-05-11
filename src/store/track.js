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
		trackTimelineRulerDefultTime: 1000 * 60 * 20,
		// 时间线滚动区域左侧内边距 (px)
		trackTimelineScrollbarPaddingLeft: 5
	}),
	getters: {
		// 每秒宽度（px）
		secondWidth: (state) => state.trackTimelineRulerScaleWidth / (state.trackTimelineRulerScaleTime / 1000),
	},
})


export const useTrackRulerConfigStore = defineStore('track-ruler-config', {
	state: () => ({
		// 对缩放值进行节流，减少尺子长度和时间标识的渲染次数。避免拖动缩放进度条的卡顿现象。 默认渲染延迟50毫秒，如果你的配置还卡顿可增加延迟。
		scaleThrottledTime: 50
	}),
})