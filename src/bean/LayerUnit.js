import {
	v4 as uuidv4
} from 'uuid'
import {
	useTrackStore
} from '../store/track.js'
import Scene from './Scene.js'
import Track from './Track.js'

export class LayerUnit {
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
		this.scene.destroy()
	}

	clone() {
		const unit = new LayerUnit({
			resource: this.resource,
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

	get simplify() {
		return {
			id: this.id,
			resource: this.resource,
			track: this.track.simplify,
			scene: this.scene
		}
	}

	get scenes() {
		return {
			id: this.id,
			resource: this.resource,
			scene: this.scene
		}
	}

	get duration() {
		return {
			start: this._durationStart,
			end: this._durationEnd,
			duration: this._durationEnd - this._durationStart
		}
	}

	get trackMaxWidth() {
		if (this.resource.type == 'video')
			return parseInt((this._durationEnd - this._durationStart) * this.trackStore.milliscondWidth)
		else
			return 0
	}
}