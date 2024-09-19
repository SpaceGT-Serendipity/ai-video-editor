import Source from "./Source";
import {
	v4 as uuidv4
} from 'uuid'

export default class VideoSource extends Source {
	/* 资源类型 */
	static TYPE = 'video'

	constructor({
		id,
		name,
		size,
		duration,
		url,
		cover
	}) {
		super()
		this.id = id ? id : uuidv4();
		this.name = name ? name : 'unnamed';
		this.size = size ? size : 0;
		this.duration = duration;
		this.url = url;
		this.cover = cover;
		/* 资源实例 */
		this.instance = null;
	}
 
	clone() {
		return new VideoSource({
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover
		})
	}

	destroy() {
		if (this.instance) this.instance.remove()
	}

	init() {
		return new Promise((resolve, reject) => {
			if (this._initialized == false) {
				this.instance = document.createElement('video');
				this.instance.src = this.url;
				this.instance.load();
				this.instance.addEventListener('loadedmetadata', () => {
					this._initialized = true
					resolve()
				});
			} else {
				resolve()
			}
		})
	}
	
	// screenshot(width = 320, height = 240) {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			let canvas = document.createElement("canvas");
	// 			canvas.width = width;
	// 			canvas.height = height;
	// 			let scale = this._video.videoWidth / width;
	// 			let frameWidth = width;
	// 			let frameHeight = this._video.videoHeight / scale;
	// 			let framePositionLeft = (width - frameWidth) / 2;
	// 			let framePositionHeight = (height - frameHeight) / 2;
	// 			canvas.getContext("2d").drawImage(this._video, framePositionLeft,
	// 				framePositionHeight, frameWidth, frameHeight);
	// 			canvas.toBlob((blob) => resolve(blob))
	// 		}, 500)
	// 	})
	// }

	get view() {
		return `<div class="source-view-image" style="background-image: url(${this.cover});">
			<span class="source-view-name">${this.name}</span>
		</div>`
	}

	get type() {
		return VideoSource.TYPE;
	}

	get stringify() {
		return JSON.stringify({
			type: this.type,
			id: this.id,
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover
		})
	}

	static parse(str) {
		return new VideoSource(JSON.parse(str))
	}
}