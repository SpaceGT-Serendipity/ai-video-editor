import {
	defineStore
} from 'pinia'

export const useGlobalStore = defineStore('global', {
	state: () => ({
		debug: true, // 测试模式
	}),
	persist: true
})