import {
	v4 as uuidv4
} from 'uuid'
import axios from '../axios/index.js'

export class Resource {
	/* 文件名 */
	name = null
	/* 文件类型 */
	type = null;
	/* 原始时长(ms) */
	duration = 0
	/* 资源大小 */
	size = 0
	/* 资源加载完成 */
	loaded = false
	/* 文件地址 */
	url = null
	/* 封面 */
	cover = null

	constructor({
		name,
		type
	}) {
		this.id = uuidv4();
		this.name = name;
		this.type = type
	}

	clone() {
		return this;
	}

	destroy() {}

	get view() {
		return '';
	}

}

export class TextResource extends Resource {
	constructor(name) {
		super({
			name,
			type: 'text'
		})
		this.duration = 6000
		this.loaded = true
	}

	get view() {
		return `<span style="line-height: 46px;">${this.name}</span>`
	}
}

export class ImageResource extends Resource {
	constructor({
		name,
		url
	}) {
		super({
			name,
			type: 'image'
		})
		this.url = url;
		this.cover = url;
		this.duration = 6000
		this.loaded = true
	}

	static file(resource) {
		return new ImageResource({
			name: resource.name,
			url: URL.createObjectURL(resource)
		});
	}

	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.url});"></div>`
	}
}

export class VideoResource extends Resource {
	_file = null;
	_video = null;

	constructor(resource) {
		super({
			name: resource.name,
			type: 'video'
		})
		this.size = resource.size;
		this.url = URL.createObjectURL(resource)
		this._file = resource
	}

	static async url(url, name) {
		const blob = await axios.get(url, {
			responseType: 'blob'
		})
		const file = new File([blob], name, {
			type: blob.type
		})
		return new VideoResource(file);
	}

	clone() {
		const newVideoResource = new VideoResource(this._file);
		newVideoResource.cover = this.cover
		newVideoResource.duration = this.duration
		return newVideoResource;
	}

	destroy() {
		if (this._video) this._video.remove()
	}

	init() {
		return new Promise((resolve, reject) => {
			this._video = document.createElement('video');
			this._video.src = this.url;
			this._video.load();
			this._video.addEventListener('loadedmetadata', async () => {
				this.duration = this._video.duration * 1000
				if (this.cover == null) {
					this._video.pause();
					this._video.currentTime = parseInt(this._video.duration / 3)
				} else {
					this.loaded = true
					resolve()
				}
			});
			this._video.addEventListener('timeupdate', async () => {
				if (this._video.currentTime > 0) {
					const coverBlob = await this.screenshot(160, 90);
					this.cover = URL.createObjectURL(coverBlob)
					this.loaded = true
					resolve()
				}
			});
		})
	}

	screenshot(width = 320, height = 240) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				let scale = this._video.videoWidth / width;
				let frameWidth = width;
				let frameHeight = this._video.videoHeight / scale;
				let framePositionLeft = (width - frameWidth) / 2;
				let framePositionHeight = (height - frameHeight) / 2;
				canvas.getContext("2d").drawImage(this._video, framePositionLeft,
					framePositionHeight, frameWidth, frameHeight);
				canvas.toBlob((blob) => resolve(blob))
			}, 500)
		})
	}


	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.cover});"></div>`
	}
}

const ImageResourceStyle = `
	width: 100%;
    height: 100%;
    background-repeat: repeat-x;
    background-size: contain;
	background-position: left;
`