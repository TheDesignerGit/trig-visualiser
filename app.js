const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

const offset = {
    x: canvas.width / 2,
    y: canvas.height/ 2
}

ctx.translate(offset.x, offset.y)

const A = { x: 0, y: 0 }
const B = { x: 90, y: 120 }
const C = { x: B.x, y: 0 }

const drawPoint = (location, size=20, colour ='black') => {
    ctx.beginPath()
    ctx.fillStyle = colour
    ctx.arc(location.x, location.y, size/2, 0, Math.PI*2)
    ctx.fill()
}

const drawText = (text, location, colour = 'white') => {
    ctx.beginPath()
    ctx.fillStyle = colour
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 13px Courier'
    ctx.fillText(text, location.x, location.y) 
}

const drawCoordinateSystem = (ctx, offset) => {
    ctx.beginPath()
    ctx.moveTo(-offset.x, 0)
    ctx.lineTo(ctx.canvas.width - offset.x, 0)
    ctx.moveTo(0, -offset.y)
    ctx.lineTo(0, ctx.canvas.height - offset.y)
    ctx.setLineDash([4,2])
    ctx.lineWidth = 1
    ctx.strokeStyle='gray'
    ctx.stroke()
    
    ctx.setLineDash([])             // reset after it's drawn, to avoid affect anything drawn afterwards
}

drawCoordinateSystem(ctx, offset) 

drawPoint(A)
drawText('A', A)
drawPoint(B)
drawText('B', B)
drawPoint(C)
drawText('C', C)