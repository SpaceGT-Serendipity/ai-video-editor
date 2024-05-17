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
	/* 开始时间,并不是真实事件,仅为显示的开始时间(ms) */
	_durationStart = 0
	/* 结束时间,并不是真实事件,仅为显示的结束时间(ms) */
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
		this.scene = scene || new Scene({
			resource
		})
		this.track = track || new Track({
			x: 0,
			w: resource.duration / 1000 * this.trackStore.secondWidth,
		})
	}

	destroy() {
		this.scene.destroy()
	}

	clone() {
		const unit = new LayerUnit({
			resource: this.resource,
			track: this.track.clone()
		})
		return unit;
	}

	set durationStart(value) {
		this._durationStart = value
	}

	get durationStart() {
		return this._durationStart
	}

	set durationEnd(value) {
		this._durationEnd = value
	}

	get durationEnd() {
		return this._durationEnd
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
			start: this.durationStart,
			end: this.durationEnd,
			duration: this.durationEnd - this.durationStart
		}
	}

	get trackMaxWidth() {
		if (this.resource.type == 'video')
			return parseInt((this.durationEnd - this.durationStart) / 1000 *
				this.trackStore.secondWidth *
				this.trackStore.controllerScale)
		else
			return 0
	}
}