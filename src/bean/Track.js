import {
	v4 as uuidv4
} from 'uuid'
import {
	useTrackStore
} from '../store/track.js'

export default class Track {
	/* 轨道配置 */
	trackStore = useTrackStore()
	/* 原始坐标 */
	_x = 0;
	/* 原始宽度 */
	_w = 0;
	/* 高度(固定) */
	h = 45;
	/* 拖拽中状态 */
	dragging = false;
	/* 组件实例 */
	instance = null;

	constructor({
		x,
		w
	}) {
		this.id = uuidv4()
		this._x = x
		this._w = w
	}

	clone() {
		return new Track({
			x: this._x,
			w: this._w
		})
	}

	get x() {
		return parseInt(this._x * this.trackStore.controllerScale);
	}

	set x(value) {
		if (value < 0) this._x = 0
		else this._x = value / this.trackStore.controllerScale
	}

	get w() {
		return parseInt(this._w * this.trackStore.controllerScale);
	}

	set w(value) {
		if (value < 0) this._w = 0
		else this._w = value / this.trackStore.controllerScale
	}

	get location() {
		return {
			left: this.x,
			right: this.x + this.w
		}
	}

	get simplify() {
		return {
			x: this.x,
			w: this.w
		}
	}
}