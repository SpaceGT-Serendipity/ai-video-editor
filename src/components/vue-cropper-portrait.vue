<template>
	<vue-cropper style="width: 100%; height: 100%;" :class="{'cropper-circular':graphicsState=='circular'}"
		ref="cropper" :img="img" :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info"
		:canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
		:autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" :fixed="option.fixed"
		:fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
		:original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full"
		:enlarge="option.enlarge" :mode="option.mode" @realTime="handleRealTime">
	</vue-cropper>
</template>

<script setup>
	import 'vue-cropper/dist/index.css'
	import {
		VueCropper
	} from "vue-cropper";
	import {
		ref,
		reactive
	} from 'vue'

	const props = defineProps({
		img: String,
		graphicsState: {
			type: String,
			default () {
				return 'square' //设置裁剪图形形状 square:方形、circular:圆形(默认：square(方形))
			}
		}

	})
	const emit = defineEmits(['realTime'])
	const cropper = ref()
	const option = reactive({
		img: props.src, // 裁剪图片的地址 url 地址, base64, blob
		outputSize: 1, // 裁剪生成图片的质量
		outputType: 'png', // 裁剪生成图片的格式 jpeg, png, webp
		info: true, // 裁剪框的大小信息
		canScale: false, // 图片是否允许滚轮缩放
		autoCrop: true, // 是否默认生成截图框
		autoCropWidth: 200, // 默认生成截图框宽度
		autoCropHeight: 200, // 默认生成截图框高度
		fixedBox: false, // 固定截图框大小 不允许改变
		fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
		fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
		canMove: false, // 上传图片是否可以移动
		canMoveBox: true, // 截图框能否拖动
		original: false, // 上传图片按照原始比例渲染
		centerBox: true, // 截图框是否被限制在图片里面
		infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
		full: true, // 是否输出原图比例的截图
		enlarge: '1', // 图片根据截图框输出比例倍数
		mode: 'contain' // 图片默认渲染方式 contain , cover, 100px, 100% auto
	})

	const handleRealTime = async (data) => {
		emit('realTime', data)
	}

	const getCropBlob = () => {
		return new Promise((resolve, reject) => {
			cropper.value.getCropBlob(async (data) => {
				if (props.graphicsState == 'circular')
					data = await drawAndClipImage(data);
				resolve(data)
			});
		})
	}

	const drawAndClipImage = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = e => {
				const src = e.target.result
				const image = new Image()
				image.src = src
				image.onload = () => {
					const canvas = document.createElement('canvas')
					const width = image.width
					const height = image.height
					canvas.width = width
					canvas.height = height
					// 计算圆形图片的圆心及图片半径
					const circle = {
						x: width / 2,
						y: height / 2,
						r: width / 2
					}
					const context = canvas.getContext('2d')
					context.clearRect(0, 0, width, height)
					// 在canvas开始绘制前填充白色透明背景并设置透明度，用以清除图片裁剪后透明区域变成黑色的问题
					context.fillStyle = 'rgba(255, 255, 255, 0)'
					context.fillRect(0, 0, width, height)

					// 开始路径画圆，剪切处理
					context.save() // 保存当前canvas的状态
					context.beginPath()
					context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2,
						false) // 创建弧/曲线(用于创建圆形或部分圆)
					context.clip() // 从原始画布剪切任意形状和尺寸的区域
					context.drawImage(image, 0, 0)
					context.restore() // 返回之前保存过的路径状态和属性，恢复状态

					// 将canvas图片转换成 blob数据
					canvas.toBlob(blob => resolve(blob))
				}
				image.onerror = err => reject()
			}
			reader.onerror = err => reject()
		})
	}

	defineExpose({
		getCropBlob
	})
</script>

<style>
	.cropper-circular .cropper-face,
	.cropper-circular .cropper-view-box {
		border-radius: 50%;
	}
</style>