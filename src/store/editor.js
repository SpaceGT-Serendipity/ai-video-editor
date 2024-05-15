import {
	defineStore
} from 'pinia'

export const useEditorDataStore = defineStore('editor-data', {
	state: () => ({
		debug: true,
		layers: [],
		trackSeeker: 0
	}),
	getters: {
		videoTotalDuration() {
			return 50
		},
		layersSimplify() {
			return this.layers.map(layer => {
				return layer;
			})
		}
	},
	actions: {
		setTrackSeeker(x) {
			if (x < 0)
				this.trackSeeker = 0;
			else
				this.trackSeeker = x;
		},
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
		getLayerByUnitId(unitId) {
			return this.layers.find(layer => layer.units.find(unit => unit.id == unitId))
		},
		delLayerById(layerId) {
			const index = this.layers.findIndex(layer => layer.id == layerId)
			this.layers.splice(index, 1)
		}
	}
})