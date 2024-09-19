import {
	v4 as uuidv4
} from 'uuid'
import Source from "./Source";

export default class MediaFile extends Source{
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
	}

	get stringify() {
		return JSON.stringify({
			id: this.id,
			name: this.name,
			size: this.size,
			duration: this.duration,
			url: this.url,
			cover: this.cover
		})
	}

	static parse(str) {
		return new MediaFile(JSON.parse(str))
	}
}