import { registerWindow, SVG } from '@svgdotjs/svg.js'
import { createSVGWindow } from 'svgdom'
import { optimize } from 'svgo'
import random from './random.js'
import drawCircle from './shapes/circle.js'
import drawCross from './shapes/cross.js'
import drawDiagonalSquare from './shapes/diagonal-square.js'
import drawDots from './shapes/dots.js'
import drawHalfSquare from './shapes/half-square.js'
import drawOppositeCircles from './shapes/opposite-circles.js'
import drawQuarterCircle from './shapes/quarter-circle.js'

function generateSmallBlock(canvas, squareSize, colorPalette, i, j) {
	const { foreground, background } = getTwoColors(colorPalette)

	const blockStyleOptions = [
		drawCross,
		drawDots,
		drawHalfSquare,
		drawDiagonalSquare,
		drawCircle,
		drawOppositeCircles,
		drawQuarterCircle
	]

	const blockStyle = random(blockStyleOptions)
	const xPos = i * squareSize
	const yPos = j * squareSize

	blockStyle(canvas, squareSize, xPos, yPos, foreground, background)
}

function generateBigBlock(canvas, squareSize, colorPalette, numRows, numCols) {
	const { foreground, background } = getTwoColors(colorPalette)

	const blockStyleOptions = [
		drawCross,
		drawHalfSquare,
		drawDiagonalSquare,
		drawCircle,
		drawQuarterCircle,
		drawOppositeCircles
	]

	let prevSquareSize = squareSize

	// random multiplier (2 or 3 squares)
	const multiplier = random([2, 3])
	// random X position
	const xPos = random(0, numRows - multiplier, true) * prevSquareSize
	// random Y position
	const yPos = random(0, numCols - multiplier, true) * prevSquareSize

	// make squareSize bigger
	squareSize = multiplier * 100

	// get random square style
	const blockStyle = random(blockStyleOptions)
	blockStyle(canvas, squareSize, xPos, yPos, foreground, background)

	// reset squareSize
	squareSize = prevSquareSize
}

function getTwoColors(colors) {
	let colorList = [...colors]
	// get random index for this array of colors
	const colorIndex = random(0, colorList.length - 1, true)
	// set the background to the color at that array
	const background = colorList[colorIndex]
	// remove that color from the options
	colorList.splice(colorIndex, 1)
	// set the foreground to any other color in the array
	const foreground = random(colorList)

	return { foreground, background }
}

function createCanvas() {
	const window = createSVGWindow()
	const { document } = window
	registerWindow(window, document)
	return SVG(document.documentElement)
}

export default async function createGrid(options = defaultOptions) {
	// select a random palette
	const palette = random(options.colors)

	const squareSize = options.squareSize
	const numRows = options.numRows
	const numCols = options.numCols

	const canvas = createCanvas()
		.size('100%', '100%')
		.viewbox(`0 0 ${numRows * squareSize} ${numCols * squareSize}`)

	// generate grid
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			generateSmallBlock(canvas, squareSize, palette, i, j)
		}
	}

	generateBigBlock(canvas, squareSize, palette, numRows, numCols)

	return optimize(canvas.svg()).data
}
