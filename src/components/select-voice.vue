<template>
	<el-dialog v-model="dialogVisible" title="选择声音模型" width="710" align-center>
		<div class="select-voice">
			<div class="button-group">
				<el-button text :type="category=='all'?'primary':''" @click="category='all'">全部</el-button>
				<el-button text :type="category=='edge'?'primary':''" @click="category='edge'">标准音色</el-button>
				<el-button text :type="category=='rvc'?'primary':''" @click="category='rvc'">RVC 专属音色</el-button>
				<el-button text :type="category=='gpt-sovits'?'primary':''" @click="category='gpt-sovits'">
					GPT-Sovits 专属音色
				</el-button>
			</div>
			<el-scrollbar height="40vh">
				<div class="list">
					<div class="card" :class="{'active':selected==item}" v-for="item in listByCategory"
						@click="selected=item">
						<el-image>
							<template #placeholder>
								<div class="placeholder">
									<el-icon size="90">
										<svg aria-hidden="true">
											<use xlink:href="#undraw_happy_music_g6wc"></use>
										</svg>
									</el-icon>
								</div>
							</template>
							<template #error>
								<div class="placeholder">
									<el-icon size="90">
										<svg aria-hidden="true">
											<use xlink:href="#undraw_happy_music_g6wc"></use>
										</svg>
									</el-icon>
								</div>
							</template>
						</el-image>
						<p>{{item.name}}</p>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取消</el-button>
				<el-button size="small" type="primary" :disabled="selected==null" @click="onChange">
					确认
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import {
		loadVoices
	} from '../api/audio.js'

	const emit = defineEmits(['change'])
	const dialogVisible = ref(false)
	const category = ref('all')
	const selected = ref()
	const list = ref([])
	const listByCategory = computed(() => {
		if (category.value == 'all')
			return list.value;
		else
			return list.value.filter(item => item.type == category.value);
	})

	const onChange = () => {
		emit('change', selected.value)
		dialogVisible.value = false
	}
	const open = () => {
		dialogVisible.value = true
	}
	const load = async () => {
		const res = await loadVoices()
		list.value = res
	}

	onMounted(() => {
		load()
	})

	defineExpose({
		open
	})
</script>
<style scoped>
	.select-voice {
		display: flex;
		flex-direction: column;
	}

	.el-scrollbar {
		margin-top: 20px;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.list .card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		opacity: 0.9;
		transition: opacity 0.2s;
	}

	.list .card:hover {
		opacity: 1;
	}

	.list .card.active .el-image {
		border: 1px solid #308DFF;
	}

	.list .card .el-image {
		border: 1px solid #0000;
		width: 160px;
		height: 100px;
		background-color: var(--el-bg-dark-color);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;

	}

	.list .card p {
		margin-top: 5px;
	}

	.placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>