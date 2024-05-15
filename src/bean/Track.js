import {
	v4 as uuidv4
} from 'uuid'


export default class Track {
	/* 缩放 */
	scale = 1;
	/* 坐标 */
	_x = 0;
	/* 宽度 */
	_w = 0;
	/* 高度(固定) */
	h = 45;
	/* 拖拽中状态 */
	dragging = false;
	/* 组件实例 */
	instance = null;

	constructor({
		x,
		w,
		scale = 1
	}) {
		this.id = uuidv4()
		this._x = x
		this._w = w
		this.scale = scale
	}

	clone() {
		return new Track({
			x: this.x,
			w: this.w,
			scale: this.scale
		})
	}

	get x() {
		return parseInt(this._x * this.scale);
	}

	set x(value) {
		if (value < 0) this._x = 0
		this._x = value / this.scale;
	}

	get w() {
		return parseInt(this._w * this.scale);
	}

	set w(value) {
		this._w = value / this.scale;
	}


	get simplify() {
		return {
			scale: this.scale,
			x: this.x,
			w: this.w,
			h: this.h,
			dragging: this.dragging
		}
	}
}