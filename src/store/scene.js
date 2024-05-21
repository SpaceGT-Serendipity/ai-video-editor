import {
	defineStore
} from 'pinia'

export const useSceneStore = defineStore('scene', {
	persist: true,
	state: () => ({
		canvasScale: 1,
		videoScale: '16:9',
		width: 1920,
		height: 1080,
		background: '#000000',
		playing: false, // 播放中
	})
})