/**
 * 资源类接口
 */
export default class Source {
	/* id */
	id = null;

	/* 资源名 */
	name = 'unnamed';

	/* 资源大小 */
	size = 0;

	/* 资源时长 */
	duration = 0;

	/* 资源地址 */
	url = null;

	/* 封面 */
	cover = null;

	/* 已初始化的 */
	_initialized = false;

	constructor() {}

	/* 初始化 */
	init() {}

	/* 解析 */
	parse(string) {}

	/* 克隆 */
	clone() {}

	/* 销毁 */
	destroy() {}

	/* 获取资源视图表现形式 */
	get view() {}

	get stringify() {}

	static parse(str) {}

	get initialized() {
		return this._initialized;
	}

}