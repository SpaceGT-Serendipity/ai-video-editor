<template>
	<vue-draggable-resizable :class-name="config.className" :class-name-active="config.classNameActive"
		:parent="config.parent" :prevent-deactivation="config.preventDeactivation" :axis="config.axis" :x="config.x"
		:y="config.y" :w="config.w" :h="config.h" :z="config.z" :handles="config.handles">
		<p>
			放一堆图片叠加。。。
		</p>
		<span class="select-left" data-v-eebe4d78="" style="cursor: ew-resize; width: 14px;"></span>
	</vue-draggable-resizable>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const props = defineProps({
		x: Number,
		w: Number,
	})

	const config = {
		className: 'layer-unit',
		classNameActive: 'layer-unit-active',
		parent: true, //移动范围限制到父标签中
		preventDeactivation: false, //防止失去激活状态
		axis: 'x', //固定移动轴向
		x: props.x || 0, //初始x坐标
		y: 0, //初始y坐标
		w: props.w || 0, //初始宽度
		h: 50, //初始高度
		z: 0, //z-index索引
		handles: ['mr', 'ml'], // 拖动手柄只保留左右
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
		transition: background-color 200ms linear;
		overflow: hidden;
	}

	.layer-unit-active {
		border: 2px solid var(--layer-unit-boder-color);
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
		background-color: #fafafa80;
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
		background-color: #fafafa80;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcAgMAAAA/7yYmAAAACVBMVEUAAAD///////9zeKVjAAAAAnRSTlMAtc2YijsAAAASSURBVAjXYwgIYFiwgJooIAAAih8hwSRVivkAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 3px 14px;
	}
</style>