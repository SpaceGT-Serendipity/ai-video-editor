<template>
	<el-collapse :model-value="['text','textStyle']">
		<el-collapse-item title="文本" name="text">
			<div class="properties-block">
				<span class="block-name">文本内容</span>
				<div>
					<el-input v-model="options.text"></el-input>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">填充颜色</span>
				<div>
					{{options.fill}}
					<el-color-picker v-model="options.fill" />
				</div>
			</div>

		</el-collapse-item>
		<el-collapse-item title="文本样式" name="textStyle">
			<div class="properties-block">
				<span class="block-name">字体类型</span>
				<div>
					<el-select v-model="options.fontFamily">
						<el-option value="Helvetica">Helvetica</el-option>
						<el-option value="Arial">Arial</el-option>
						<el-option value="sans-serif">sans-serif</el-option>
					</el-select>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">字体大小</span>
				<div>
					<el-input-number v-model="options.fontSize" :min="8" :max="100"
						controls-position="right"></el-input-number>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">字体样式</span>
				<div>
					<el-select v-model="options.fontStyle">
						<el-option value="normal" label="正常"></el-option>
						<el-option value="italic" label="italic"></el-option>
						<el-option value="oblique" label="oblique"></el-option>
					</el-select>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">字体粗细</span>
				<div>
					<el-select v-model="options.fontWeight">
						<el-option value="normal" label="正常"></el-option>
						<el-option value="bold" label="bold"></el-option>
						<el-option value="bolder" label="bolder"></el-option>
						<el-option value="lighter" label="lighter"></el-option>
						<el-option value="100" label="100"></el-option>
						<el-option value="200" label="200"></el-option>
						<el-option value="300" label="300"></el-option>
						<el-option value="400" label="400"></el-option>
						<el-option value="500" label="500"></el-option>
						<el-option value="600" label="600"></el-option>
						<el-option value="700" label="700"></el-option>
						<el-option value="800" label="800"></el-option>
						<el-option value="900" label="900"></el-option>
					</el-select>
				</div>
			</div>
			<div class="properties-block">
				<span class="block-name">字间距</span>
				<div>
					<el-input-number v-model="options.letterSpacing" :min="0" :max="50"
						controls-position="right"></el-input-number>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script setup>
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
		text: '',
		fontFamily: 'Arial',
		fontSize: 12,
		fontStyle: 'normal',
		fontWeight: 'normal',
		letterSpacing: 0,
		fill: '#FFFFFF',
	})
	const textInstance = ref()

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
				if (value.scene.loaded && value.scene.text) {
					textInstance.value = value.scene.text
					options.text = value.scene.text.text
					options.fill = value.scene.text.style.fill
					options.fontSize = value.scene.text.style.fontSize
					options.fontFamily = value.scene.text.style.fontFamily
					options.fontStyle = value.scene.text.style.fontStyle
					options.fontWeight = value.scene.text.style.fontWeight
					options.letterSpacing = value.scene.text.style.letterSpacing
				} else setTimeout(() => read(), 100)
			}
			read()
		}
	}, {
		immediate: true
	})

	watch(options, (value) => {
		const unit = layersDataStore.activeUnit;
		unit.resource.name = value.text;
		unit.scene.text.text = value.text;
		unit.scene.text.style.fill = value.fill;
		unit.scene.text.style.fontSize = value.fontSize;
		unit.scene.text.style.fontFamily = value.fontFamily;
		unit.scene.text.style.fontStyle = value.fontStyle;
		unit.scene.text.style.fontWeight = value.fontWeight;
		unit.scene.text.style.letterSpacing = value.letterSpacing;
	})
</script>

<style scoped>
	.el-collapse {
		border-top: none;
	}
</style>