<template>
	<div>
		<div>
			<h2 class="title">
				创建新视频
			</h2>
			<div class="create_new_video">
				<span @click="router.push('/editor')">
					<div class="left">
						<div class="subtitle">
							新建轨道编辑视频
							<img class="animate__animated animate__headShake animate__infinite animate__slow"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAAAXNSR0IArs4c6QAAARVJREFUSEvF1jsKwkAQBuAZHyB4AUG8gdpIUmsnm4igYGFlZWXpAXIAGwURKysL0c7aywjBA0iKYMhIIqiFkNnsEtMtmck3CfuzQcj4wow9UAItazknyhVMs75wnE7AGT41KMS6AhDcIgQRj4bRGHPQ1GAECbE8AcBQBlUCp9Nt0XX9IxH1uagSGCGyqDIoi2oBZVBtIBd9g5PJruR5ZeUBfP9eCAJvD0C9XxspBixrdSCiESe46WrwbJqNQZTTGBRidQWgWrqHJXchwsUwmt03aNubKsCjHYaUS25PqgjziPkZEbVen/SDxeukdpn7nExqAzmYtjfkYlpAGUwZlMWUwUyPp78cwJn+Ysjk87tWWw65AzwBwNDNGeBLqssAAAAASUVORK5CYII="
								alt="icon">
						</div>
						<div class="describe">支持视频剪辑、特效转场</div>
					</div>
					<div class="examples">
						<img src="https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/make_new_video_bg.337a0798.png"
							alt="">

					</div>
				</span>
				<span  @click="router.push('/console/template')">
					<div class="right">
						<div class="subtitle">使用模板创建视频
							<img class="animate__animated animate__headShake animate__infinite animate__slow"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAAAXNSR0IArs4c6QAAARVJREFUSEvF1jsKwkAQBuAZHyB4AUG8gdpIUmsnm4igYGFlZWXpAXIAGwURKysL0c7aywjBA0iKYMhIIqiFkNnsEtMtmck3CfuzQcj4wow9UAItazknyhVMs75wnE7AGT41KMS6AhDcIgQRj4bRGHPQ1GAECbE8AcBQBlUCp9Nt0XX9IxH1uagSGCGyqDIoi2oBZVBtIBd9g5PJruR5ZeUBfP9eCAJvD0C9XxspBixrdSCiESe46WrwbJqNQZTTGBRidQWgWrqHJXchwsUwmt03aNubKsCjHYaUS25PqgjziPkZEbVen/SDxeukdpn7nExqAzmYtjfkYlpAGUwZlMWUwUyPp78cwJn+Ysjk87tWWw65AzwBwNDNGeBLqssAAAAASUVORK5CYII="
								alt="icon">
						</div>
						<div class="describe">选择适合的模板,减少试错成本</div>
					</div>
					<div class="examples">
						<img src="https://tc-nj-weta365-pub-cdn.weta365.com/qimiaoyuan-prod/assets/qimiao_video_tool_bg.43e459cb.png"
							alt="">
					</div>
				</span>
			</div>
		</div>
		<div style="margin-top: 40px;">
			<h2 class="title">
				最近创作内容
			</h2>
			<div class="draft">
				<el-empty description="暂无创作内容" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		useRouter
	} from 'vue-router'
	
	const router = useRouter()
</script>

<style scoped>
	.title {
		font-weight: 600;
	}

	.create_new_video {
		display: flex;
		gap: 30px;
	}

	.create_new_video .left,
	.create_new_video .right {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.create_new_video span {
		flex: 1;
		display: flex;
		justify-content: space-between;
		padding: 15px 20px;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s;
	}

	.create_new_video span:nth-child(1) {
		background-image: linear-gradient(to right, #DFE3FF, #C8CAFF);
	}

	.create_new_video span:nth-child(2) {
		background-image: linear-gradient(to right, #DCF0FF, #BAD0EF);
	}

	.create_new_video span .subtitle {
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.create_new_video span .subtitle img {
		width: 14px;
		height: 14px;
		margin-left: 10px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.create_new_video span:hover {
		box-shadow: 0 0 10px 0px #88888888;
	}

	.create_new_video span:nth-child(1):hover {
		background-image: linear-gradient(to right, #dadef8, #c2c5f7);
	}

	.create_new_video span:nth-child(2):hover {
		background-image: linear-gradient(to right, #d4e7f5, #b4c9e6);
	}

	.create_new_video span:hover .subtitle {
		text-decoration: underline;
	}

	.create_new_video span:hover .subtitle img {
		text-decoration: underline;
		opacity: 1;
	}

	.create_new_video .describe {
		font-size: 12px;
		opacity: 0.7;
	}

	.create_new_video .examples {
		width: 40%;
		position: relative;
	}

	.create_new_video .examples img {
		width: 100%;
		position: absolute;
		top: -23px;
	}
</style>