import {
	v4 as uuidv4
} from 'uuid'
import LayerUnit from './LayerUnit.js'

export default class Layer {
	/* 元素集合 */
	units = null
	/* 显示隐藏图层 */
	display = true
	/* 静音图层 */
	muted = false
	/* 实例元素 */
	instance = null

	constructor() {
		this.id = uuidv4();
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

	get length() {
		return this.units.length
	}

	get scenes() {
		return {
			id: this.id,
			units: this.units.map(item => item.scenes),
			display: this.display,
			muted: this.muted,
			length: this.length,
			remove: this.remove
		}
	}

	get tracks() {
		return {
			id: this.id,
			units: this.units.map(item => item.tracks),
			display: this.display,
			muted: this.muted,
			length: this.length,
			remove: this.remove
		}
	}

	/* 获取图册元素类型 */
	get type() {
		const unit = this.units.find(item => true)
		return unit.type
	}

	get serialize() {
		return {
			id: this.id,
			units: this.units.map(item => item.serialize),
			display: this.display,
			muted: this.muted
		}
	}

	static async deserialize(data) {
		const layer = new Layer()
		layer.units = []
		for (let i = 0; i < data.units.length; i++) {
			layer.units.push(await LayerUnit.deserialize(data.units[i]))
		}
		layer.display = data.display
		layer.muted = data.muted
		return layer;
	}
}