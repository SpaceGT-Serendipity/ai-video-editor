<template>
	<el-dialog v-model="dialogVisible" title="进度详情" width="500" align-center center @close="onClose">
		<el-scrollbar max-height="50vh">
			<el-timeline>
				<el-timeline-item v-for="step in steps" :key="step.name" :timestamp="step.name" :type="step.type"
					:color="step.color" :hollow="step.hollow">
					{{step.label}}
				</el-timeline-item>
			</el-timeline>
		</el-scrollbar>
		<template #footer>
			<div class="dialog-footer">
				<div>
					<div class="reference-node" style="background-color:#409eff;"> </div>
					<el-text class="mx-1">已完成</el-text>
				</div>
				<div>
					<div class="reference-node" style="background-color:#ffffff; border:2px solid #409eff;"> </div>
					<el-text class="mx-1">进行中</el-text>
				</div>
				<div>
					<div class="reference-node"> </div>
					<el-text class="mx-1">未开始</el-text>
				</div>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		getBatchStepInfo,
		steps as defaultSteps
	} from '../../api/batch.js'

	const dialogVisible = ref(false)
	const steps = ref([])
	let intervalId = null;


	const open = (id) => {
		steps.value = defaultSteps.map(item => {
			return {
				...item
			}
		})
		dialogVisible.value = true
		load(id)
		intervalId = setInterval(() => {
			load(id)
		}, 2000)
	}
	const onClose = () => {
		if (intervalId) {
			clearInterval(intervalId)
			intervalId = null
		}
	}
	const load = async (id) => {
		const result = await getBatchStepInfo(id)
		result.forEach(item => {
			const step = steps.value.find(step => step.name == item.stepName)
			step.startTime = item.startTime
			step.endTime = item.endTime
			step.status = item.status
			step.exitMessage = item.exitMessage
			if (item.status == 'COMPLETED') {
				step.type = 'primary'
				step.hollow = false
			} else
			if (item.status == 'STARTED') {
				step.type = 'primary'
				step.hollow = true
			}
		})
	}

	defineExpose({
		open
	})
</script>

<style scoped>
	.dialog-footer {
		display: flex;
		justify-content: space-evenly;
	}

	.dialog-footer>div {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.reference-node {
		align-items: center;
		background-color: #414243;
		border-color: #414243;
		border-radius: 50%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		height: 12px;
		width: 12px;
	}
</style>