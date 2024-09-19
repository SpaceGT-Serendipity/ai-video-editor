import Source from "./Source";
import {
	v4 as uuidv4
} from 'uuid'
import {
	sound,
	Sound
} from '@pixi/sound';
sound.disableAutoPause = true
import WaveSurfer from 'wavesurfer.js'

export default class AudioSource extends Source {
	/* 资源类型 */
	static TYPE = 'audio'

	constructor({
		id,
		name,
		size,
		duration,
		url,
		volume
	}) {
		super()
		this.id = id ? id : uuidv4();
		this.name = name ? name : 'unnamed';
		this.size = size ? size : 0;
		this.duration = duration;
		this.url = url;
		this.volume = volume ? volume : 1;
		/* 声音构建器 */
		this._sound = Sound.from({
			url: this.url
		});
		/* 资源实例 */
		this.instance = null;
	}

	init() {
		return new Promise((resolve, reject) => {
			this._audio = new Audio(this.url);
			this._audio.addEventListener('canplaythrough', () => {
				this._initialized = true
				resolve()
			});
		})
	}

	clone() {
		return new AudioSource({
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url
		})
	}

	play(currentTime) {
		if (this.instance == null) {
			this.instance = this._sound.play({
				start: currentTime / 1000,
				volume: this.volume
			});
		}
	}

	pause() {
		this._sound.pause();
		this.instance = null;
	}


	viewRender() {
		this._wavesurfer = WaveSurfer.create({
			container: document.getElementById(this.id),
			url: this.url,
			interact: false,
			height: 40
		})
	}

	get view() {
		return `<div id="${this.id}" style=" position: relative; padding-top:10px;">
			<span class="source-view-name">${this.name}</span>
		</div>`
	}

	get type() {
		return AudioSource.TYPE;
	}

	get stringify() {
		return JSON.stringify({
			type: this.type,
			id: this.id,
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			volume: this.volume
		})
	}

	static parse(str) {
		return new AudioSource(JSON.parse(str))
	}
}