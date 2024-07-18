import {
	defineStore
} from 'pinia'

export const useGlobalStore = defineStore('global', {
	state: () => ({
		debug: false, // 测试模式
		scale: '16:9',
		width: 1920,
		height: 1080,
		title: '未命名项目', // 项目标题
		serialize: null, // layers 序列化存档
		menu: 'image' //菜单打开的选项
	}),
	persist: true
})

export const useStateStore = defineStore('state', {
	state: () => ({
		message: []
	}),
	getters: {
		alert() {
			if (this.message.length > 0)
				return this.message.at(-1).message.at(-1)
			else
				return null;
		}
	},
	actions: {
		push(id, message) {
			const index = this.message.findIndex(item => item.id == id)
			if (index > -1) {
				this.message[index].message.push(message)
			} else {
				this.message.push({
					id,
					message: [message]
				})
			}
		},
		destroy(id) {
			const index = this.message.findIndex(item => item.id == id)
			this.message.splice(index, 1)
		}
	}
})