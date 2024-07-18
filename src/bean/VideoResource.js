import Resource from './Resource'
import axios from '../axios/index.js'

export default class VideoResource extends Resource {
	type= 'video'
	_file = null;
	_video = null;

	constructor({
		name,
		url,
		cover,
		duration,
		size
	}) {
		super(name)
		this.url = url;
		this.blobUrl = url;
		this.cover = cover;
		this.duration = duration;
		this.size = size;
		this.loaded = true
	}

	static async file(resource) {
		const videoResource = new VideoResource({
			name: resource.name,
			url: URL.createObjectURL(resource),
			size: resource.size,
			duration: 0
		});
		videoResource.blobUrl = URL.createObjectURL(resource)
		videoResource._file = resource
		await videoResource.init()
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

	async clone() {
		const videoResource = new VideoResource({
			name: this.name,
			url: this.url,
			cover: this.cover,
			duration: this.duration,
			size: this.size
		})
		if (this._file != null) {
			videoResource._file = this._file
			videoResource.blobUrl = URL.createObjectURL(videoResource._file)
		} else {
			videoResource.blobUrl = `${this.url}?id=${videoResource.id}`
		}
		return videoResource;
	}

	destroy() {
		if (this._video) this._video.remove()
	}

	init() {
		return new Promise((resolve, reject) => {
			if (this.duration == 0) {
				this._video = document.createElement('video');
				this._video.src = this.blobUrl;
				this._video.load();
				this._video.addEventListener('loadedmetadata', async () => {
					this.duration = parseInt(this._video.duration * 1000)
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
			} else {
				resolve()
			}
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
		return `<div style="${Resource.ImageResourceStyle} background-image: url(${this.cover});">
			<span style="${Resource.NameStyle}">${this.name}</span>
		</div>`
	}

}
