<template>
	<el-collapse :model-value="['positionSize','blend']">
		<el-collapse-item title="位置大小" name="positionSize">
			<div class="properties-block">
				{{editorDataStore.activeUnit!=null}}
				<span class="block-name">等比例缩放</span>
				<el-switch v-model="options.positionSize.equalScale" size="small" />
			</div>
			<div class="properties-block" v-show="options.positionSize.equalScale">
				<span class="block-name">缩放</span>
				<el-slider-plus v-model="options.positionSize.scale" :min="0.01" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block" v-show="!options.positionSize.equalScale">
				<span class="block-name">缩放宽度</span>
				<el-slider-plus v-model="options.positionSize.scaleWidth" :min="0.01" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block" v-show="!options.positionSize.equalScale">
				<span class="block-name">缩放高度</span>
				<el-slider-plus v-model="options.positionSize.scaleHeight" :min="0.01" :max="5"
					:step="0.01"></el-slider-plus>
			</div>
			<div class="properties-block">
				<span class="block-name">位置 </span>
				<el-position v-model="options.positionSize.position"></el-position>
			</div>
			<div class="properties-block">
				<span class="block-name">旋转 </span>
				<el-input-number v-model="options.positionSize.rotate" :min="0" :max="360" :step="1"
					:step-strictly="true" controls-position="right" size="small" />
			</div>
		</el-collapse-item>
		<el-collapse-item title="混合" name="blend">
			<div class="properties-block">
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
			</div>
			<div class="properties-block">
				<span class="block-name">不透明度</span>
				<el-slider-plus v-model="options.blend.alpha" :min="0.01" :max="1" :step="0.01"></el-slider-plus>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script setup>
	import ElSliderPlus from '../../components/panel/el-slider-plus.vue'
	import ElPosition from '../../components/panel/el-position.vue'
	import {
		ref,
		reactive
	} from 'vue'
	import {
		useEditorDataStore
	} from '../../store/editor.js'
	
	const editorDataStore = useEditorDataStore()
	const options = reactive({
		positionSize: {
			equalScale: true,
			scale: 1,
			scaleWidth: 1,
			scaleHeight: 1,
			position: {
				x: 0,
				y: 0
			},
			rotate: 0
		},
		blend: {
			mode: 'normal',
			alpha: 1
		}
	})
	
	const formatTooltip = (number) => {
		return parseInt(number * 100) + '%'
	}
</script>

<style>
</style>