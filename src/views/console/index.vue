<template>
	<el-container>
		<el-header>
			<header-vue></header-vue>
		</el-header>
		<el-container direction="vertical">
			<div class="tabs-bg">
				<div class="tabs">
					<div class="tab" :class="{'active':active==item.path}" v-for="item in tabs" :key="item.path"
						@click="active=item.path;router.push(item.path)">
						<div>
							<el-image :src="item.url"> </el-image>
						</div>
						{{item.title}}
					</div>
				</div>
			</div>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
	<svg-library v-show="false"></svg-library>
</template>

<script setup>
	import SvgLibrary from '../../components/svg-library.vue'
	import headerVue from "./header.vue"
	import {
		ref,
		reactive,
		watch,
		onMounted
	} from 'vue'
	import {
		useRoute,
		useRouter
	} from 'vue-router'
	import {
		useGlobalStore
	} from '../../store/global.js'

	const globalStore = useGlobalStore()
	const route = useRoute()
	const router = useRouter()
	const tabs = reactive([{
		title: '创作空间',
		path: '/console/create_new_video',
		url: 'https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/screate.50706eab.png'
	}, {
		title: '我的声音',
		path: '/console/audio',
		url: 'https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/srubbish.1649ef12.png'
	}, {
		title: '我的分身',
		path: '/console/avatar',
		url: 'https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/sfoliation.5cefc522.png'
	}, {
		title: '我的微课',
		path: '/console/video',
		url: 'https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/sshop.80279a91.png'
	}, {
		title: '模板商店',
		path: '/console/template',
		url: 'https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/stempShop.a33ba9e8.png'
	}])
	const active = ref('/console/create_new_video')

	watch(() => route.fullPath, () => active.value = route.fullPath, {
		immediate: true
	})

	onMounted(() => {
		const html = document.querySelector('html')
		html.classList.remove('dark')
	})
</script>

<style scoped>
	.el-container {
		height: 100%;
	}

	.el-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #EBF8FF;
	}

	.el-main {
		width: 1300px;
		padding: 20px 0 20px 0;
		margin: auto;
	}

	.tabs-bg {
		background-color: #EBF8FF;
	}

	.tabs {
		width: 1300px;
		height: 150px;
		margin: auto;
		display: flex;
		justify-content: space-evenly;
	}

	.tabs .tab {
		margin-top: 20px;
		width: 25%;
		height: 130px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		filter: opacity(0.7);
		cursor: pointer;
		transition: all 0.3s;
	}

	.tabs .tab:hover {
		filter: none;
	}

	.tabs .tab.active {
		background-color: #fff;
		border-radius: 20px 20px 0 0;
		color: #006eff;
		font-weight: 700;
		filter: none;
	}

	.tabs .el-image {
		width: 60px;
	}
</style>