import {
	v4 as uuidv4
} from 'uuid'

export default class Resource {
	/* 文件名 */
	name = null
	/* 原始时长(ms) */
	duration = 0
	/* 资源大小 */
	size = 0
	/* 资源加载完成 */
	loaded = false
	/* 网络地址 */
	url = null
	/* 本地地址 */
	blobUrl = null;
	/* 封面 */
	cover = null

	constructor(name) {
		this.id = uuidv4();
		this.name = name;
	}

	clone() {
		return this;
	}

	destroy() {}

	static ImageResourceStyle = `
		width: 100%;
	    height: 100%;
	    background-repeat: repeat-x;
	    background-size: contain;
		background-position: left;
	`

	static NameStyle = `
		position: absolute; 
		max-width: 100%; 
		overflow: hidden; 
		text-overflow: ellipsis; 
		white-space: nowrap; 
		font-size:10px; 
		top: 0; 
		padding-left: 2px;
	`


}