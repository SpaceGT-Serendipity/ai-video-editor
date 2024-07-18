import Resource from './Resource'
export default class TextResource extends Resource {
	type= 'text'
	
	constructor(name) {
		super(name)
		this.duration = 6000
		this.loaded = true
	}

	clone() {
		const textResource = new TextResource(this.name)
		textResource.duration = this.duration
		return textResource;
	}

	get view() {
		return `<span style="line-height: 40px;font-size:12px;padding-left:5px;">${this.name}</span>`
	}
}