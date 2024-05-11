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
		watch,
		getCurrentInstance
	} from 'vue'

	const instance = getCurrentInstance()
	const unitRef = ref()
	const emits = defineEmits(['onDrag', 'onResize'])
	const props = defineProps({
		data: Object 
	})
	const config = reactive({
		className: 'layer-unit',
		classNameActive: 'layer-unit-active',
		parent: true, //移动范围限制到父标签中
		preventDeactivation: false, //防止失去激活状态
		axis: 'x', //固定移动轴向
		x: props.data.x || 0, //初始x坐标
		y: 0, //初始y坐标
		w: props.data.w || 0, //初始宽度
		h: props.data.h, //初始高度
		z: 1, //z-index索引
		minWidth: 30,
		handles: ['mr', 'ml'], // 拖动手柄只保留左右
	})

	watch(() => props.data.x, (value) => {
		config.x = value
	})
	watch(() => props.data.w, (value) => {
		config.w = value
	})

	// 拖拽事件
	const onDrag = (x, y) => {
		props.data.x = parseInt(x)
		emits('onDrag', props.data)
		return true
	}
	// 修改大小事件
	const onResize = (handle, x, y, width, height) => {
		props.data.x = parseInt(x)
		props.data.w = width;
	}
	// 拖拽中事件
	const onDragging = () => {
		props.data.dragging = true
		emits('onDrag', props.data)
	}
	// 拖拽停止事件
	const onDragStop = () => {
		props.data.dragging = false
		emits('onDrag', props.data)
	}
	// 主动触发鼠标事件
	const onMousedown = (event) => {
		var mouseEvent = new MouseEvent('mousedown', {
			'view': window,
			'bubbles': true,
			'cancelable': false,
			'clientX': event.clientX,
			'clientY': event.clientY
		});
		unitRef.value.$el.dispatchEvent(mouseEvent)
	}

	onMounted(() => {
		props.data.instance = instance
	})

	defineExpose({
		onMousedown
	})
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