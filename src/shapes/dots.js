import random from '../random.js'

export default function drawDots(canvas, squareSize, x, y, foreground, background) {
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
