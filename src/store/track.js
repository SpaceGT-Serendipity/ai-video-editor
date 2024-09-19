import {
	defineStore
} from 'pinia'
import {
	useLayersDataStore
} from './layers.js'
import {
	useViewportStore
} from './viewport.js'

export const useTrackStore = defineStore('track', {
	state: () => ({
		// 控制区域宽度
		controllerGroupWidth: 150,
		// 控制区域缩放组件
		controllerScale: 1,
		// 时间尺高度
		rulerHeight: 30,
		// 时间尺每个范围宽度（px）
		rulerScaleWidth: 150,
		// 时间尺每个范围时长（毫秒）
		rulerScaleTime: 1000 * 10,
		// 时间尺默认时长（毫秒）
		rulerDefultTime: 1000 * 60 * 20,
		// 时间线滚动区域左侧内边距 (px)
		trackTimelineScrollbarPaddingLeft: 5,
		// 时间引导线位置
		seekerLocation: 0,
		// 时间引导线时间(毫秒ms)
		seekerTime: 0,
	}),
	getters: {
		// 每秒宽度（px）
		secondWidth: (state) => state.rulerScaleWidth / state.rulerScaleTime / 1000 * state.controllerScale,
		// 每毫秒宽度（px）
		milliscondWidth: (state) => state.rulerScaleWidth / state.rulerScaleTime * state.controllerScale,
	},
	actions: {
		setSeeker(x) {
			if (x < 0) {
				this.seekerLocation = 0;
				this.seekerTime = 0
				return;
			}
			const layersDataStore = useLayersDataStore()
			if (x / this.milliscondWidth > layersDataStore.videoTotalDuration) {
				this.seekerLocation = parseInt(layersDataStore.videoTotalDuration * this.milliscondWidth);
				this.seekerTime = parseInt(layersDataStore.videoTotalDuration)
				return;
			}
			this.seekerLocation = x;
			this.seekerTime = parseInt(x / this.milliscondWidth)
			const viewportStore = useViewportStore()
			viewportStore.playing = false
		},
	}
})


export const useTrackRulerConfigStore = defineStore('track-ruler-config', {
	state: () => ({
		// 对缩放值进行节流，减少尺子长度和时间标识的渲染次数。避免拖动缩放进度条的卡顿现象。 默认渲染延迟50毫秒，如果你的配置还卡顿可增加延迟。
		scaleThrottledTime: 50
	}),
})
