import {
	defineStore
} from 'pinia'
import {
	useTrackStore
} from './track.js'

export const useLayersDataStore = defineStore('layers-data', {
	state: () => ({
		layers: [], // 轨道时间线层级
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
			return this.layers.map(layer => layer.scenes)
		},
		layersTracks() {
			return this.layers.map(layer => layer.tracks)
		},
		layersSerialize() {
			return this.layers.map(layer => layer.serialize)
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
		/* 清除空图层 */
		clearEmptyLayer() {
			for (let i = this.layers.length - 1; i >= 0; i--) {
				if (this.layers[i].length == 0)
					this.layers.splice(i, 1)
			}
		}
	}
})