import {
	defineStore
} from 'pinia'
import {
	loadResource,
	save
} from '../../api/resource.js'
import {
	filePath
} from '../../api/file.js'
import AudioSource from '../../bean/source/AudioSource.js'

export const useVoiceDataStore = defineStore('voice-data', {
	state: () => ({
		data: [],
		privateData: []
	}),
	actions: {
		async load() {
			this.data.length = 0
			this.privateData.length = 0
			const res = await loadResource('voice')
			res.forEach(item => {
				const voice = new AudioSource({
					...item,
					url: filePath + item.url
				})
				if (item.creator == null) {
					this.data.push(voice)
				} else {
					this.privateData.push(voice)
				}
			})
			
		},
		async save({
			name,
			size,
			url,
			duration,
			creator
		}) {
			await save(null, name, 'voice', size, duration, url, null, creator)
			await this.load()
		}
	},
})