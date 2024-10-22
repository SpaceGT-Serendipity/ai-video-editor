import {
	defineStore
} from 'pinia'
import {
	loadFigure,
	save
} from '../../api/resource.js'
import {
	filePath
} from '../../api/file.js'
import FigureSource from '../../bean/source/FigureSource.js'

export const useFigureDataStore = defineStore('figure-data', {
	state: () => ({
		data: [],
		privateData: []
	}),
	getters: {
		pictureData() {
			return this.data.filter(item => item.tag == 'picture')
		},
		videoData() {
			return this.data.filter(item => item.tag == 'video')
		},
		dynamicData() {
			return this.data.filter(item => item.tag == 'dynamic')
		},
		picturePrivateData() {
			return this.privateData.filter(item => item.tag == 'picture')
		},
		videoPrivateData() {
			return this.privateData.filter(item => item.tag == 'video')
		},
		dynamicPrivateData() {
			return this.privateData.filter(item => item.tag == 'dynamic')
		}
	},
	actions: {
		async load() {
			this.data.length = 0
			this.privateData.length = 0
			const res = await loadFigure()
			res.forEach(item => {
				const figure = new FigureSource({
					...item,
					url: filePath + item.url,
					cover: filePath + item.cover,
					creator: item.creator
				})
				if (item.tag == 'video') {
					figure.figureType = 'video'
				} else {
					figure.figureType = 'image'
				}
				this.data.push(figure)
				if (item.creator != null) {
					this.privateData.push(figure)
				}
			})
		}
	},
})