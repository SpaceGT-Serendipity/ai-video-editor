const {
	Graphics,
	Point
} = PIXI;

export function wireframe(scene, callback) {
	const container = scene.container
	if (container.children.find(item => item.label == 'wireframe') != null) return;
	const sprite = scene.sprite
	const borderWidth = Math.ceil(sprite.width / 200)
	const graphics = new Graphics();
	graphics.label = 'wireframe'
	graphics.interactive = false
	graphics.rect(0, 0, sprite.width, borderWidth);
	graphics.rect(0, 0, borderWidth, sprite.height);
	graphics.rect(0, sprite.height - borderWidth, sprite.width, borderWidth);
	graphics.rect(sprite.width - borderWidth, 0, borderWidth, sprite.height);
	graphics.fill('#aaa')
	const markWidth = borderWidth * 4
	graphics.rect(borderWidth / 2, borderWidth / 2, markWidth, markWidth);
	graphics.rect(sprite.width / 2 - markWidth / 2 - borderWidth / 2, borderWidth / 2, markWidth, markWidth);
	graphics.rect(sprite.width - markWidth - borderWidth / 2, borderWidth / 2, markWidth, markWidth);
	graphics.rect(borderWidth / 2, sprite.height / 2 - markWidth / 2 - borderWidth / 2, markWidth, markWidth);
	graphics.rect(borderWidth / 2, sprite.height - markWidth - borderWidth / 2, markWidth, markWidth);
	graphics.rect(sprite.width - markWidth - borderWidth / 2,
		sprite.height / 2 - markWidth / 2 - borderWidth / 2, markWidth, markWidth);
	graphics.rect(sprite.width / 2 - markWidth / 2 - borderWidth / 2,
		sprite.height - markWidth - borderWidth / 2, markWidth, markWidth);
	graphics.rect(sprite.width - markWidth - borderWidth / 2,
		sprite.height - markWidth - borderWidth / 2, markWidth, markWidth);
	graphics.stroke({
		width: borderWidth,
		color: '#aaa'
	});
	graphics.fill('#4388FF')
	container.addChild(graphics)
}


export function unWireframe(scene, callback) {
	const container = scene.container
	container.children.forEach(item => {
		if (item.label == 'wireframe') item.destroy()
	})
}