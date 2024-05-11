import {
	v4 as uuidv4
} from 'uuid'
import axios from '../axios/index.js'

export class Resource {

	_type = null;

	constructor(name) {
		this.id = uuidv4();
		this.name = name;
		this.duration = 6;
		this.size = 0;
		this.loaded = false
	}

	get view() {
		return '';
	}
	get type() {
		return this._type;
	}
}

export class TextResource extends Resource {

	_type = 'text';

	constructor(name) {
		super(name)
		this.loaded = true
	}

	get view() {
		return `<span style="line-height: 46px;">${this.name}</span>`
	}
}


export class ImageResource extends Resource {

	_type = 'image';

	constructor({
		name,
		url
	}) {
		super(name)
		this.url = url;
		this.cover = url;
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
	_type = 'video';
	_video = null;

	constructor({
		name,
		size,
		url,
		cover = null,
		duration = 0,
		loaded = false
	}) {
		super(name)
		this.size = size;
		this.url = url
		this.cover = cover
		this.duration = duration
		this.loaded = loaded
	}

	static file(resource) {
		return new VideoResource({
			name: resource.name,
			size: resource.size,
			url: URL.createObjectURL(resource)
		});
	}

	static async url(url, name) {
		const blob = await axios.get(url, {
			responseType: 'blob'
		})
		const file = new File([blob], name, {
			type: blob.type
		})
		return VideoResource.file(file);
	}

	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.cover});"></div>`
	}

	load() {
		this._video = document.createElement('video');
		this._video.src = this.url;
		this._video.load();
		this._video.addEventListener('loadedmetadata', async () => {
			this.duration = this._video.duration
			if (this.cover == null) {
				this._video.pause();
				this._video.currentTime = parseInt(this.duration / 3)
			} else {
				this.loaded = true
			}
		});
		this._video.addEventListener('timeupdate', async () => {
			if (this._video.currentTime > 0) {
				const coverBlob = await this.screenshot(160, 90);
				this.cover = URL.createObjectURL(coverBlob)
				this.loaded = true
			}
		});
		setTimeout(() => this.loaded = true, 2000)
		return this;
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
}

const ImageResourceStyle = `
	width: 100%;
    height: 100%;
    background-repeat: repeat-x;
    background-size: contain;
	background-position: left;
`