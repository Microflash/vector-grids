import random from '../random.js'

export default function drawHalfSquare(canvas, squareSize, x, y, foreground, background) {
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
