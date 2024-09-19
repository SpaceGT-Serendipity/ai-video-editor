import {
	v4 as uuidv4
} from 'uuid'
import {
	useTrackStore
} from '../store/track.js'
import Scene from './Scene.js'
import Track from './Track.js'
import * as SourceUtils from './utils/SourceUtils.js'

export default class LayerUnit {
	constructor({
		id,
		resource,
		scene,
		track
	}) {
		this.id = id ? id : uuidv4();
		/* 轨道配置 */
		this.trackStore = useTrackStore()
		/* 资源信息 */
		this.resource = resource;
		this._durationStart = 0
		this._durationEnd = resource ? resource.duration : 0
		/* 场景信息 */
		this.scene = scene || new Scene()
		/* 轨道信息 */
		this.track = track || new Track({
			x: 0,
			// 原始宽度不进行缩放计算
			w: (resource ? resource.duration : 0) / this.trackStore.rulerScaleTime * this.trackStore.rulerScaleWidth,
		})
		/* 显示 */
		this.display = true
		/* 静音 */
		this.muted = false

		// /* 开始时间,并不是真实时间,仅为显示的开始时间(ms) */
		// _durationStart = 0
		// /* 结束时间,并不是真实时间,仅为显示的结束时间(ms) */
		// _durationEnd = 0
	}

	destroy() {
		this.resource.destroy()
		this.track.destroy()
		this.scene.destroy()
	}

	clone() {
		const unit = new LayerUnit({
			resource: this.resource.clone(),
			// scene: this.scene.clone()
		})
		return unit;
	}

	// split(ratio) {
	// 	const start = this._durationStart
	// 	const end = this._durationEnd
	// 	const splitLine = parseInt((end - start) * ratio);
	// 	this._durationEnd = start + splitLine;
	// 	this.track.w = (this._durationEnd - this._durationStart) * this.trackStore.milliscondWidth;
	// 	const unit = this.clone();
	// 	unit._durationStart = start + splitLine;
	// 	unit._durationEnd = end;
	// 	unit.track.x = this.track.x + this.track.w
	// 	unit.track.w = (unit._durationEnd - unit._durationStart) * this.trackStore.milliscondWidth;
	// 	return unit;
	// }

	get view() {
		if (this.resource) {
			return this.resource.view
		} else
			return '<没有绑定资源>'
	}

	get duration() {
		return {
			start: 0,
			end: parseInt(this.track.w / this.trackStore.milliscondWidth),
			duration: parseInt(this.track.w / this.trackStore.milliscondWidth),
			left: parseInt(this.track.x / this.trackStore.milliscondWidth),
			right: parseInt((this.track.x + this.track.w) / this.trackStore.milliscondWidth)
		}
	}

	get trackMaxWidth() {
		if (this.resource.type == 'video')
			return parseInt((this._durationEnd - this._durationStart) * this.trackStore.milliscondWidth)
		else
			return 0
	}

	/* 获取资源类型 */
	get type() {
		return this.resource.type
	}

	get resizable() {
		return ['image', 'video', 'text'].includes(this.resource.type);
	}

	/* 元素是否是可见的 */
	get visible() {
		return ['image', 'video', 'figure', 'text'].includes(this.type)
	}

	/* 元素是否是有声音的 */
	get audible() {
		return ['figure', 'audio'].includes(this.type)
	}

	get stringify() {
		return JSON.stringify({
			id: this.id,
			resource: this.resource.stringify,
			scene: this.scene.stringify,
			track: this.track.stringify,
			display: this.display,
			muted: this.muted
		})
	}

	static parse(str) {
		const data = JSON.parse(str);
		const unit = new LayerUnit({
			id: data.id,
			resource: SourceUtils.autoParse(data.resource),
			scene: Scene.parse(data.scene),
			track: Track.parse(data.track)
		})
		unit.display = data.display
		unit.muted = data.muted
		return unit;
	}

}