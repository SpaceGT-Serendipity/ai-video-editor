<template>
	<div class="track-seeker-root" ref="trackSeekerRootRef">
		<div class="seeker-head"></div>
		<div class="seeker-body"><span class="seeker-body-inner"></span></div>
		<span class="debug float">
			Seeker X: {{trackStore.seekerLocation}} Time: {{trackStore.seekerTime}}ms
		</span>
	</div>
</template>

<script setup>
	import {
		ref,
		watch,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	import {
		useMouse,
		useParentElement
	} from '@vueuse/core'
	import {
		useTrackStore
	} from '../../../store/track.js'
	import {
		useLayersDataStore
	} from '../../../store/layers.js'
	import {
		useSceneStore
	} from '../../../store/scene.js'

	const layersDataStore = useLayersDataStore()
	const trackStore = useTrackStore()
	const sceneStore = useSceneStore()
	const parentEl = useParentElement()
	const trackSeekerRootRef = ref()
	const mouse = useMouse({
		target: parentEl
	})
	const drag = ref(false)

	watch(mouse.x, (value) => {
		if (drag.value) {
			const x = mouse.x.value - parentEl.value.offsetLeft + parentEl.value.parentElement.scrollLeft;
			trackStore.setSeeker(x)
		}
	})
	watch(() => trackStore.seekerLocation, () => {
		trackSeekerRootRef.value.style.left = trackStore.seekerLocation + "px";
	})
	watch(() => trackStore.seekerTime, (value) => {
		if (trackStore.seekerTime == layersDataStore.videoTotalDuration) {
			sceneStore.playing = false
		}
		trackStore.seekerLocation = parseInt(trackStore.seekerTime * trackStore.milliscondWidth)
	})
	watch(() => trackStore.controllerScale, (value, oldValue) => {
		trackStore.seekerLocation = parseInt(trackStore.seekerTime * trackStore.milliscondWidth)
	})

	function startDrag() {
		drag.value = true
	}

	function endDrag() {
		drag.value = false
	}

	onMounted(() => {
		trackSeekerRootRef.value.addEventListener('mousedown', startDrag)
		document.addEventListener('mouseup', endDrag)
		document.addEventListener('mouseleave', endDrag)
	})

	onBeforeUnmount(() => {
		trackSeekerRootRef.value.removeEventListener('mousedown', startDrag)
		document.removeEventListener('mouseup', endDrag)
		document.removeEventListener('mouseleave', endDrag)
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
		z-index: 3;
		cursor: ew-resize;
	}

	.seeker-head {
		position: absolute;
		width: 9px;
		height: 12px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		box-sizing: border-box;
		background-color: var(--seeker-color);
		transform: translateX(-4.5px);
	}

	.seeker-body {
		position: absolute;
		box-sizing: border-box;
		width: 9px;
		top: 10px;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateX(-4.5px);
	}

	.seeker-body-inner {
		flex: 1;
		width: 1px;
		background-color: var(--seeker-color);
	}
</style>