import {
	defineStore
} from 'pinia'

export const usePropertiesStore = defineStore('properties', {
	state: () => ({
		voiceText: ''
	}),
	persist: true,
})