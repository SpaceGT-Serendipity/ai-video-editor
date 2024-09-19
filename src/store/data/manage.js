import {
	defineStore
} from 'pinia'
import {
	loadManage,
	save,
	manageCount
} from '../../api/resource.js'
import {
	filePath
} from '../../api/file.js'
import ImageSource from '../../bean/source/ImageSource.js'
import VideoSource from '../../bean/source/VideoSource.js'
import AudioSource from '../../bean/source/AudioSource.js'

export const useManageDataStore = defineStore('manage-data', {
	state: () => ({
		publicData: [],
		publicLength: 0
	}),
	actions: {
		async load(type, currentPage, pageSize) {
			this.publicData.length = 0
			const res = await loadManage(type, currentPage, pageSize)
			const count = await manageCount(type)
			if (type === 'image') {
				res.forEach(item => {
					const image = new ImageSource({
						...item,
						url: filePath + item.url,
						cover: filePath + item.cover
					})
					this.publicData.push(image)
					this.publicLength = count
				})
			} else if (type === 'bgm') {
				res.forEach(item => {
					const audio = new AudioSource({
						...item,
						url: filePath + item.url
					})
					this.publicData.push(audio)
					this.publicLength = count
				})
			} else {
				res.forEach(item => {
					const video = new VideoSource({
						...item,
						url: filePath + item.url,
						cover: filePath + item.cover
					})
					this.publicData.push(video)
					this.publicLength = count
				})
			}
			
		},
		async save({
			type,
			name,
			size,
			url,
			cover,
			duration,
			creator
		}) {
			if (type === 'image') {
				await save(null, name, 'image', size, null, url, cover, null)
			} else if (type === 'bgm') {
				await save(null, name, 'bgm', size, duration, url, null, null)
			} else {
				await save(null, name, 'video', size, duration, url, cover, null)
			}
			await this.load(type, 1, 30)
		}
	},
})