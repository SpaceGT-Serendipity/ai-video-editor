import {
	v4 as uuidv4
} from 'uuid'
import LayerUnit from './LayerUnit.js'

export default class Layer {
	constructor() {
		this.id = uuidv4();
		/* 元素集合 */
		this.units = null
		/* 显示隐藏图层 */
		this.display = true
		/* 静音图层 */
		this.muted = false
		/* 实例元素 */
		this.instance = null
	}

	static list(...list) {
		const layer = new Layer()
		layer.units = list;
		return layer;
	}

	clone() {
		const newUnits = this.units.map(unit => unit.clone())
		return Layer.list(...newUnits)
	}

	show() {
		this.display = true
	}

	hide() {
		this.display = false
	}

	destroy() {
		this.units.forEach(unit => unit.destroy())
		if (this.instance) this.instance.remove()
	}

	remove(id) {
		const index = this.units.findIndex(unit => unit.id == id)
		this.units[index].destroy()
		this.units.splice(index, 1)
	}

	sort() {
		this.units.sort((a, b) => a.track.x - b.track.x)
		for (let j = 0; j < this.units.length - 1; j++) {
			const current = this.units[j];
			const next = this.units[j + 1];
			if (current.track.x + current.track.w > next.track.x)
				next.track.x = current.track.x + current.track.w
		}
	}

	get(index) {
		return this.units[index]
	}

	/* 获取图层元素类型 */
	get type() {
		const unit = this.units.find(item => true)
		return unit ? unit.type : null;
	}

	/* 图层是否是可见的 */
	get visible() {
		const unit = this.units.find(item => true)
		return unit ? unit.visible : null;
	}

	/* 图层是否是有声音的 */
	get audible() {
		const unit = this.units.find(item => true)
		return unit ? unit.audible : null;
	}

	get height() {
		const unit = this.units.find(item => true)
		return unit ? unit.track.h : null;
	}

	get length() {
		return this.units.length
	}

	get stringify() {
		return JSON.stringify({
			id: this.id,
			units: this.units.map(unit => unit.stringify),
			display: this.display,
			muted: this.muted
		})
	}

	static parse(str) {
		const data = JSON.parse(str);
		const layer = new Layer()
		layer.units = data.units.map(unit => LayerUnit.parse(unit))
		layer.display = data.display
		layer.muted = data.muted
		return layer;
	}

}