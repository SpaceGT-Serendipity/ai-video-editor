import {
	defineStore
} from 'pinia'

export const useResourceDragStore = defineStore('resource-drag', {
	state: () => ({
		data: null
	})
})