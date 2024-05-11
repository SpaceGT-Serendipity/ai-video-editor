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
	},
	actions: {
		setTrackSeeker(x) {
			if (x < 0)
				this.trackSeeker = 0;
			else
				this.trackSeeker = x;
		},
		getMouseDownUnit(event) {
			const mouseX = event.pageX;
			const mouseY = event.pageY;
			for (let i = 0; i < this.layers.length; i++) {
				const layer = this.layers[i]
				for (let j = 0; j < layer.length; j++) {
					const unit = layer[j]
					const el = unit.instance.setupState.unitRef.$el;
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
		}
	}
})