import random from '../random.js'

export default function drawOppositeCircles(canvas, squareSize, x, y, foreground, background) {
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
