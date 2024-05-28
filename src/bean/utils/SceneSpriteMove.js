const {
	Graphics,
	Point
} = PIXI;

const decision_range = 30; // 从里到外判定范文 边距像素

export function mountMove(app, container, callback) {
	let dragging = false;
	let position = null
	const range = getRange(container)
	const graphics = mountMoveDecisionRange(app, range)
	container.addChild(graphics)
	graphics.onmousedown = (event) => {
		const point = event.getLocalPosition(container)
		if (point.x > range.bounds.left && point.x < range.bounds.right &&
			point.y > range.bounds.top && point.y < range.bounds.bottom) {
			dragging = true;
			position = {
				x: event.data.global.x - container.x,
				y: event.data.global.y - container.y
			};
		}
	}
	app.stage.on('mousemove', (event) => {
		if (dragging) {
			container.position.set(
				event.data.global.x - position.x,
				event.data.global.y - position.y
			);
			callback()
		}
	});
	app.stage.on('mouseup', (event) => {
		dragging = false;
		position = null;
	});
}
export function unmountMove(container) {
	container.off('mousedown')
	container.off('mousemove')
	container.off('mouseup')
	container.off('mouseout')
	unmountMoveDecisionRange(container)
}

/**
 * 添加鼠标样式
 */
function mountMoveDecisionRange(app, range) {
	const graphics = new Graphics();
	graphics.rect(range.bounds.left, range.bounds.top, range.width, range.height);
	graphics.fill('#0000')
	graphics.interactive = true
	graphics.on('mouseenter', (event) => app.canvas.style.cursor = 'move');
	graphics.on('mouseleave', (event) => app.canvas.style.cursor = 'initial');
	return graphics;
}

function unmountMoveDecisionRange(container) {
	// container.children.forEach(item => {
	// 	container.removeChild(item);
	// })
}

/**
 * @param decision_range 边缘距离
 */
function getRange(container) {
	return {
		width: container.width - decision_range * 2,
		height: container.height - decision_range * 2,
		bounds: {
			left: decision_range,
			right: container.width - decision_range,
			top: decision_range,
			bottom: container.height - decision_range,
		}
	}
}