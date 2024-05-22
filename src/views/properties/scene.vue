<template>
	<el-collapse :model-value="['positionSize','blend']">
		<el-collapse-item title="位置大小" name="positionSize">
			<div class="properties-block">
				<span class="block-name">智能对齐</span>
				<div>
					<el-button @click="center">居中</el-button>
					<el-button @click="adaptiveSize">自适应画布大小</el-button>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">等比例缩放</span>
				<el-switch v-model="options.positionSize.syncScale" size="small" />
			</div>
			<div class="properties-block" v-show="options.positionSize.syncScale">
				<span class="block-name">缩放</span>
				<el-slider-plus v-model="options.positionSize.scale.x" :min="0.1" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block" v-show="!options.positionSize.syncScale">
				<span class="block-name">缩放宽度</span>
				<el-slider-plus v-model="options.positionSize.scale.x" :min="0.1" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block" v-show="!options.positionSize.syncScale">
				<span class="block-name">缩放高度</span>
				<el-slider-plus v-model="options.positionSize.scale.y" :min="0.1" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block">
				<span class="block-name">位置 </span>
				<el-position v-model="options.positionSize.position"></el-position>
			</div>
			<div class="properties-block">
				<span class="block-name">旋转 </span>
				<el-input-number v-model="options.positionSize.rotation" :min="0" :max="360" :step="1"
					:step-strictly="true" controls-position="right" size="small" />
			</div>
		</el-collapse-item>
		<el-collapse-item title="混合" name="blend">
			<!-- <div class="properties-block">
				<span class="block-name">混合模式</span>
				<el-select v-model="options.blend.mode" placeholder="混合模型">
					<el-option label="正常" value="normal" />
					<el-option label="变亮" value="变亮" />
					<el-option label="滤色" value="滤色" />
					<el-option label="变暗" value="变暗" />
					<el-option label="叠加" value="叠加" />
					<el-option label="强光" value="强光" />
					<el-option label="柔光" value="柔光" />
					<el-option label="颜色加深" value="颜色加深" />
					<el-option label="线性加深" value="线性加深" />
					<el-option label="颜色减淡" value="颜色减淡" />
					<el-option label="正片叠底" value="正片叠底" />
				</el-select>
			</div> -->
			<div class="properties-block">
				<span class="block-name">不透明度</span>
				<el-slider-plus v-model="options.blend.alpha" :min="0" :max="1" :step="0.01"></el-slider-plus>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script setup>
	import ElSliderPlus from '../../components/panel/el-slider-plus.vue'
	import ElPosition from '../../components/panel/el-position.vue'
	import {
		ref,
		reactive,
		watch
	} from 'vue'
	import {
		useLayersDataStore
	} from '../../store/layers.js'
	import {
		useViewportStore
	} from '../../store/viewport.js'

	const layersDataStore = useLayersDataStore()
	const viewportStore = useViewportStore()
	const options = reactive({
		positionSize: {
			syncScale: true,
			scale: {
				x: 1,
				y: 1
			},
			position: {
				x: 0,
				y: 0
			},
			rotation: 0
		},
		blend: {
			mode: 'normal',
			alpha: 1
		}
	})
	const container = ref()

	watch(() => {
		const unit = layersDataStore.activeUnit
		if (unit) {
			return {
				scene: unit.scene,
				timestamp: unit.scene.timestamp
			};
		}
		return null;
	}, (value) => {
		if (value) {
			const read = () => {
				if (value.scene.loaded) {
					container.value = value.scene.container
					options.positionSize.scale.x = container.value.scale.x
					options.positionSize.scale.y = container.value.scale.y
					options.positionSize.position.x = container.value.x
					options.positionSize.position.y = container.value.y
					options.positionSize.rotation = parseInt(container.value.rotation / (Math.PI * 2) * 360)
					options.blend.alpha = container.value.alpha
				} else setTimeout(() => read(), 100)
			}
			read()
		}
	})
	watch(() => options.positionSize.scale.x, (value) => {
		if (options.positionSize.syncScale) {
			container.value.scale.x = value
			container.value.scale.y = value
			options.positionSize.scale.y = value
		} else {
			container.value.scale.x = value
		}
		center()
	})
	watch(() => options.positionSize.scale.y, (value) => {
		container.value.scale.y = value
		center()
	})
	watch(() => options.positionSize.position.x, (value) => {
		container.value.x = value
	})
	watch(() => options.positionSize.position.y, (value) => {
		container.value.y = value
	})
	watch(() => options.positionSize.rotation, (value) => {
		container.value.rotation = (Math.PI * 2) * value / 360
	})
	watch(() => options.blend.alpha, (value) => {
		container.value.alpha = value
	})

	const formatTooltip = (number) => {
		return parseInt(number * 100) + '%'
	}
	const center = () => {
		const container = layersDataStore.activeUnit.scene.container
		const x = viewportStore.app.screen.width / 2 - container.width / 2
		const y = viewportStore.app.screen.height / 2 - container.height / 2
		container.x = x
		container.y = y
	}
	const adaptiveSize = () => {
		const container = layersDataStore.activeUnit.scene.container
		const widthScale = viewportStore.app.screen.width / container.width
		const heightScale = viewportStore.app.screen.height / container.height
		const maxScale = Math.max(widthScale, heightScale)
		container.scale.x = container.scale.x * maxScale
		container.scale.y = container.scale.y * maxScale
		center()
	}
</script>

<style>
</style>