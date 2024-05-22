import {
	defineStore
} from 'pinia'

export const useViewportStore = defineStore('viewport', {
	state: () => ({
		scale: 1,
		background: '#000000',
		playing: false, // 播放中
	})
})