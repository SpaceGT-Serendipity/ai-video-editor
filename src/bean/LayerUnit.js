import {
	v4 as uuidv4
} from 'uuid'

export class LayerUnit {
	/* 缩放 */
	scale = 1;
	/* 坐标 */
	_x = 0;
	/* 宽度 */
	_w = 0;
	/* 高度(固定) */
	h = 50;
	/* 拖拽中状态 */
	dragging = false;
	/* 组件实例 */
	instance = null;

	constructor(resource, x, w) {
		this.id = uuidv4();
		this._x = x;
		this._w = w;
		this.resource = resource;
	}

	clone() {
		return new LayerUnit(this.resource, this._x, this._w)
	}

	get view() {
		if (this.resource) {
			return this.resource.view
		} else
			return '<没有绑定资源>'
	}

	get x() {
		return this._x * this.scale;
	}

	set x(value) {
		this._x = value;
	}

	get w() {
		return this._w * this.scale;
	}

	set w(value) {
		this._w = value;
	}
}