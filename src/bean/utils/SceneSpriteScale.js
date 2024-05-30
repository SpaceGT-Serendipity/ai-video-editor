const {
	Container,
	Graphics,
	Point
} = PIXI;

const decision_range = 30; // 从外到里判定范文 边距像素

export function mountScale(app, container, callback) {
	let isResizing = false;
	// 距离容器中心点的长度
	let startDistance = 0;
	const range = getRange(container)
	const graphics = mountScaleDecisionRange(app, range)
	container.addChild(graphics);
	graphics.onmousedown = (event) => {
		// 获取容器中心点在世界中的坐标
		const point = event.getLocalPosition(container)
		if (point.y < range.bounds.top ||
			point.x > range.bounds.right ||
			point.y > range.bounds.bottom ||
			point.x < range.bounds.left) {
			//使用全局坐标,因为容器修改宽高会有过渡动画，导致数据刷新不及时影响造成抖动。
			const globePoint = event.getLocalPosition(app.stage)
			const globeContainerCenter = {
				x: container.x + container.width / 2,
				y: container.y + container.height / 2
			}
			const x_distanceCenter = Math.abs(globePoint.x - globeContainerCenter.x) / container.scale.x
			const y_distanceCenter = Math.abs(globePoint.y - globeContainerCenter.y) / container.scale.x
			// 基于原始大小到中心距离
			startDistance = Math.sqrt(Math.pow(x_distanceCenter, 2) + Math.pow(y_distanceCenter, 2));
			isResizing = true;
		}
	}
	app.stage.on('mousemove', (event) => {
		if (isResizing) {
			//使用全局坐标,因为容器修改宽高会有过渡动画，导致数据刷新不及时影响造成抖动。
			const globePoint = event.getLocalPosition(app.stage)
			const globeContainerCenter = {
				x: container.x + container.width / 2,
				y: container.y + container.height / 2
			}
			const x_distanceCenter = Math.abs(globePoint.x - globeContainerCenter.x)
			const y_distanceCenter = Math.abs(globePoint.y - globeContainerCenter.y)
			const currentDistance = Math.sqrt(Math.pow(x_distanceCenter, 2) + Math.pow(y_distanceCenter, 2));
			const scale = currentDistance / startDistance;
			if (scale > 0.1) {
				container.scale.x = scale;
				container.scale.y = scale;
				container.x = globeContainerCenter.x - (container.width / 2);
				container.y = globeContainerCenter.y - (container.height / 2);
				callback()
			}
		}
	});
	app.stage.on('mouseup', (event) => {
		isResizing = false;
		startDistance = 0;
	});
	app.canvas.addEventListener('mouseout', () => {
		isResizing = false;
		startDistance = 0;
	})
}

export function unmountScale(app, container) {
	container.off('mousedown')
	container.off('mousemove')
	container.off('mouseup')
	unmountScaleDecisionRange(container)
}

/**
 * 添加鼠标样式
 */
function mountScaleDecisionRange(app, range) {
	const areas = [{
		label: 'left-top',
		x: 0,
		y: 0,
		width: decision_range,
		height: decision_range,
		cursor: 'nw-resize'
	}, {
		label: 'top',
		x: decision_range,
		y: 0,
		width: range.width,
		height: decision_range,
		cursor: 'n-resize'
	}, {
		label: 'right-top',
		x: range.bounds.right,
		y: 0,
		width: decision_range,
		height: decision_range,
		cursor: 'ne-resize'
	}, {
		label: 'right',
		x: range.bounds.right,
		y: decision_range,
		width: decision_range,
		height: range.height,
		cursor: 'e-resize'
	}, {
		label: 'right-bottom',
		x: range.bounds.right,
		y: range.bounds.bottom,
		width: decision_range,
		height: decision_range,
		cursor: 'nw-resize'
	}, {
		label: 'bottom',
		x: decision_range,
		y: range.bounds.bottom,
		width: range.width,
		height: decision_range,
		cursor: 'n-resize'
	}, {
		label: 'left-bottom',
		x: 0,
		y: range.bounds.bottom,
		width: decision_range,
		height: decision_range,
		cursor: 'ne-resize'
	}, {
		label: 'left',
		x: 0,
		y: decision_range,
		width: decision_range,
		height: range.height,
		cursor: 'e-resize'
	}]
	const container = new Container()
	container.zIndex = 1
	areas.forEach(area => {
		const graphics = new Graphics();
		graphics.interactive = true
		graphics.rect(area.x, area.y, area.width, area.height);
		graphics.fill('#0000')
		graphics.on('mousemove', (event) => app.canvas.style.cursor = area.cursor);
		graphics.on('mouseout', (event) => app.canvas.style.cursor = '');
		container.addChild(graphics)
	})
	return container;
}

function unmountScaleDecisionRange(container) {
	container.children.forEach(item => {
		container.removeChild(item);
	})
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
		},
		center: {
			x: container.width / 2 * container.scale.x,
			y: container.height / 2 * container.scale.y
		}
	}
}