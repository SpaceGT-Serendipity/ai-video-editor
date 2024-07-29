<template>
	<el-dialog v-model="dialogVisible" :title="model" width="500" align-center>
		<div v-if="model=='短信登录'" class="login-from" v-loading="loading">
			<el-input v-model="phone" placeholder="请输入手机号" size="large" maxlength="11" show-word-limit />
			<el-input v-model="code" placeholder="验证码" size="large" maxlength="6" show-word-limit>
				<template #append>
					<el-button v-if="time==0" :disabled="phone.length<11" @click="sendCode">发送验证码</el-button>
					<span v-else>{{time}}s</span>
				</template>
			</el-input>
			<el-button size="large" :disabled="!checkbox||phone==''||code==''" @click="submit">登录</el-button>
			<div style="display: flex;justify-content: space-between; width: 100%;">
				<el-checkbox v-model="checkbox">
					<div class="checkbox">
						阅读并接受
						<el-button link type="info">用户协议</el-button>
						和
						<el-button link type="info">隐私政策</el-button>
					</div>
				</el-checkbox>
				<el-button link @click="model='密码登录'" icon="Switch">密码登录</el-button>
			</div>
		</div>
		<div v-if="model=='密码登录'" class="login-from" v-loading="loading">
			<el-input v-model="account" placeholder="请输入账号" size="large" maxlength="20" show-word-limit />
			<el-input v-model="password" placeholder="请输入密码" size="large" show-password />
			<el-button size="large" :disabled="!checkbox||account==''||password==''" @click="submit">登录</el-button>
			<div style="display: flex;justify-content: space-between; width: 100%;">
				<el-checkbox v-model="checkbox">
					<div class="checkbox">
						阅读并接受
						<el-button link type="info">用户协议</el-button>
						和
						<el-button link type="info">隐私政策</el-button>
					</div>
				</el-checkbox>
				<el-button link @click="model='短信登录'" icon="Switch">短信登录</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
	import {
		ElNotification
	} from 'element-plus'
	import {
		ref
	} from 'vue'
	import {
		sendCode as messageSendCode
	} from '../api/message.js'
	import {
		loginPhone,
		loginAccount
	} from '../api/account.js'

	const emit = defineEmits(['success', 'failure'])
	const dialogVisible = ref(false)
	const model = ref('短信登录')
	const phone = ref('')
	const code = ref('')
	const account = ref('')
	const password = ref('')
	const checkbox = ref(false)
	const time = ref(0)
	const loading = ref(false)

	const sendCode = async () => {
		time.value = 60
		const res = await messageSendCode(phone.value)

		if (res) {
			const intervalId = setInterval(() => {
				time.value--;
				if (time.value == 0) clearInterval(intervalId)
			}, 1000)
			ElNotification({
				title: '信息',
				message: '短信发送成功。',
				type: 'success',
			})
		} else {
			ElNotification({
				title: '信息',
				message: '短信发送失败。',
				type: 'warning',
			})
		}
	}
	const submit = async () => {
		loading.value = true
		try {
			if (model.value == '短信登录') {
				const res = await loginPhone(phone.value, code.value)
				emit('success', res)
			} else
			if (model.value == '密码登录') {
				const res = await loginAccount(account.value, password.value)
				emit('success', res)
			}
		} catch (e) {}
		loading.value = false
		dialogVisible.value = false
	}
	const open = () => {
		dialogVisible.value = true
	}
	defineExpose({
		open
	})
</script>

<style scoped>
	.login-from {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
		padding: 10px 20px;
	}

	.login-from>.el-button {
		width: 100%;
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.checkbox * {
		margin: 0;
	}
</style>