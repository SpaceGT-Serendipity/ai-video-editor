import {
	v4 as uuidv4
} from 'uuid'

export class Resource {

	constructor(name) {
		this.id = uuidv4();
		this.name = name;
		this.duration = 6;
	}

	get view() {
		return ''
	}

}

export class TextResource extends Resource {
	constructor(name) {
		super(name)
	}

	get view() {
		return `<span style="line-height: 46px;">${this.name}</span>`
	}
}

export class ImageResource extends Resource {
	constructor(name, url) {
		super(name)
		this.url = url;
	}

	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.url});"></div>`
	}
}

export class VideoResource extends Resource {
	constructor(name, url, cover) {
		super(name)
		this.url = url;
		this.cover = cover;
		this.duration = 12;
	}
	
	get view() {
		return `<div style="${ImageResourceStyle} background-image: url(${this.cover});"></div>`
	}
}

const ImageResourceStyle = `
	width: 100%;
    height: 100%;
    background-repeat: repeat-x;
    background-size: contain;
	background-position: center;
`