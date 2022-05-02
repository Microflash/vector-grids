import colors from 'nice-color-palettes' assert { type: 'json' }
import createGrid from './generator.js'

export default async function generate() {
	return createGrid(colors)
}
