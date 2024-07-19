import Resource from './Resource'

export default class FigureResource extends Resource {
	type = 'figure';
	/* 标签 */
	tag = null;
	/* 音频 MediaFile */
	audio = null;

	constructor({
		name,
		tag,
		url,
		cover
	}) {
		super(name)
		this.url = url;
		this.blobUrl = cover;
		this.cover = cover;
		this.tag = tag;
		this.duration = 6000;
		this.loaded = true;
	}

	clone() {
		return new FigureResource({
			name: this.name,
			tag: this.tag,
			url: this.url,
			cover: this.cover
		})
	}

	get view() {
		return `<div style="${Resource.ImageResourceStyle} background-image: url(${this.cover});">
			<span style="${Resource.NameStyle}">${this.name}</span>
		</div>`;
	}
}