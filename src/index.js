import { createSVGWindow } from 'svgdom'
import { optimize } from 'svgo'
import { SVG, registerWindow } from '@svgdotjs/svg.js'
import generativeUtils from '@georgedoescode/generative-utils'
import fetch from 'node-fetch'

const { random } = generativeUtils

function drawCircle(canvas, squareSize, x, y, foreground, background) {
	// create group element
	const group = canvas.group()

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	// draw foreground
	group.circle(squareSize).fill(foreground).move(x, y)

	// 30% of the time add inner circle
	if (Math.random() < 0.3) {
		group
			.circle(squareSize / 2)
			.fill(background)
			.move(x + squareSize / 4, y + squareSize / 4)
	}
}

function drawDots(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group()

	const sizeOptions = [2, 3, 4]
	const size = random(sizeOptions)

	const offset = 10
	const circleSize = 10
	const space = (squareSize - offset * 2 - circleSize) / (size - 1)

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	// draw dots
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			group
				.circle(circleSize)
				.fill(foreground)
				.move(x + offset + i * space, y + offset + j * space)
		}
	}
}

function drawCross(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group()
	const crossGroup = canvas.group()
	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	// draw foreground
	crossGroup
		.rect(squareSize / 1.5, squareSize / 5)
		.fill(foreground)
		.center(x + squareSize / 2, y + squareSize / 2)

	crossGroup
		.rect(squareSize / 1.5, squareSize / 5)
		.fill(foreground)
		.center(x + squareSize / 2, y + squareSize / 2)
		.transform({ rotate: 90 })

	if (Math.random() < 0.4) {
		crossGroup.transform({ rotate: 45, origin: 'center center' })
	}
}

function drawOppositeCircles(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group()
	const circleGroup = canvas.group()

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	const mask = canvas.rect(squareSize, squareSize).fill('#fff').move(x, y)

	const offset = random([
		[0, 0, squareSize, squareSize],
		[0, squareSize, squareSize, 0]
	])

	// draw foreground
	circleGroup
		.circle(squareSize)
		.fill(foreground)
		.center(x + offset[0], y + offset[1])

	circleGroup
		.circle(squareSize)
		.fill(foreground)
		.center(x + offset[2], y + offset[3])

	circleGroup.maskWith(mask)
	group.add(circleGroup)
}

function drawQuarterCircle(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group()
	const circleGroup = canvas.group()

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	const mask = canvas.rect(squareSize, squareSize).fill('#fff').move(x, y)

	const xOffset = squareSize * random([0, 1], true)
	const yOffset = squareSize * random([0, 1], true)
	// draw foreground
	circleGroup
		.circle(squareSize * 2)
		.fill(foreground)
		.center(x + xOffset, y + yOffset)

	if (Math.random() < 0.6) {
		circleGroup
			.circle(squareSize)
			.fill(background)
			.center(x + xOffset, y + yOffset)
	}

	circleGroup.maskWith(mask)
	group.add(circleGroup)
}

function drawDiagonalSquare(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group().addClass('diagonal-square')

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	// draw foreground
	let polygon
	if (Math.random() > 0.5) {
		polygon = group.polygon(`${x},${y} ${x},${y + squareSize}, ${x + squareSize},${y}`)
	} else {
		polygon = group.polygon(`${x},${y} ${x + squareSize},${y} ${x + squareSize},${y + squareSize}`)
	}

	polygon.fill(foreground)
}

function drawHalfSquare(canvas, squareSize, x, y, foreground, background) {
	const group = canvas.group()

	let halfX = 2
	let halfY = 2
	if (random([0, 1])) {
		halfX = 1
	} else {
		halfY = 1
	}

	// draw background
	group.rect(squareSize, squareSize).fill(background).move(x, y)

	// draw foreground
	group
		.rect(squareSize / halfX, squareSize / halfY)
		.fill(foreground)
		.move(x, y)
}

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

async function createGrid(colors) {
	// select a random palette
	const palette = random(colors)

	const squareSize = 100
	const numRows = random(4, 8, true)
	const numCols = random(4, 8, true)

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

export default async function generate() {
	const colors = await fetch('https://unpkg.com/nice-color-palettes@3.0.0/100.json').then((response) => response.json())
	return createGrid(colors)
}
