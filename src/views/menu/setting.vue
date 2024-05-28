<template>
	<el-dialog v-model="dialogVisible" title="项目设置" width="500" center align-center>
		<el-button text type="primary" @click="saveLocal">
			<el-icon>
				<font-awesome-icon icon="fa-regular fa-floppy-disk" />
			</el-icon>
			保存项目到本地
		</el-button>
		<el-upload class="upload" :show-file-list="false" action :auto-upload="false" multiple accept=".ai"
			:on-change="handleUploadProjectFile">
			<el-button text type="primary">
				<el-icon>
					<font-awesome-icon icon="fa-solid fa-upload" />
				</el-icon>
				加载本地项目
			</el-button>
		</el-upload>
	</el-dialog>
</template>
<script setup>
	import {
		ref
	} from 'vue'
	import {
		saveAs
	} from 'file-saver';
	import {
		useLayersDataStore
	} from '../../store/layers.js'
	import {
		useGlobalStore
	} from '../../store/global.js'
	import CryptoJS from 'crypto-js'
	import {
		ElLoading
	} from 'element-plus'


	const layersDataStore = useLayersDataStore()
	const globalStore = useGlobalStore()
	const dialogVisible = ref(false)

	const secretKey = 'spacegt.com'

	const handleUploadProjectFile = (file) => {
		dialogVisible.value = false
		const reader = new FileReader()
		reader.readAsText(file.raw)
		reader.onload = async (text) => {
			const loading = ElLoading.service({
				lock: true,
				text: '加载本地项目,请耐心等待...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			const plaintext = CryptoJS.AES.decrypt(text.target.result, secretKey).toString(CryptoJS.enc.Utf8)
			await layersDataStore.loadSerializationConfiguration(JSON.parse(plaintext))
			loading.close()
		}
	}

	const open = () => {
		dialogVisible.value = true
	}

	const saveLocal = () => {
		const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(layersDataStore.layersSerialize), secretKey).toString()
		var blob = new Blob([ciphertext], {
			type: 'text/plain'
		});
		saveAs(blob, globalStore.title + ".ai");
	}

	defineExpose({
		open
	})
</script>
<style scoped>
	.el-icon {
		margin-right: 10px;
	}
</style>