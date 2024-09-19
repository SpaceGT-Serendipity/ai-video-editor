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
		videoeData() {
			return this.data.filter(item => item.tag == 'video')
		},
		dynamicData() {
			return this.data.filter(item => item.tag == 'dynamic')
		},
		myData() {
			return this.data.filter(item => item.creator)
		},
		picturePrivateData() {
			return this.privateData.filter(item => item.tag == 'picture')
		},
		videoePrivateData() {
			return this.privateData.filter(item => item.tag == 'video')
		},
		dynamicPrivateData() {
			return this.privateData.filter(item => item.tag == 'dynamic')
		},
		myPrivateData() {
			return this.privateData.filter(item => item.creator)
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
				if (item.creator == null) {
					this.data.push(figure)
				} else {
					this.privateData.push(figure)
				}
			})
		}
	},
})