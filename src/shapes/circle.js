export default function drawCircle(canvas, squareSize, x, y, foreground, background) {
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
