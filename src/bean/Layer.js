import {
	v4 as uuidv4
} from 'uuid'

export class Layer {

	_units = null
	display = true
	instance = null

	constructor() {
		this.id = uuidv4()
		this.display = true
	}

	static list(...list) {
		const layer = new Layer()
		layer.units = list;
		return layer;
	}

	show() {
		this.display = true
	}

	hide() {
		this.display = false
	}

	remove(index) {
		this._units.splice(index, 1)
	}

	sort() {
		this._units.sort((a, b) => a.x - b.x)
		for (let j = 0; j < this._units.length - 1; j++) {
			const current = this._units[j];
			const next = this._units[j + 1];
			if (current.x + current.w > next.x) next.x = current.x + current.w
		}
	}

	get units() {
		return this._units;
	}

	set units(list) {
		this._units = list
	}

	get length() {
		return this._units.length
	}
}