import AudioSource from '../source/AudioSource.js'
import FigureSource from '../source/FigureSource.js'
import ImageSource from '../source/ImageSource.js'
import TextSource from '../source/TextSource.js'
import VideoSource from '../source/VideoSource.js'

export function autoParse(data) {
	const json = JSON.parse(data)
	let source = null;
	switch (json.type) {
		case AudioSource.TYPE:
			source = AudioSource.parse(data)
			break;
		case FigureSource.TYPE:
			source = FigureSource.parse(data)
			break;
		case ImageSource.TYPE:
			source = ImageSource.parse(data)
			break;
		case TextSource.TYPE:
			source = TextSource.parse(data)
			break;
		case VideoSource.TYPE:
			source = VideoSource.parse(data)
			break;
	}
	return source;
}