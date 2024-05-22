import {
	v4 as uuidv4
} from 'uuid'
const {
	Assets,
	Container,
	Sprite,
	Text,
	TextStyle,
	Graphics
} = PIXI;
import {
	mountMove,
	unmountMove
} from './SceneSpriteMove.js'
import {
	mountScale,
	unmountScale
} from './SceneSpriteScale.js'

export default class Scene {
	/* 最后更新时间 */
	timestamp = 0
	loaded = false
	texture = null
	sprite = null
	container = null

	constructor() {
		this.id = uuidv4()
	}

	clone() {
		return new Scene()
	}

	destroy() {
		this.container.destroy()
	}

	async load(app, resource) {
		this.texture = await loadAsset({
			alias: this.id,
			src: resource.url,
			loadParser: getLoadParserName(resource.type)
		})

		if (resource.type == 'video') {
			await loadVideo(app, this, () => this.timestamp = new Date().getTime())
			this.pause()
		} else {
			await loadVideo(app, this, () => this.timestamp = new Date().getTime())
		}
		this.container.visible = false
		this.loaded = true
	}

	play() {
		this.texture.source.resource.play()
	}

	pause() {
		this.texture.source.resource.pause()
	}

	currentTime(value) {
		this.texture.source.resource.currentTime = value
	}

	get paused() {
		return this.texture.source.resource.paused || false
	}
}

const getLoadParserName = (type) => {
	switch (type) {
		case 'video':
			return 'loadVideo';
		case 'image':
			return 'loadTextures';
	}
}

/**
 * @param assets 需要加载的资产
 * asset : { 
 * 	alias : Aliases associated with asset
 * 	src : The URL or relative path to the asset		
 *  loadParser : An override that will ensure that the asset is loaded with a specific parser
 * }
 *  LoadParserName
	Names of the parsers that are built into PixiJS. Can be any of the following defaults:
	loadJson
	loadSVG
	loadTextures
	loadTxt
	loadVideo
	loadWebFont or a custom parser name.
 */
const loadAsset = async (asset) => {
	return await Assets.load({
		alias: asset.alias,
		src: {
			src: asset.src,
			loadParser: asset.loadParser
		}
	});
}
const loadAssets = async (...assets) => {
	const result = []
	for (let i = 0; i < assets.length; i++) {
		result.push(await loadAsset(assets[i]))
	}
	return result;
}


const loadImg = async (app) => {
	const image = await Assets.load('/assets/image/1.png');
	const sprite = new Sprite(image);
	sprite.interactive = true
	sprite.x = app.screen.width / 2;
	sprite.y = app.screen.height / 2;
	app.stage.addChild(sprite);
}
const loadVideo = (app, scene, callback) => {
	const container = new Container()
	container.interactive = true
	const sprite = Sprite.from(scene.texture);
	container.addChild(sprite)
	mountMove(app, container, callback)
	mountScale(app, container, callback)
	center(app, container)
	app.stage.addChild(container);
	scene.container = container
	scene.sprite = sprite
}
const loadBackground = async (app) => {
	const background = await Assets.load('/assets/image/background.jpg');
	const backgroundSprite = new Sprite(background);
	backgroundSprite.width = app.screen.width
	backgroundSprite.height = app.screen.height
	backgroundSprite.alpha = 0
	app.stage.addChild(backgroundSprite);
}
const loadBackgroundText = async (app) => {
	const style = new TextStyle({
		fontFamily: 'Arial',
		fontSize: app.screen.width / 20,
		fontWeight: 'bold',
		fill: '#999999'
	});
	const basicText = new Text({
		text: 'Editor Background',
		style
	});
	basicText.x = app.screen.width / 2;
	basicText.y = app.screen.height / 2;
	basicText.anchor.set(0.5);
	app.stage.addChild(basicText);
}


const center = (app, container) => {
	container.x = app.screen.width / 2 - (container.width / 2);
	container.y = app.screen.height / 2 - (container.height / 2);
}

export {
	loadBackground,
	loadBackgroundText 
}