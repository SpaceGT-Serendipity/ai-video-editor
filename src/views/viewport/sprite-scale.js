const {
	Sprite,
	Graphics,
	Point
} = PIXI;

export function mountScale(app, sprite) {
	let isResizing = false;
	let startDistance = 0;
	const decision_range = 15; // 从外到里判定范文 边距像素
	const range = getRange(sprite, decision_range)
	mountScaleDecisionRange(app, sprite, decision_range)
	app.stage.on('mousedown', (event) => {
		const point = event.data.getLocalPosition(sprite)
		if (sprite.containsPoint(point) &&
			(Math.abs(point.x) > range.width / 2 || Math.abs(point.y) > range.height / 2)) {
			isResizing = true;
			const x = point.x * sprite.scale.x
			const y = point.y * sprite.scale.y
			startDistance = Math.sqrt(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
			startDistance = startDistance / (sprite.scale.x)
		}
	});
	app.stage.on('mousemove', (event) => {
		if (isResizing) {
			const point = event.data.getLocalPosition(sprite)
			const x = point.x * sprite.scale.x
			const y = point.y * sprite.scale.y
			let currentDistance = Math.sqrt(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
			const scale = currentDistance / startDistance;
			if (scale > 0.3) {
				sprite.scale.x = scale;
				sprite.scale.y = scale;
				sprite.alpha = 0.7;
			}
		}
	});
	app.stage.on('mouseup', (event) => {
		isResizing = false;
		startDistance = 0;
		sprite.alpha = 1;
	});
	app.view.addEventListener('mouseout', () => {
		isResizing = false;
		startDistance = 0;
		sprite.alpha = 1;
	})
}

export function unmountScale(app, sprite) {
	sprite.off('mousedown')
	sprite.off('mousemove')
	sprite.off('mouseup')
	sprite.alpha = 1;
	unmountScaleDecisionRange(sprite)
}

/**
 * 添加鼠标样式
 */
function mountScaleDecisionRange(app, sprite, decision_range) {
	const range = getRange(sprite, decision_range)
	const areas = [{
		label: 'left-top',
		x: range.maxBounds.minX,
		y: range.maxBounds.minY,
		width: decision_range,
		height: decision_range,
		cursor: 'nw-resize'
	}, {
		label: 'top',
		x: range.minBounds.minX,
		y: range.maxBounds.minY,
		width: range.width,
		height: decision_range,
		cursor: 'n-resize'
	}, {
		label: 'right-top',
		x: range.minBounds.maxX,
		y: range.maxBounds.minY,
		width: decision_range,
		height: decision_range,
		cursor: 'ne-resize'
	}, {
		label: 'right',
		x: range.minBounds.maxX,
		y: range.minBounds.minY,
		width: decision_range,
		height: range.height,
		cursor: 'e-resize'
	}, {
		label: 'right-bottom',
		x: range.minBounds.maxX,
		y: range.minBounds.maxY,
		width: decision_range,
		height: decision_range,
		cursor: 'nw-resize'
	}, {
		label: 'bottom',
		x: range.minBounds.minX,
		y: range.minBounds.maxY,
		width: range.width,
		height: decision_range,
		cursor: 'n-resize'
	}, {
		label: 'left-bottom',
		x: range.maxBounds.minX,
		y: range.minBounds.maxY,
		width: decision_range,
		height: decision_range,
		cursor: 'ne-resize'
	}, {
		label: 'left',
		x: range.maxBounds.minX,
		y: range.minBounds.minY,
		width: decision_range,
		height: range.height,
		cursor: 'e-resize'
	}]
	areas.forEach(area => {
		const graphics = new Graphics();
		graphics.interactive = true
		graphics.rect(area.x, area.y, area.width, area.height);
		graphics.fill('#0000')
		// graphics.stroke({width: 2,color: '#00000011'});
		graphics.on('mousemove', (event) => app.view.style.cursor = area.cursor);
		graphics.on('mouseout', (event) => app.view.style.cursor = '');
		sprite.addChild(graphics);
	})

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
		minBounds: {
			maxX: sprite.bounds.maxX - decision_range,
			maxY: sprite.bounds.maxY - decision_range,
			minX: sprite.bounds.minX + decision_range,
			minY: sprite.bounds.minY + decision_range
		},
		maxBounds: sprite.bounds
	}
}