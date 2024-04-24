import {
	filePath,
	upload as fileUpload
} from '../api/file.js'

export class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}
	upload() {
		return this.loader.file.then(async file => {
			const res = await fileUpload(file, 'ai-portal/ckeditor')
			return {
				default: filePath + '/' + res.url
			}
		});
	}
}

export function MyCustomUploadAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
		return new MyUploadAdapter(loader);
	};
}