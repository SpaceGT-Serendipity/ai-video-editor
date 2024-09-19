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

export const useBgmDataStore = defineStore('bgm-data', {
	state: () => ({
		publicData: [],
		privateData: []
	}),
	actions: {
		async load(currentPage, pageSize) {
			this.publicData.length = 0
			this.privateData.length = 0
			const res = await loadResource('bgm', currentPage, pageSize)
			res.forEach(item => {
				const audio = new AudioSource({
					...item,
					url: filePath + item.url
				})
				if (item.creator == null) {
					this.publicData.push(audio)
				} else {
					this.privateData.push(audio)
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
			await save(null, name, 'bgm', size, duration, url, null, creator)
			await this.load()
		}
	},
})