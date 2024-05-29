import {
	v4 as uuidv4
} from 'uuid'


export default class Figure {

	constructor() {
		this.id = uuidv4()
	}
	
}