import {
	defineStore
} from 'pinia'

export const useTrackStore = defineStore('track', {
	state: () => ({
		// 控制区域宽度
		controllerGroupWidth: 150,
		// 图层高度
		layerHeight: 45,
		// 时间尺高度
		rulerHeight: 40,
		// 时间尺每个范围宽度（px）
		rulerScaleWidth: 150,
		// 时间尺每个范围时长（毫秒）
		rulerScaleTime: 1000 * 10,
		// 时间尺默认时长（毫秒）
		rulerDefultTime: 1000 * 60 * 20,
		// 时间线滚动区域左侧内边距 (px)
		trackTimelineScrollbarPaddingLeft: 5,
		// 元素虚拟位置于元素启动吸附
		unitAdsorption: true,
		// 吸附判定范围(px)
		unitAdsorptionDecisionRange: 10,
		// 时间引导线位置
		seekerLocation: 0,
		// 时间引导线时间(毫秒ms)
		seekerTime: 0,
	}),
	getters: {
		// 每秒宽度（px）
		secondWidth: (state) => state.rulerScaleWidth / (state.rulerScaleTime / 1000),
	},
	actions: {
		setSeeker(x) {
			if (x < 0) {
				this.seekerLocation = 0;
				this.seekerTime = 0
			} else {
				this.seekerLocation = x;
				this.seekerTime = parseInt(x / this.rulerScaleWidth * this.rulerScaleTime)
			}
		},
	}
})


export const useTrackRulerConfigStore = defineStore('track-ruler-config', {
	state: () => ({
		// 对缩放值进行节流，减少尺子长度和时间标识的渲染次数。避免拖动缩放进度条的卡顿现象。 默认渲染延迟50毫秒，如果你的配置还卡顿可增加延迟。
		scaleThrottledTime: 50
	}),
})