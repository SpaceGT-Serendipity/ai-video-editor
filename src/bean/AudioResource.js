import Resource from './Resource'
import {
	sound,
	Sound
} from '@pixi/sound';
sound.disableAutoPause = true
import WaveSurfer from 'wavesurfer.js'
import axios from '../axios/index.js'

export default class AudioResource extends Resource {
	type = 'audio'
	volume = 1
	_wavesurfer = null
	_audio = null
	_sound = null
	_instance = null

	constructor({
		name,
		url,
		duration
	}) {
		super(name)
		this.url = url;
		this.blobUrl = url;
		this.duration = duration;
		this._sound = Sound.from({
			url: this.url
		});
		this.loaded = true;
	}

	static async file(resource) {
		const audioResource = new AudioResource({
			name: resource.name,
			url: URL.createObjectURL(resource),
			duration: 0
		});
		await audioResource.init()
		return audioResource
	}

	static async url(url, name) {
		const blob = await axios.get(url, {
			responseType: 'blob'
		})
		const file = new File([blob], name, {
			type: blob.type
		})
		const audioResource = await AudioResource.file(file);
		audioResource.url = url;
		return audioResource;
	}

	init() {
		return new Promise((resolve, reject) => {
			this._audio = new Audio(this.blobUrl);
			this._audio.addEventListener('canplaythrough', () => {
				this.duration = parseInt(this._audio.duration * 1000)
				this.loaded = true
				resolve()
			});
		})
	}

	clone() {
		const audioResource = new AudioResource({
			name: this.name,
			url: this.url,
			duration: this.duration
		})
		return audioResource;
	}

	play(currentTime) {
		if (this._instance == null) {
			this._instance = this._sound.play({
				start: currentTime / 1000,
				volume: this.volume
			});
		}
	}

	pause() {
		this._sound.pause();
		this._instance = null;
	}

	get view() {
		return `<div id="${this.id}" style=" position: relative; padding-top:10px;">
			<span style="${Resource.NameStyle}">${this.name}</span>
		</div>`
	}

	viewRender() {
		this._wavesurfer = WaveSurfer.create({
			container: document.getElementById(this.id),
			url: this.url,
			interact: false,
			height: 40
		})
	}
}