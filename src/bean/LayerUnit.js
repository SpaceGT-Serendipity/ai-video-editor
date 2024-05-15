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

	constructor({
		resource,
		scene,
		track
	}) {
		this.id = uuidv4();
		this.resource = resource;
		this.scene = scene || new Scene({
			resource
		})
		this.track = track || new Track({
			x: 0,
			w: resource.duration * this.trackStore.secondWidth
		})
	}

	clone() {
		const unit = new LayerUnit({
			resource: this.resource,
			track: this.track.clone()
		})
		return unit;
	}

	get view() {
		if (this.resource) {
			return this.resource.view
		} else
			return '<没有绑定资源>'
	}

}