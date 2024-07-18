import request from '../axios/index.js'

export function task_sadtalker(uid, title, avatar, avatar_type, avatar_raw, audio, subtitle, bg, scale, x, y, eye, tailor, show_subtitle) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'sad-talker',
			uid,
			title,
			avatar,
			avatar_type,
			avatar_raw,
			audio,
			subtitle,
			bg,
			scale,
			x,
			y,
			eye,
			tailor,
			show_subtitle
		}
	})
}

export function task_sadtalker_batch(uid, title, sceneCount, scenes) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'sad-talker-batch',
			uid,
			title,
			sceneCount,
			...scenes
		}
	})
}

export function task_edgetts(uid, title, text, voice, rate, volume, pitch) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'edge-tts',
			uid,
			title,
			text,
			voice,
			rate,
			volume,
			pitch
		}
	})
}

export function task_sovitssvc(uid, rate, text, voice) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'sovitssvc',
			uid,
			rate,
			text,
			voice
		}
	})
}


export function task_rvc(uid, title, text, voice, rate, volume, pitch, model) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'rvc',
			uid,
			title,
			text,
			voice,
			rate,
			volume,
			pitch,
			model
		}
	})
}

export function task_rembg(uid, file, model) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'rembg',
			uid,
			file,
			model
		}
	})
}

export function task_motion(uid, raw) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'motion',
			uid,
			raw
		}
	})
}

export function task_console(taskId, hash, count) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/console/' + taskId,
		requiresAuth: true,
		params: {
			hash,
			count
		}
	})
}

export function task_progress(taskId) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/progress/' + taskId,
		requiresAuth: true
	})
}

export function task_user_run(uid) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/user/run',
		requiresAuth: true,
		params: {
			uid
		}
	})
}

export function task_user_all(uid, current, size) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/user/all',
		requiresAuth: true,
		params: {
			uid,
			current,
			size
		}
	})
}

export function task_cancel(uid, taskid) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/cancel',
		requiresAuth: true,
		method: 'post',
		data: {
			uid,
			taskid
		}
	})
}

export function task_delete(uid, taskid) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/delete',
		requiresAuth: true,
		method: 'post',
		data: {
			uid,
			taskid
		}
	})
}

export function task_rerun(uid, taskid) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task/rerun',
		requiresAuth: true,
		method: 'post',
		data: {
			uid,
			taskid
		}
	})
}

export function task_rvc_training(uid, name, options, files, reverberationEchoProcessing) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'rvc-training',
			uid,
			name,
			options,
			files: files,
			reverberationEchoProcessing
		}
	})
}

export function task_gpt_sovits_training(uid, name, modelName, files) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'gpt-sovits-train',
			uid,
			name,
			modelName,
			files
		}
	})
}

export function task_gpt_sovits_inference(uid, name, modelName, promptAudio, promptText, text) {
	return request({
		url: import.meta.env.VITE_APP_AI_DESPATCH + '/task',
		requiresAuth: true,
		method: 'post',
		data: {
			task: 'gpt-sovits-inference',
			uid,
			name,
			modelName,
			promptAudio,
			promptText,
			text
		}
	})
}