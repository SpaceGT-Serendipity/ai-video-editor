<template>
	<vue-draggable-resizable ref="unitRef" :class-name="config.className" :class-name-active="config.classNameActive"
		:parent="config.parent" :prevent-deactivation="config.preventDeactivation" :axis="config.axis" :x="config.x"
		:y="config.y" :w="config.w" :h="config.h" :z="config.z" :min-width="config.minWidth" :handles="config.handles"
		:on-drag="onDrag" :on-resize="onResize" @dragging="onDragging" @drag-stop="onDragStop">
		<slot></slot>
	</vue-draggable-resizable>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		watch
	} from 'vue'

	const unitRef = ref()
	const emits = defineEmits(['onDrag', 'onResize'])
	const props = defineProps({
		x: Number,
		w: Number,
	})
	const config = reactive({
		className: 'layer-unit',
		classNameActive: 'layer-unit-active',
		parent: true, //移动范围限制到父标签中
		preventDeactivation: false, //防止失去激活状态
		axis: 'x', //固定移动轴向
		x: props.x || 0, //初始x坐标
		y: 0, //初始y坐标
		w: props.w || 0, //初始宽度
		h: 50, //初始高度
		z: 1, //z-index索引
		minWidth: 30,
		handles: ['mr', 'ml'], // 拖动手柄只保留左右
	})
	const position = reactive({
		x: config.x,
		y: config.y,
		w: config.w,
		h: config.h,
		dragging: false
	})
	watch(() => props.x, (value) => {
		config.x = value
	})
	watch(() => props.w, (value) => {
		config.w = value
	})

	// 触碰检测
	const onDrag = (x, y) => {
		position.x = x;
		position.y = y;
		updateDragState()
		updateResizeState()
		return true
	}
	const onResize = (handle, x, y, width, height) => {
		position.x = x;
		position.y = y;
		position.w = width;
		position.h = height;
		updateResizeState()
	}
	const onDragging = () => {
		position.dragging = true
		updateDragState()

	}
	const onDragStop = () => {
		position.dragging = false
		updateDragState()
	}
	const updateDragState = () => {
		emits('onDrag', {
			unit: unitRef.value,
			position
		})
	}
	const updateResizeState = () => {
		emits('onResize', position)
	}
</script>

<style scoped>
	.layer-unit {
		touch-action: none;
		position: absolute;
		box-sizing: border-box;
		border: 2px dashed #fff0;
		border-radius: 5px;
		background-color: var(--layer-unit-bg);
		overflow: hidden;
	}

	.layer-unit-active {
		border: 2px solid var(--layer-unit-boder-color);
		z-index: 99 !important;
	}

	.layer-unit-active:deep(.handle-ml) {
		position: absolute;
		width: 14px;
		height: 100%;
		top: 0px;
		bottom: 0px;
		left: 0;
		margin: 0;
		border: none;
		background-color: var(--layer-unit-handle-bg);
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcAgMAAAA/7yYmAAAACVBMVEUAAAD///////9zeKVjAAAAAnRSTlMAtc2YijsAAAASSURBVAjXYwgIYFiwgJooIAAAih8hwSRVivkAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 3px 14px;
	}

	.layer-unit-active:deep(.handle-mr) {
		position: absolute;
		width: 14px;
		height: 100%;
		top: 0px;
		bottom: 0px;
		right: 0;
		margin: 0;
		border: none;
		background-color: var(--layer-unit-handle-bg);
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcAgMAAAA/7yYmAAAACVBMVEUAAAD///////9zeKVjAAAAAnRSTlMAtc2YijsAAAASSURBVAjXYwgIYFiwgJooIAAAih8hwSRVivkAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 3px 14px;
	}
</style>