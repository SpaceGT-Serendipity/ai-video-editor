<template>
	<div class="resource-text" ref="resourceTextRef">
		<div class="shade"></div>
		<div class="examples">
			{{data.name}}
		</div>
		<div class="title">
			{{data.name}}
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	import {
		useResourceDragStore
	} from '../store/resource.js'

	const props = defineProps({
		data: Object
	})
	const store = useResourceDragStore()
	const resourceTextRef = ref()

	let drop = false

	function handleMousedown() {
		drop = true
	}

	function handleMouseup() {
		drop = false
	}

	function handleMouseleave() {
		if (drop)
			store.data = props.data
		drop = false
	}

	onMounted(() => {
		resourceTextRef.value.addEventListener('mousedown', handleMousedown)
		resourceTextRef.value.addEventListener('mouseup', handleMouseup)
		resourceTextRef.value.addEventListener('mouseleave', handleMouseleave)
	})

	onBeforeUnmount(() => {
		resourceTextRef.value.removeEventListener('mousedown', handleMousedown)
		resourceTextRef.value.removeEventListener('mouseup', handleMouseup)
		resourceTextRef.value.removeEventListener('mouseleave', handleMouseleave)
	})
</script>

<style scoped>
	.resource-text {
		position: relative;
		cursor: all-scroll;
	}

	.resource-text .shade {
		position: absolute;
		top: 0;
		left: 0;
		width: 160px;
		height: 90px;
		opacity: 0;
		background: radial-gradient(#0006, #000a);
		border-radius: 5px;
		transition: height 0.2s, width 0.2s, opacity 0.2s;
	}

	.resource-text:hover .shade {
		opacity: 0.7;
	}

	.examples {
		width: 160px;
		height: 90px;
		background-color: var(--resource-card-bg);
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>