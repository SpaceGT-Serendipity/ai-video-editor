import Source from "./Source";
import {
	v4 as uuidv4
} from 'uuid'

export default class TextSource extends Source {
	/* 资源类型 */
	static TYPE = 'text'

	constructor({
		id,
		name,
		duration
	}) {
		super()
		this.id = id ? id : uuidv4();
		this.name = name ? name : 'unnamed';
		this.duration = duration ? duration : 6000;
	}

	clone() {
		return new TextSource({
			name: this.name,
			duration: this.duration
		})
	}

	get view() {
		return `<span style="line-height: 40px;font-size:12px;padding-left:5px;">${this.name}</span>`
	}
	
	get type() {
		return TextSource.TYPE;
	}
	
	get stringify() {
		return JSON.stringify({
			type: this.type,
			id: this.id,
		})
	}
	
	static parse(str) {
		return new TextSource(JSON.parse(str))
	}
}