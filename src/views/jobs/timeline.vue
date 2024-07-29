<template>
	<el-dialog v-model="dialogVisible" title="进度详情" width="500" align-center center>
		<el-scrollbar max-height="50vh">
			<el-timeline>
				<el-timeline-item v-for="step in steps" :key="step.name" :timestamp="step.startTime" :type="step.type"
					:color="step.color" :hollow="step.hollow">
					{{step.name}}
				</el-timeline-item>
			</el-timeline>
		</el-scrollbar>
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

	const activities = [{
			content: 'Event start',
			timestamp: '2018-04-15',
		},
		{
			content: 'Approved',
			timestamp: '2018-04-13',
		},
		{
			content: 'Success',
			timestamp: '2018-04-11',
		},
	]

	const open = async (id) => {
		steps.value = defaultSteps.map(item => {
			return {
				...item
			}
		})
		dialogVisible.value = true
		const result = await getBatchStepInfo(id)
		result.forEach(item => {
			const step = steps.value.find(step => step.name == item.stepName)
			step.startTime = item.startTime
			step.endTime = item.endTime
			step.status = item.status
			step.exitMessage = item.exitMessage
			if (item.status == 'COMPLETED')
				step.color = '#0bbd87'
			else
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

<style>
</style>