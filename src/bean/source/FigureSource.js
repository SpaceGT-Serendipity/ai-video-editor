import Source from "./Source";
import {
	v4 as uuidv4
} from 'uuid'
import {
	sound,
	Sound
} from '@pixi/sound';
sound.disableAutoPause = true
import MediaFile from './MediaFile.js'

export default class FigureSource extends Source {
	/* 资源类型 */
	static TYPE = 'figure'
	figureType = null

	constructor({
		id,
		name,
		size,
		duration,
		url,
		cover,
		tag,
		creator
	}) {
		super()
		this.id = id ? id : uuidv4();
		this.name = name ? name : 'unnamed';
		this.size = size ? size : 0;
		this.duration = duration ? duration : 6000;
		this.url = url;
		this.cover = cover;
		this.tag = tag;
		/* 音频 MediaFile */
		this.audio = null;
		this.creator = creator
	}

	clone() {
		return new FigureSource({
			type: this.type,
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover,
			tag: this.tag
		})
	}

	play(currentTime) {
		if (this.instance == null && this.audio) {
			this._sound = Sound.from({
				url: this.audio.url
			});
			this.instance = this._sound.play({
				start: currentTime / 1000
			});
		}
	}

	pause() {
		if (this._sound) this._sound.pause();
		this.instance = null;
	}


	get view() {
		return `<div class="source-view-image" style="background-image: url(${this.cover});">
			<span class="source-view-name">${this.name}</span>
		</div>`;
	}

	get type() {
		return FigureSource.TYPE;
	}

	get stringify() {
		return JSON.stringify({
			type: this.type,
			id: this.id,
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover,
			tag: this.tag,
			audio: this.audio ? this.audio.stringify : null
		})
	}

	static parse(str) {
		const data = JSON.parse(str);
		const source = new FigureSource(data)
		if (data.audio) {
			source.audio = MediaFile.parse(data.audio)
		}
		return source;
	}
}