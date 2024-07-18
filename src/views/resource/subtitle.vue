<template>
	<div class="subtitle">
		<div class="header">
			<span>字幕</span>
			<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".srt"
				:on-change="handleUpload">
				<el-button icon="Plus">点击上传字幕文件(.srt)</el-button>
				<el-tooltip class="box-item" effect="dark" content="支持批量上传文件,单文件不超过10MB" placement="top">
					<el-button link>
						<el-icon>
							<InfoFilled />
						</el-icon>
					</el-button>
				</el-tooltip>
			</el-upload>
		</div>
		<el-scrollbar>
			<div class="list">

			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		download
	} from '../../api/file.js'
	import axios from '../../axios/index.js'
	import {
		fromString
	} from '../../utils/srt.js'

	const handleUpload = async (file) => {
		const reader = new FileReader()
		reader.readAsText(file.raw)
		reader.onload = (res) => {
			console.log(fromString(reader.result))
		}
	}
</script>

<style scoped>
	.header {
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>