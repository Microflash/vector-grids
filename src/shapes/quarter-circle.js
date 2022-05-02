import random from '../random.js'

export default function drawQuarterCircle(canvas, squareSize, x, y, foreground, background) {
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
