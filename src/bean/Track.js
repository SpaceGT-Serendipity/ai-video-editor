import {
	v4 as uuidv4
} from 'uuid'
import {
	useTrackStore
} from '../store/track.js'

export default class Track {
	constructor({
		id,
		x,
		w,
		h
	}) {
		this.id = id ? id : uuidv4()
		/* 轨道配置 */
		this.trackStore = useTrackStore()
		/* 原始坐标 */
		this._x = x
		/* 原始宽度 */
		this._w = w
		/* 高度,可调整 */
		this.h = h ? h : 50;
		/* 拖拽中状态 */
		this.dragging = false;
		/* 组件实例 */
		this.instance = null;
		/* 组件激活状态 */
		this.active = false;
	}

	destroy() {
		if (this.instance) this.instance.remove()
	}

	/* 主动触发鼠标事件 */
	onMousedown(event) {
		const rect = this.instance.getBoundingClientRect()
		var mouseEvent = new MouseEvent('mousedown', {
			'view': window,
			'bubbles': true,
			'cancelable': false,
			'clientX': rect.x + (rect.width / 2),
			'clientY': rect.y + (rect.height / 2)
		});
		this.instance.dispatchEvent(mouseEvent)
	}

	get x() {
		return parseInt(this._x * this.trackStore.controllerScale);
	}

	set x(value) {
		if (value < 0) this._x = 0
		else this._x = parseInt(value / this.trackStore.controllerScale)
	}

	get w() {
		return parseInt(this._w * this.trackStore.controllerScale);
	}

	set w(value) {
		if (value < 0) this._w = 0
		else this._w = parseInt(value / this.trackStore.controllerScale)
	}

	get location() {
		return {
			left: this.x,
			right: this.x + this.w
		}
	}

	get stringify() {
		return JSON.stringify({
			id: this.id,
			x: this._x,
			w: this._w,
			h: this.h
		})
	}

	static parse(str) {
		try {
			return new Track(JSON.parse(str))
		} catch (e) {
			return null;
		}
	}

}