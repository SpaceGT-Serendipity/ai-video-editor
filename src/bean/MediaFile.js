import {
	v4 as uuidv4
} from 'uuid'

export default class MediaFile {
	name = null;

	cover = null;

	url = null;

	duration = 0;

	size = 0;

	suffix = null;

	blob = null;

	constructor() {
		this.id = uuidv4();
	}

	static parse(object) {
		const file = new MediaFile();
		file.name = object.name;
		file.cover = object.cover;
		file.url = object.url;
		file.duration = object.duration;
		file.size = object.size;
		file.suffix = object.suffix;
		return file;
	}
}