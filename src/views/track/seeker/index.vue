<template>
	<div class="track-seeker-root" ref="trackSeekerRootRef">
		<div class="seeker-head"></div>
		<div class="seeker-body"><span class="seeker-body-inner"></span></div>
		<span class="debug">
			Seeker X: {{editorDataStore.trackSeeker}}
		</span>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import {
		useMouse,
		useParentElement
	} from '@vueuse/core'
	import {
		useEditorDataStore
	} from '../../../store/editor.js'

	const editorDataStore = useEditorDataStore()
	const parentEl = useParentElement()
	const trackSeekerRootRef = ref()
	const mouse = useMouse({
		target: parentEl
	})
	const drag = ref(false)

	watch(mouse.x, (value) => {
		if (drag.value) {
			const x = mouse.x.value - parentEl.value.offsetLeft;
			editorDataStore.setTrackSeeker(x)
		}
	})

	watch(() => editorDataStore.trackSeeker, () => {
		trackSeekerRootRef.value.style.left = editorDataStore.trackSeeker + "px";
	})

	onMounted(() => {
		trackSeekerRootRef.value.addEventListener('mousedown', (event) => drag.value = true)
		document.addEventListener('mouseup', (event) => drag.value = false)
		document.addEventListener('mouseleave', (event) => drag.value = false)
	})
</script>

<style scoped>
	.track-seeker-root {
		position: absolute;
		left: 0px;
		bottom: 0px;
		top: 0px;
		transform: translateX(0px);
		pointer-events: auto;
		z-index: 1;
		cursor: ew-resize;
	}

	.seeker-head {
		position: absolute;
		width: 9px;
		height: 12px;
		z-index: 3;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		box-sizing: border-box;
		background-color: #fafafa;
		transform: translateX(-4.5px);
	}

	.seeker-body {
		position: absolute;
		box-sizing: border-box;
		width: 9px;
		top: 10px;
		bottom: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateX(-4.5px);
	}

	.seeker-body-inner {
		flex: 1;
		width: 1px;
		background-color: #fafafa;
	}
</style>