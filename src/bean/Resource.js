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
	/* 网络地址 */
	url = null
	/* 本地地址 */
	blobUrl = null;
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

	get serialize() {
		return {
			id: this.id,
			name: this.name,
			type: this.type,
			duration: this.duration,
			size: this.size,
			url: this.url,
			blobUrl: this.blobUrl,
			cover: this.cover,
		}
	}
}

/* 异步反序列加载远程文件 */
async function ResourceDeserialize(data) {
	let resource = null
	if (data.type == 'video') {
		resource = await VideoResource.url(data.url, data.name)
		await resource.init()
	} else
	if (data.type == 'image') {
		resource = new ImageResource({
			name: data.name,
			url: data.url
		});
	}
	resource.duration = data.duration;
	resource.size = data.size;
	resource.loaded = true
	return resource;
}

export class FigureResource extends Resource {
	tag = null;

	constructor({
		name,
		tag,
		url,
		cover
	}) {
		super({
			name,
			type: 'figure'
		})
		this.url = url;
		this.blobUrl = url;
		this.cover = cover;
		this.tag = tag;
		this.duration = 6000;
		this.loaded = true;
	}
	
	clone() {
		return this;
	}

	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.cover});"></div>`
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
		this.blobUrl = url;
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
		return `<div style="${ImageResourceStyle} background-image: url(${this.cover});"></div>`
	}

}

export class VideoResource extends Resource {
	_file = null;
	_video = null;

	constructor({
		name
	}) {
		super({
			name,
			type: 'video'
		})
	}

	static file(resource) {
		const videoResource = new VideoResource({
			name: resource.name,
		});
		videoResource.size = resource.size
		videoResource.blobUrl = URL.createObjectURL(resource)
		videoResource.url = URL.createObjectURL(resource)
		videoResource._file = resource
		return videoResource
	}

	static async url(url, name) {
		const blob = await axios.get(url, {
			responseType: 'blob'
		})
		const file = new File([blob], name, {
			type: blob.type
		})
		const videoResource = VideoResource.file(file)
		videoResource.url = url
		return videoResource;
	}

	clone() {
		const videoResource = VideoResource.file(this._file);
		videoResource.url = this.url
		videoResource.cover = this.cover
		videoResource.duration = this.duration
		return videoResource;
	}

	destroy() {
		if (this._video) this._video.remove()
	}

	init() {
		return new Promise((resolve, reject) => {
			this._video = document.createElement('video');
			this._video.src = this.blobUrl;
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

export {
	ResourceDeserialize
}