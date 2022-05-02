export default function drawCross(canvas, squareSize, x, y, foreground, background) {
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
