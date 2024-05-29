import {
	v4 as uuidv4
} from 'uuid'
import {
	AudioResource
} from './Resource.js'

export default class Figure {
	audio = null

	constructor() {
		this.id = uuidv4()
	}

}