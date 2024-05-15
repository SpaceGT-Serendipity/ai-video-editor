import {
	v4 as uuidv4
} from 'uuid'
const {
	Assets,
	Container,
	Sprite,
	Text,
	TextStyle
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
	loaded = false
	sprite = null
	container = null

	constructor({
		resource
	}) {
		this.id = uuidv4()
	}

	async load(resource) {
		this.container = new Container()
		await loadAssets({
			alias: this.id,
			src: resource.url,
			loadParser: getLoadParserName(resource.type)
		})
		this.sprite = Sprite.from(this.id);
		this.container.addChild(this.sprite)
		this.loaded = true
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
const loadAssets = async (...assets) => {
	for (let i = 0; i < assets.length; i++) {
		const asset = assets[i]
		await Assets.load({
			alias: asset.alias,
			src: {
				src: asset.src,
				loadParser: asset.loadParser
			}
		});
	}
}

const loadImg = async (app) => {
	const image = await Assets.load('/assets/image/1.png');
	const sprite = new Sprite(image);
	sprite.interactive = true
	sprite.anchor.set(0.5);
	sprite.x = app.screen.width / 2;
	sprite.y = app.screen.height / 2;
	app.stage.addChild(sprite);
}
const loadVideo = async (app, sprite) => {
	sprite.x = app.screen.width / 2;
	sprite.y = app.screen.height / 2;
	sprite.anchor.set(0.5);
	sprite.interactive = true
	app.stage.addChild(sprite);
	setTimeout(() => {
		// mountMove(app, sprite)
	}, 1000)
	// mountScale(app, sprite)
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


export {
	loadAssets,
	loadImg,
	loadVideo,
	loadBackground,
	loadBackgroundText
}