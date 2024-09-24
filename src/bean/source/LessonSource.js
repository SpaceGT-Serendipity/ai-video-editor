import Source from "./Source";
import {
	v4 as uuidv4
} from 'uuid'

export default class LessonSource extends Source {
	/* 资源类型 */
	static TYPE = 'lesson'

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
		return new LessonSource({
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
				this.instance = document.createElement('lesson');
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

	get view() {
		return `<div class="source-view-image" style="background-image: url(${this.cover});">
			<span class="source-view-name">${this.name}</span>
		</div>`
	}

	get type() {
		return LessonSource.TYPE;
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
		return new LessonSource(JSON.parse(str))
	}
}