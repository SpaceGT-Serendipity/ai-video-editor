<template>
	<el-dialog v-model="recordStore.dialogVisible" title="项目管理" top="10vh" width="1100" align-center
		:before-close="handleClose">
		<div v-loading="loading" element-loading-text="正在处理,请勿操作..." style="padding: 10px;min-height: 500px;">
			<el-table :data="list">
				<el-table-column prop="name" label="项目名称" />
				<el-table-column prop="createTime" label="创建时间" />
				<el-table-column prop="updateTime" label="修改时间" />
				<el-table-column width="220px" label="操作">
					<template #default="scope">
						<el-button link icon="Delete" @click="del(scope.row.id)">删除</el-button>
						<el-popover :disabled="!recordStore.dialogVisible" placement="bottom" :width="200"
							trigger="click" @show="loadLog(scope.row.id)" @before-enter="logs = []; logs_loading = true;">
							<template #reference>
								<el-button link>历史</el-button>
							</template>
							<div style="display: flex;flex-direction: column; min-height: 50px;"
								v-loading="logs_loading">
								<el-button text v-for="log in logs" style="margin-left: 0;"
									@click="importProject(scope.row.id,log.id); ">{{log.createTime}}</el-button>
							</div>
						</el-popover>
						<el-button @click="importProject(scope.row.id)">载入</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-dialog>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useAccountStore
	} from '../../store/account.js'
	import {
		useRouter
	} from 'vue-router'
	import {
		list as projectList,
		logList,
		logNewest,
		del as projectDel
	} from '../../api/project.js'
	import {
		useRecordStore
	} from '../../store/record.js'

	const router = useRouter()
	const accountStore = useAccountStore()
	const recordStore = useRecordStore()
	const loading = ref(false)
	const list = ref([])
	const logs = ref([])
	const logs_loading = ref(false)

	const importProject = (pid, logid) => {
		if (logid) {
			router.push({
				path: `/editor/${pid}/${logid}`
			})
		} else {
			router.push({
				path: `/editor/${pid}`
			})
		}
	}
	const del = async (pid) => {
		await projectDel(pid)
		load()
	}
	const load = async () => {
		if (!accountStore.account) return;
		list.value = await projectList();
	}
	const loadLog = async (id) => {
		
		logs.value = await logList(id);
		logs_loading.value = false;
	}

	const open = () => {
		recordStore.dialogVisible = true
		load()
	}

	const handleClose = () => {
		recordStore.dialogVisible = false
	}

	onMounted(() => {
		load()
	})

	defineExpose({
		open
	})
</script>
<style>
	.video-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.video-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.video-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 200px;
		height: 150px;
		text-align: center;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 17px;
		justify-content: start;
	}
</style>