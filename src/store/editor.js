import {
	defineStore
} from 'pinia'

export const useEditorDataStore = defineStore('editor-data', {
	state: () => ({
		debug: true, // 测试模式
		layers: [], // 轨道时间线层级
		activeUnit: null // 选中激活的元素
	}),
	getters: {
		videoTotalDuration() {
			return 50
		},
		layersSimplify() {
			return this.layers.map(layer => layer.simplify)
		},
		layersScenes() {
			return this.layers.map(layer => layer.scenes)
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
					const el = unit.track.instance.setupState.unitRef.$el;
					const rect = el.getBoundingClientRect();
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
				const el = layer.instance.setupState.containerRef;
				const rect = el.getBoundingClientRect();
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
		delLayerById(layerId) {
			const index = this.layers.findIndex(layer => layer.id == layerId)
			this.layers[index].destroy()
			this.layers.splice(index, 1)
		}
	}
})