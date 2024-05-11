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
		getVideoTotalDuration() {
			return 50
		}
	},
	actions: {
		setTrackSeeker(x) {
			if (x < 0)
				this.trackSeeker = 0;
			else
				this.trackSeeker = x;
		}
	}
})