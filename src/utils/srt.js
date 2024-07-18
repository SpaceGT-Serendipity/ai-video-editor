import srt from 'srt'

export function fromString(string) {
	string = string.replaceAll('\r\n', '\n')
	return srt.fromString(string);
}