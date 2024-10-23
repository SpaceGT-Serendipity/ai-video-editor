<template>
	<el-page-header icon="ArrowLeft" @back="onBack">
		<template #content>
			<span> AI 视频编辑器 </span>
			<slot></slot>
		</template>
	</el-page-header>
	<div class="project-name">
		<el-button v-if="editTitle==false" text @click="editTitle = true">
			{{globalStore.title}}
			<el-icon>
				<Edit />
			</el-icon>
		</el-button>
		<el-input v-else v-model="globalStore.title" @change="onTitleChange">
			<template #suffix>
				<el-icon>
					<Edit />
				</el-icon>
			</template>
		</el-input>
	</div>
	<div class="button-group">
		<SwitchTheme></SwitchTheme>
		<el-button type="primary" icon="Monitor" @click="generateStore.compound()">合成视频</el-button>
		<el-button text type="primary" icon="Collection" @click="recordStore.saveProject()">保存项目</el-button>
		<el-button v-if="accountStore.id==null" round @click="loginref.open()">登录</el-button>
		<el-popover v-else placement="bottom" :width="300" trigger="hover">
			<template #reference>
				<div style="display: flex; align-items: center; gap: 5px;">
					<el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="accountStore.avatar">
						<template #error>
							<img src="/images/avatar.png" style="width: 100%; height: 100%;" />
						</template>
					</el-image>
					<el-text round>{{accountStore.name}}</el-text>
				</div>
			</template>
			<template #default>
				<div class="profile-card">
					<div style="display: flex; gap: 10px;justify-content: space-between;">
						<!-- <el-image style="width: 60px; height: 60px;flex:0 0 60px;border-radius: 50%;"
							:src="accountStore.avatar">
							<template #error>
								<img src="/images/avatar.png" style="width: 100%; height: 100%;" />
							</template>
						</el-image> -->
						<div class="name">
							<span style="font-size: 14px;color: #666; overflow: hidden;">用户名:
								{{accountStore.account}}</span>
						</div>
					</div>
					<el-divider style="margin: 10px 0;" />
					<el-popconfirm title="是否退出登录?" @confirm="accountStore.logout()">
						<template #reference>
							<el-button text size="large">
								<el-icon>
									<font-awesome-icon icon="fa-solid fa-right-from-bracket" />
								</el-icon>
								<span>退出登录</span>
							</el-button>
						</template>
					</el-popconfirm>
				</div>
			</template>
		</el-popover>
	</div>
	<Login ref="loginref" @success="onSuccess"></Login>
</template>

<script setup>
	import SwitchTheme from '../components/switch-theme.vue'
	import Login from '../components/login.vue'
	import {
		ref,
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	import {
		useAccountStore
	} from '../store/account.js'
	import {
		useGlobalStore
	} from '../store/global.js'
	import {
		useRecordStore
	} from '../store/record.js'
	import {
		useGenerateStore
	} from '../store/generate.js'

	const recordStore = useRecordStore()
	const generateStore = useGenerateStore()
	const router = useRouter()
	const globalStore = useGlobalStore()
	const accountStore = useAccountStore()
	const loginref = ref()
	const editTitle = ref(false)

	const onSuccess = (account) => {
		accountStore.id = account.id
		accountStore.name = account.name
		accountStore.account = account.account
		accountStore.email = account.email
		accountStore.authorities = account.authorities
		accountStore.avatar = account.avatar
	}
	const onBack = () => {
		window.location.href = import.meta.env.VITE_APP_BACK_PATH;
	}
	const onTitleChange = () => {
		editTitle.value = false
	}
	
</script>

<style scoped>
	.el-page-header {
		color: var(--el-text-color-primary);
	}


	.project-name .el-button:hover .el-icon {
		opacity: 1;
	}

	.project-name .el-button .el-icon {
		opacity: 0;
		transition: opacity 0.2s;
	}

	.button-group {
		display: flex;
		gap: 10px;
		justify-content: end;
	}

	.button-group .switch-theme {
		margin-right: 20px;
	}
</style>

<style scoped>
	.profile-card {
		padding: 15px;
		display: flex;
		flex-direction: column;
	}

	.profile-card .name {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 16px;
		flex: 1 1 0%;
		overflow: hidden;
	}

	.profile-card .edit {
		flex: 0 0 32px;
	}

	.profile-card span {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.profile-card .el-button {
		margin: 0;
	}
</style>