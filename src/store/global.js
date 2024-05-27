import {
	defineStore
} from 'pinia'

export const useGlobalStore = defineStore('global', {
	state: () => ({
		debug: true, // 测试模式
		scale: '16:9',
		width: 1920,
		height: 1080,
		title: '未命名项目' // 项目标题
	}),
})