<template>
	<el-upload class="el-upload" action :auto-upload="false" :multiple="multiple" :show-file-list="showFileList"
		:on-change='onChange' :accept="accept">
		<slot></slot>
	</el-upload>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		ElNotification
	} from 'element-plus';
	import {
		upload
	} from '../api/file.js'

	const props = defineProps({
		path: String,
		accept: String,
		showFileList: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		}
	})


	const emit = defineEmits(['upload-before', 'change'])

	const onChange = async (e) => {
		emit('upload-before')
		try {
			const res = await upload(e.raw, props.path)
			ElNotification({
				title: '上传成功',
				type: 'success',
			})
			emit('change', res)
		} catch (e) {
			ElNotification({
				title: '上传失败',
				type: 'error',
			})
		}
	}
</script>

<style scoped>
	.el-upload {
		display: inline-flex;
		justify-content: flex-start;
		align-items: flex-start;
		/* justify-content: center;
		align-items: center; */
		cursor: pointer;
		outline: none;
		vertical-align: middle;
	}
</style>