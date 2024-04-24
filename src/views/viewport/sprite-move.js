const {
	Sprite,
	Graphics,
	Point
} = PIXI;

export function mountMove(app, sprite) {
	sprite.anchor.set(0.5);
	let dragging = false;
	const decision_range = 15; // 从里到外判定范文 边距像素
	const range = getRange(sprite, decision_range)
	mountMoveDecisionRange(app, sprite, decision_range)
	sprite.on('mousedown', (event) => {
		const point = event.data.getLocalPosition(sprite)
		if (Math.abs(point.x) < range.width / 2 && Math.abs(point.y) < range.height / 2) {
			const currentDistance =
				Math.sqrt(Math.sqrt(Math.pow(point.x, 2)) + Math.sqrt(Math.pow(point.y, 2)));
			dragging = true;
			sprite.alpha = 0.7;
			sprite.data = {
				x: event.data.global.x - sprite.x,
				y: event.data.global.y - sprite.y
			};
		}
	})
	sprite.on('mousemove', (event) => {
		if (dragging) {
			sprite.position.set(
				event.data.global.x - sprite.data.x,
				event.data.global.y - sprite.data.y
			);
		}
	})
	sprite.on('mouseup', () => {
		dragging = false;
		sprite.alpha = 1;
		sprite.data = null;
	})
	sprite.on('mouseout', (event) => {
		const point = event.data.getLocalPosition(sprite)
		if (!sprite.containsPoint(point)) {
			dragging = false;
			sprite.alpha = 1;
			sprite.data = null;
		}
	});
}
export function unmountMove(sprite) {
	sprite.off('mousedown')
	sprite.off('mousemove')
	sprite.off('mouseup')
	sprite.off('mouseout')
	sprite.alpha = 1;
	sprite.data = null;
	unmountMoveDecisionRange(sprite)
}

/**
 * 添加鼠标样式
 */
function mountMoveDecisionRange(app, sprite, decision_range) {
	const range = getRange(sprite, decision_range)
	const graphics = new Graphics();
	graphics.rect(range.bounds.minX, range.bounds.minY, range.width, range.height);
	graphics.fill('#0000')
	//隐藏边框
	// graphics.stroke({width: 2,color: '#00000011'});
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

function unmountMoveDecisionRange(sprite) {
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