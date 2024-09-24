import {
	defineStore
} from 'pinia'
import {
	list
} from '../../api/video.js'
import {
	filePath
} from '../../api/file.js'
import LessonSource from '../../bean/source/LessonSource.js'

export const useLessonDataStore = defineStore('lesson-data', {
	state: () => ({
		publicData: [],
		privateData: []
	}),
	actions: {
		async load(currentPage, pageSize) {
			this.publicData.length = 0
			this.privateData.length = 0
			const res = await list(currentPage, pageSize)
			res.forEach(item => {
				const lesson = new LessonSource({
					...item,
					url: filePath + item.url,
					cover: filePath + item.cover,
				})
				if (item.author == null) {
					this.publicData.push(lesson)
				} else {
					this.privateData.push(lesson)
				}
			})
		}
	},
})