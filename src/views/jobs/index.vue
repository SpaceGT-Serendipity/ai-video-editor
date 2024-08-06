<template>
	<el-dialog v-model="dialogVisible" title="作业进度" width="1000" center align-center @close="onClose">
		<el-skeleton style="width: 100%;" :loading="loading" animated>
			<template #template>
				<div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
					<el-skeleton-item v-for="i in 3" variant="rect" style="width: 100%; height: 180px;" />
				</div>
			</template>
			<template #default>
				<ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto;max-height: 70vh;">
					<el-empty v-if="tableData.length==0" description="暂无数据" />
					<li v-else v-for="item in tableData" :key="item.id" class="infinite-list-item">
						<el-card :class="{'started':item.status=='STARTED'}">
							<template #header>
								<div style="display: flex; justify-content: space-between;">
									<el-text size="large">{{item.title}}</el-text>
									<el-button type="primary" plain v-show="item.status=='COMPLETED'"
										@click="onShowResult(item.id)">查看结果</el-button>
								</div>
							</template>
							<div style="display: flex;flex-direction: column; gap: 30px;padding: 10px;">
								<div style="display: flex; justify-content: space-around; text-align: center;">
									<div>
										<div class="el-statistic__head">
											<el-icon>
												<Calendar />
											</el-icon>
											创建时间
										</div>
										<div class="el-statistic__number">
											{{useDateFormat(item.createTime, 'YYYY-MM-DD HH:mm:ss').value}}
										</div>
									</div>
									<div v-if="item.startTime">
										<div class="el-statistic__head">
											<el-icon>
												<Calendar />
											</el-icon>
											开始时间
										</div>
										<div class="el-statistic__number">
											{{useDateFormat(item.startTime, 'YYYY-MM-DD HH:mm:ss').value}}
										</div>
									</div>
									<div v-if="item.endTime">
										<div class="el-statistic__head">
											<el-icon>
												<Calendar />
											</el-icon>
											结束时间
										</div>
										<div class="el-statistic__number">
											{{useDateFormat(item.endTime, 'YYYY-MM-DD HH:mm:ss').value}}
										</div>
									</div>
									<div v-if="item.status=='WAITING'">
										<div class="el-statistic__head">
											<el-icon>
												<Calendar />
											</el-icon>
											队列中
										</div>
										<div class="el-statistic__number">
											第 {{item.waitingNumber==0?'?':item.waitingNumber}} 位
										</div>
									</div>
									<div>
										<div class="el-statistic__head">
											<el-icon>
												<Calendar />
											</el-icon>
											状态
										</div>
										<div class="el-statistic__number">
											<status-vue :status="item.status"></status-vue>
										</div>
									</div>
								</div>
								<el-progress v-if="item.status=='STARTED'" :percentage="item.progress" striped
									striped-flow :duration="100">
									<div style="display: flex; align-items: center; gap: 10px;">
										{{item.progress}}%
										<el-button link type="primary"
											@click="timeLineVueRef.open(item.batchJobId)">查看详细进度</el-button>
									</div>
								</el-progress>
								<el-alert v-if="item.message" :title="item.message" type="warning" :closable="false"
									show-icon />
							</div>
						</el-card>
					</li>
				</ul>
			</template>
		</el-skeleton>
		<timeline-vue ref="timeLineVueRef"></timeline-vue>
	</el-dialog>
</template>
<script setup>
	import GLightbox from 'glightbox';
	import statusVue from './status.vue'
	import timelineVue from './timeline.vue'
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		useLayersDataStore
	} from '../../store/layers.js'
	import {
		useGlobalStore
	} from '../../store/global.js'
	import {
		ElLoading
	} from 'element-plus'
	import {
		selectOwn,
		result
	} from '../../api/reactive-jobs.js'
	import {
		useDateFormat,
		useNow
	} from '@vueuse/core'
	import {
		getBatchStepInfo,
		steps as defaultSteps,
		listByIds
	} from '../../api/batch.js'

	const layersDataStore = useLayersDataStore()
	const globalStore = useGlobalStore()
	const dialogVisible = ref(false)
	const currentPage = ref(0)
	const pageSize = ref(10)
	const tableData = ref([])
	const loading = ref(true)
	const timeLineVueRef = ref()
	let intervalId = null;
	
	const open = async () => {
		loading.value = true
		dialogVisible.value = true
		currentPage.value = 0
		tableData.value = []
		await load()
		loading.value = false
		intervalId = setInterval(() => {
			updateStatus()
		}, 2000)
	}

	const onShowResult = async (jobId) => {
		const res = await result(jobId)
		const myGallery = GLightbox({
			elements: [{
				'href': res.url,
				'type': 'video',
			}],
			autoplayVideos: true,
		});
		myGallery.open();
	}
	const load = async () => {
		currentPage.value++;
		const res = await selectOwn(currentPage.value, pageSize.value)
		tableData.value.push(...res)
	}
	const updateStatus = async () => {
		let ids = []
		tableData.value.forEach(item => {
			if (!['COMPLETED', 'FAILED'].includes(item.status)) {
				ids.push(item.id)
			}
			if (item.status == 'STARTED') {
				getBatchStepInfo(item.batchJobId).then(res => {
					item.progress = parseInt(res.length / defaultSteps.length * 100)
				})
			}
		})
		if (ids.length > 0) {
			const res = await listByIds(ids.join(','))
			res.forEach(item => {
				const job = tableData.value.find(e => e.id == item.id)
				Object.assign(job, item);
			})
		}
	}
	onMounted(() => {
		
	})
	onUnmounted(() => {
		onClose()
	})
	const onClose = () => {
		if (intervalId) {
			clearInterval(intervalId)
			intervalId = null
		}
	}
	defineExpose({
		open
	})
</script>

<style scoped>
	.el-icon {
		margin-right: 10px;
	}

	.active-page {
		display: grid;
		justify-content: center;
		padding-top: 15px;
	}

	.infinite-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 20px;
		margin: 0;
		list-style: none;
	}

	.countdown-footer {
		margin-top: 8px;
	}

	.el-card.started {
		border: 4px dashed #00aa00;
		box-sizing: border-box;
	}

	.el-statistic__head {
		display: inline-flex;
		align-items: center;
		font-size: 12px;
		line-height: 20px;
		margin-bottom: 10px;
	}

	.el-statistic__number {
		font-size: 20px;
		font-weight: 400;
	}
</style>