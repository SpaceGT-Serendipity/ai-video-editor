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
import ImageSource from '../../bean/source/ImageSource.js'

export const useImageDataStore = defineStore('image-data', {
	state: () => ({
		publicData: [],
		privateData: []
	}),
	actions: {
		async load(currentPage, pageSize) {
			this.publicData.length = 0
			this.privateData.length = 0
			const res = await loadResource('image', currentPage, pageSize)
			res.forEach(item => {
				const image = new ImageSource({
					...item,
					url: filePath + item.url,
					cover: filePath + item.cover
				})
				if (item.creator == null) {
					this.publicData.push(image)
				} else {
					this.privateData.push(image)
				}
			})
		},
		async save({
			name,
			size,
			url,
			cover,
			creator
		}) {
			await save(null, name, 'image', size, null, url, cover, creator)
		}
	},
})