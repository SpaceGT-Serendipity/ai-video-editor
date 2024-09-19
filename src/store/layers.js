import {
	defineStore
} from 'pinia'
import {
	useTrackStore
} from './track.js'
import Layer from '../bean/Layer.js'

export const useLayersDataStore = defineStore('layers-data', {
	state: () => ({
		layers: [], // 轨道时间线层级
		/* 主视频层 */
		mainVideoLayerId: null,
		/* 主音频层 */
		mainAudioLayerId: null
	}),
	getters: {
		videoTotalDuration() {
			const trackStore = useTrackStore()
			const atUnits = this.layers.filter(layer => layer.length > 0).map(layer => layer.units.at(-1))
			const furthestUnit = atUnits.reduce((previous, current) => {
				if (previous == null) return current;
				if (previous.track.x + previous.track.w > current.track.x + current.track.w)
					return previous;
				else
					return current;
			}, null)
			if (furthestUnit) {
				const totalWidth = furthestUnit.track.x + furthestUnit.track.w
				return parseInt(totalWidth / trackStore.milliscondWidth)
			}
			return 0;
		},
		layersScenes() {
			return this.layers.map(layer => layer.units.map(item => item.scene.stringify))
		},
		layersTracks() {
			return this.layers.map(layer => layer.units.map(item => item.track.stringify))
		},
		// 选中激活的元素
		activeUnit() {
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i]
				for (let j = 0; j < layer.length; j++) {
					const unit = layer.units[j]
					if (unit.track.active) return unit;
				}
			}
			return null;
		},
		mainVideoLayer() {
			return this.layers.find(item => item.id == this.mainVideoLayerId)
		},
		mainAudioLayer() {
			return this.layers.find(item => item.id == this.mainAudioLayerId)
		},
		stringify() {
			return JSON.stringify(this.layers.map(item => item.stringify))
		},
		adsorptionLine() {
			const lines = []
			this.layers.forEach(layer => {
				layer.units.forEach(unit => {
					lines.push({
						layerId: layer.id,
						unitId: unit.id,
						line: parseInt(unit.track.x)
					})
					lines.push({
						layerId: layer.id,
						unitId: unit.id,
						line: parseInt(unit.track.x + unit.track.w)
					})
				})
			})
			return lines
		}
	},
	actions: {
		/* 获取鼠标下的元素 */
		getUnitUnderMouse(event) {
			const mouseX = event.pageX;
			const mouseY = event.pageY;
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i]
				for (let j = 0; j < layer.length; j++) {
					const unit = layer.units[j]
					const rect = unit.track.instance.getBoundingClientRect();
					if (mouseX >= rect.left &&
						mouseX <= rect.right &&
						mouseY >= rect.top &&
						mouseY <= rect.bottom) {
						return unit;
					}
				}
			}
			return null;
		},
		/* 获取鼠标下的时间线图层 */
		getLayerUnderMouse(event) {
			const mouseX = event.pageX;
			const mouseY = event.pageY;
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i]
				const rect = layer.instance.getBoundingClientRect();
				if (mouseX >= rect.left &&
					mouseX <= rect.right &&
					mouseY >= rect.top &&
					mouseY <= rect.bottom) {
					return layer;
				}
			}
			return null;
		},
		/* 获取元素的图层，基于id检索 */
		getLayerByUnitId(unitId) {
			return this.layers.find(layer => layer.units.find(unit => unit.id == unitId))
		},
		/* 删除某一时间线图层 */
		delLayerById(...layerIds) {
			layerIds.forEach(layerId => {
				const index = this.layers.findIndex(layer => layer.id == layerId)
				this.layers[index].destroy()
				this.layers.splice(index, 1)
			})
		},
		setUnitActive(unitId) {
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i]
				for (let j = 0; j < layer.length; j++) {
					const unit = layer.units[j]
					unit.track.active = unit.id == unitId
				}
			}
		},
		setUnitFigureResourceAudio(unit, mediaFile) {
			const trackStore = useTrackStore()
			unit.resource.audio = mediaFile
			unit.resource.duration = mediaFile.duration
			unit.track.w = mediaFile.duration / trackStore.rulerScaleTime * trackStore.rulerScaleWidth
		},
		/* 清除空图层 */
		clearEmptyLayer() {
			for (let i = this.layers.length - 1; i >= 0; i--) {
				if (this.layers[i].length == 0)
					this.layers.splice(i, 1)
			}
		},
		/* 清除所有图层 */
		clearAllLayer() {
			this.layers.forEach(layer => layer.destroy())
			this.layers.splice(0, this.layers.length)
		},
		async loadSerializationConfiguration(data) {
			this.delLayerById(...this.layers.map(layer => layer.id))
			for (let i = 0; i < data.length; i++)
				this.layers.push(await Layer.deserialize(data[i]))
		},
		/*加入新的元素*/
		addUnits(units) {
			this.addLayer(Layer.list(...units))
		},
		/*添加图层*/
		addLayer(layer) {
			this.layers.push(layer)
			this.voteMainLayer()
		},
		/*插入图层*/
		insertLayer(index, layer) {
			this.layers.splice(index, 0, layer);
			this.clearEmptyLayer()
			this.voteMainLayer()
		},
		/*图层追加元素*/
		appendUnit(index, unit) {
			this.layers[index].units.push(unit)
			this.clearEmptyLayer()
			this.voteMainLayer()
		},
		/*选举主图层*/
		voteMainLayer() {
			for (let layer of this.layers) {
				if (layer.type == 'video' || layer.type == 'image') {
					this.mainVideoLayerId = layer.id
				}
				if (layer.type == 'audio') {
					this.mainAudioLayerId = layer.id
				}
			}
		},
		/*图层排序*/
		sortLayers() {
			let figureIndex = 0
			const figureLayers = []
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i];
				// 图层排序
				layer.sort()
				// 将数字人图层防止顶层
				if (layer.type == 'figure') {
					this.layers.splice(i, 1)
					figureLayers.push(layer)
				}
			}
			this.layers.unshift(...figureLayers)
		}
	}
})

export const useAdsorptionLineStore = defineStore('adsorption-line', {
	state: () => ({
		// 元素虚拟位置于元素启动吸附
		enable: true,
		// 吸附判定范围(px)
		decisionRange: 10,
		// 显示吸附提示线
		visible: false,
		// 吸附提示线位置
		x: 0
	}),
})