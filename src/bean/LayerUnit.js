import {
	v4 as uuidv4
} from 'uuid'
import {
	useTrackStore
} from '../store/track.js'
import Scene from './Scene.js'
import Track from './Track.js'
import {
	ResourceDeserialize
} from './Resource.js'

export default class LayerUnit {
	/* 轨道配置 */
	trackStore = useTrackStore()
	/* 资源信息 */
	resource = null
	/* 轨道信息 */
	track = null
	/* 场景信息 */
	scene = null
	/* 开始时间,并不是真实时间,仅为显示的开始时间(ms) */
	_durationStart = 0
	/* 结束时间,并不是真实时间,仅为显示的结束时间(ms) */
	_durationEnd = 0
	/* 显示隐藏元素 */
	display = true
	/* 静音元素 */
	muted = false

	constructor({
		resource,
		scene,
		track
	}) {
		this.id = uuidv4();
		this.resource = resource;
		this._durationStart = 0
		this._durationEnd = resource.duration
		this.scene = scene || new Scene()
		this.track = track || new Track({
			x: 0,
			// 原始宽度不进行缩放计算
			w: resource.duration / this.trackStore.rulerScaleTime * this.trackStore.rulerScaleWidth,
		})
	}

	destroy() {
		this.resource.destroy()
		this.track.destroy()
		this.scene.destroy()
	}

	clone() {
		const unit = new LayerUnit({
			resource: this.resource.clone(),
			scene: this.scene.clone(),
			track: this.track.clone()
		})
		return unit;
	}

	split(ratio) {
		const start = this._durationStart
		const end = this._durationEnd
		const splitLine = parseInt((end - start) * ratio);
		this._durationEnd = start + splitLine;
		this.track.w = (this._durationEnd - this._durationStart) * this.trackStore.milliscondWidth;
		const unit = this.clone();
		unit._durationStart = start + splitLine;
		unit._durationEnd = end;
		unit.track.x = this.track.x + this.track.w
		unit.track.w = (unit._durationEnd - unit._durationStart) * this.trackStore.milliscondWidth;
		return unit;
	}

	get view() {
		if (this.resource) {
			return this.resource.view
		} else
			return '<没有绑定资源>'
	}

	get scenes() {
		return {
			id: this.id,
			resource: this.resource,
			scene: this.scene,
			duration: this.duration,
			type: this.type,
			display: this.display,
			muted: this.muted
		}
	}

	get tracks() {
		return {
			id: this.id,
			resource: this.resource,
			track: this.track.serialize,
			scene: this.scene,
			duration: this.duration,
			type: this.type,
			display: this.display,
			muted: this.muted
		}
	}

	get duration() {
		return {
			start: this._durationStart,
			end: this._durationEnd,
			duration: this._durationEnd - this._durationStart,
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

	get serialize() {
		return {
			id: this.id,
			resource: this.resource.serialize,
			track: this.track.serialize,
			scene: this.scene.serialize,
			durationStart: this._durationStart,
			durationEnd: this._durationEnd,
			display: this.display,
			muted: this.muted
		}
	}

	static async deserialize(data) {
		const unit = new LayerUnit({
			resource: await ResourceDeserialize(data.resource),
			scene: Scene.deserialize(data.scene),
			track: Track.deserialize(data.track)
		})
		unit.display = data.display
		unit.muted = data.muted
		unit._durationStart = data.durationStart
		unit._durationEnd = data.durationEnd
		return unit;
	}
}