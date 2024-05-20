import {
	defineStore
} from 'pinia'

export const useSceneStore = defineStore('scene', {
	persist: true,
	state: () => ({
		width: 1920,
		height: 1080,
		background: '#000000',
		scale: 1,
		playing: false, // 播放中
	})
})