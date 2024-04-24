const {
	Sprite,
	Graphics,
	Point
} = PIXI;

export function mountScale(app, sprite) {
	sprite.anchor.set(0.5);
	let isResizing = false;
	let startDistance = 0;
	const decision_range = 15; // 从外到里判定范文 边距像素
	const range = getRange(sprite, decision_range)
	mountScaleDecisionRange(app, sprite, decision_range)
	app.stage.on('mousedown', (event) => {
		const point = event.data.getLocalPosition(sprite)
		if (sprite.containsPoint(point) &&
			Math.abs(point.x) > range.width / 2 &&
			Math.abs(point.y) > range.height / 2) {
			isResizing = true;
			startDistance = Math.sqrt(Math.sqrt(Math.pow(point.x, 2)) +
				Math.sqrt(Math.pow(point.y, 2)));
			startDistance = startDistance / sprite.scale.x
		}
	});
	app.stage.on('mousemove', (event) => {
		if (isResizing) {
			const point = event.data.getLocalPosition(sprite)
			const currentDistance = Math.sqrt(Math.sqrt(Math.pow(point.x, 2)) +
				Math.sqrt(Math.pow(point.y, 2)));
			const scale = currentDistance / startDistance;
			sprite.scale.x = scale
			sprite.scale.y = scale;
		}
	});
	app.stage.on('mouseup', (event) => {
		isResizing = false;
		startDistance = 0;
	});
}

export function unmountScale(app, sprite) {

}



/**
 * 添加鼠标样式
 */
function mountScaleDecisionRange(app, sprite, decision_range) {
	const range = getRange(sprite, decision_range)
	const graphics = new Graphics();
	graphics.rect(range.bounds.minX, range.bounds.minY, range.width, range.height);
	graphics.fill('#0000')
	//隐藏边框
	graphics.stroke({
		width: 2,
		color: '#00000011'
	});
	graphics.interactive = true
	// 添加鼠标样式
	graphics.on('mousemove', (event) => {
		app.view.style.cursor = 'move'
	});
	graphics.on('mouseout', (event) => {
		app.view.style.cursor = ''
	});
	sprite.addChild(graphics);
}

function unmountScaleDecisionRange(sprite) {
	sprite.children.forEach(item => {
		sprite.removeChild(item);
	})
}


/**
 * @param decision_range 边缘距离
 */
function getRange(sprite, decision_range) {
	return {
		width: sprite.width - decision_range * 2,
		height: sprite.height - decision_range * 2,
		bounds: {
			maxX: sprite.bounds.maxX - decision_range,
			maxY: sprite.bounds.maxY - decision_range,
			minX: sprite.bounds.minX + decision_range,
			minY: sprite.bounds.minY + decision_range
		}
	}
}