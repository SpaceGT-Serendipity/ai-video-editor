<template>
	<div class="resource-dragging" ref="resourceDraggingRef" v-if="store.data">
		<div class="card">
			<el-image :src="store.data.cover"></el-image>
			<div class="shade"></div>
		</div>
		<div class="title">{{store.data.name}}</div>
	</div>
	<div class="resource-dragging-shade" v-if="store.data"></div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useResourceDragStore
	} from '../store/resource-drag.js'

	const store = useResourceDragStore()
	const resourceDraggingRef = ref()

	onMounted(() => {
		document.addEventListener('mousemove', (event) => {
			if (store.data) {
				const mouseX = event.pageX;
				const mouseY = event.pageY;
				resourceDraggingRef.value.style.left = (mouseX - 100) + 'px';
				resourceDraggingRef.value.style.top = (mouseY - 80) + 'px';
			}
		})
	})
</script>

<style scoped>
	.resource-dragging {
		position: absolute;
		z-index: 4;
		padding: 20px;
		padding-bottom: 10px;
		background-color: #6663;
		border-radius: 10px;
		pointer-events: none;
		cursor: all-scroll;
	}

	.resource-dragging-shade {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #0006;
		z-index: 2;
	}

	.title {
		font-size: 14px;
		color: var(--el-menu-text-color);
		margin: 6px 0;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 160px;
	}

	.card {
		position: relative;
		width: 160px;
		height: 90px;
		background-color: #666;
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		background-size: cover;
		border-radius: 5px;
		cursor: all-scroll;
	}

	.card .el-image {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: height 0.3s, width 0.3s;
	}
	
</style>