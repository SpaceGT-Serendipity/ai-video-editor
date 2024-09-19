import Source from "./Source";
import axios from '../../axios/index.js'
import {
	v4 as uuidv4
} from 'uuid'
import {
	upload
} from '../../api/file.js'

export default class ImageSource extends Source {
	/* 资源类型 */
	static TYPE = 'image'

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
		this.duration = duration ? duration : 6000;
		this.url = url;
		this.cover = cover;
	}

	clone() {
		return new ImageSource({
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover
		})
	}

	get view() {
		return `<div  class="source-view-image" style="background-image: url(${this.cover});">
			<span class="source-view-name">${this.name}</span>
		</div>`
	}

	get type() {
		return ImageSource.TYPE;
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
		return new ImageSource(JSON.parse(str))
	}

}