import Resource from './Resource'

export default class ImageResource extends Resource {
	type= 'image'
	constructor({
		name,
		url
	}) {
		super(name)
		this.url = url;
		this.blobUrl = url;
		this.cover = url;
		this.duration = 6000
		this.loaded = true
	}

	static file(resource) {
		return new ImageResource({
			name: resource.name,
			url: URL.createObjectURL(resource)
		});
	}


	get view() {
		return `<div style="${Resource.ImageResourceStyle} background-image: url(${this.cover});">
			<span style="${Resource.NameStyle}">${this.name}</span>
		</div>`
	}

}