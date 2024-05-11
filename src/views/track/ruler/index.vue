<template>
	<div class="timeline ruler" :style="{'width':(scaleCount*configOptions.scaleWidth)+'px'}">
		<ruler-item :width="configOptions.scaleWidth+'px'" v-for="i in scaleCount"
			:time="(i-1)*configOptions.scaleTime"></ruler-item>
	</div>

</template>
<script setup>
	import RulerItem from './item.vue'
	import {
		ref,
		reactive,
		computed,
		onMounted,
		watch
	} from 'vue'
	import {
		refThrottled
	} from '@vueuse/core'
	import {
		useTrackRulerConfigStore
	} from '../../../store/track.js'

	const trackRulerConfigStore = useTrackRulerConfigStore()
	const props = defineProps({
		scale: {
			type: Number,
			default: 1
		}, // 刻度缩放 defult 1
		time: Number, // 时间轴总时间
		scaleWidth: Number, //刻度距离
		scaleTime: Number, //刻度时间
	})
	const configOptions = reactive({
		totalTime: props.time,
		scaleWidth: props.scaleWidth,
		scaleTime: props.scaleTime
	})
	const scaleCount = computed(() => parseInt(configOptions.totalTime / configOptions.scaleTime) + 1)
	const scale = ref(props.scale)
	const scaleThrottled = refThrottled(scale, trackRulerConfigStore.scaleThrottledTime)

	watch(() => props.scale, (value) => {
		scale.value = props.scale
	})

	watch(() => scaleThrottled.value, (value) => {
		configOptions.scaleTime = parseInt(props.scaleTime / value)
		resize()
	})

	const resize = (data) => {
		// 获取屏幕尺寸或组件的宽度，取最大值
		let width = window.innerWidth;
		if (data && data > width) width = data
		// 设置时间轴不小于宽度*1.5
		let time = parseInt(width / configOptions.scaleWidth + 1) * configOptions.scaleTime * 1.5
		// 新时间的大于当前时间更新
		if (time > configOptions.totalTime) {
			configOptions.totalTime = time
			//主动触发window.resize事件，更新组件的移动范围
			window.dispatchEvent(new Event('resize'));
		}
	}

	onMounted(() => {
		resize()
	})

	defineExpose({
		resize
	})
</script>
<style scoped>
	.timeline.ruler {
		white-space: nowrap;
		overflow: hidden;
		z-index: 1;
	}
</style>