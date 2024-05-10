/**
 * 获取视频的特定帧
 * @param {*} source 源文件
 * @param {*} frameTime // 绘制帧的时间 单位：ms
 * @param {*} width 绘制图片宽度 
 * @param {*} height 绘制图片高度 
 * @returns 
 */
export function getVideoSpecialFrame({
	source,
	frameTime,
	width = 320,
	height = 240
}) {
	// 生成视频文件的blob类型地址;
	const generateVideoFileBlobUrl = (file) => {
		return new Promise((resolve, reject) => {
			let fileReader = new FileReader();

			fileReader.onload = e => {
				let blob = new Blob([e.target.result]);
				resolve(blob)
			}

			fileReader.onerror = e => {
				reject(e)
			};

			fileReader.readAsArrayBuffer(file);
		})
	}

	return new Promise(async (resolve, reject) => {
		let videoSrc = "";

		// 处理视频链接
		console.log(typeof source)
		if (source instanceof File) {
			let blob = await generateVideoFileBlobUrl(source).then(data => data).catch(err => null);
			if (!blob) return reject(new Error("文件处理错误，转换失败"));
			videoSrc = window.URL.createObjectURL(blob);
		} else if (typeof source === "string") {
			videoSrc = source;
		} else {
			return reject(new Error("文件类型参数无效，无法转换"))
		}

		if (!videoSrc) return reject(new Error("视频链接失效，转换失败"))

		let video = document.createElement("video");
		video.setAttribute('crossOrigin', 'anonymous')
		video.src = videoSrc;
		// video.width = width;
		// video.height = height;

		video.addEventListener("loadeddata", function() {
			if (frameTime) {
				video.currentTime = frameTime / 1000;
			}

			let duration = parseInt(video.duration * 1000);

			// 留给页面绘制的时间
			setTimeout(() => {
				console.log(video.videoWidth)
				let {
					videoWidth,
					videoHeight
				} = video
				let canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				let scale = videoWidth / width;
				let frameWidth = width;
				let frameHeight = videoHeight / scale;

				let framePositionLeft = (width - frameWidth) / 2;
				let framePositionHeight = (height - frameHeight) / 2;

				canvas.getContext("2d").drawImage(video, framePositionLeft,
					framePositionHeight, frameWidth, frameHeight);

				let frameBase64 = canvas.toDataURL('image/jpeg');
				canvas.toBlob((blob) => {
					resolve({
						duration: duration,
						video: videoSrc,
						poster: frameBase64,
						blobUrl: URL.createObjectURL(blob)
					});
				})

			}, 300)
		});
	})
}