import colors from 'nice-color-palettes' assert { type: 'json' }
import createGrid from './generator.js'
import random from './random.js'

const defaultOptions = {
	colors: colors,
	squareSize: 100,
	numRows: random(4, 8, true),
	numCols: random(4, 8, true)
}

export default async function generate(options = defaultOptions) {
	return createGrid(options)
}
