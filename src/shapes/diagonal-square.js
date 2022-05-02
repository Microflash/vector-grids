export default function drawDiagonalSquare(canvas, squareSize, x, y, foreground, background) {
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
