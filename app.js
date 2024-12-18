const myCanvas = document.getElementById("myCanvas")
const ctx = myCanvas.getContext("2d")

const offset = {
    x: myCanvas.width / 2,
    y: myCanvas.height/ 2
}

ctx.translate(offset.x, offset.y)               // make center the origin pont

const A = { x: 0, y: 0 }
const B = { x: 90, y: 120 }
const C = { x: B.x, y: 0 }

update()        // to avoid blank screen at first, run update
document.onmousemove = (event) => {
    // console.log('x: ', event.x, "y: ", event.y)
    B.x = event.x - offset.x          // set point x-value to x-value of the event
    B.y = event.y - offset.y
    C.x = B.x

    update()
}

function update () {
    const c = distance(A,B)
    const b = distance(A,C)
    const a = distance(B,C)

    ctx.clearRect(-offset.x, -offset.y, myCanvas.width, myCanvas.height)

    drawCoordinateSystem(ctx, offset) 

    drawLine(A,B)           // draw the connecting lines
    drawText('c', average(A,B), "green")
    drawLine(A,C)
    drawText('b', average(A,C), "green")
    drawLine(B,C)
    drawText('a', average(B,C), "green")

    // drawPoint(A)
    // drawText('A', A)
    // drawPoint(B)
    // drawText('B', B)
    // drawPoint(C)
    // drawText('C', C)
}

function distance (p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
    
}
function average (p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
}

function drawPoint (location, size=20, colour ='black') {
    ctx.beginPath()
    ctx.fillStyle = colour
    ctx.arc(location.x, location.y, size/2, 0, Math.PI*2)       // ?draw small circle
    ctx.fill()
}

function drawLine (point1, point2, colour = 'black') {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = colour
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
}

function drawText (text, location, colour = 'white') {
    ctx.beginPath()
    ctx.fillStyle = colour
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 18px Courier'
    ctx.strokeStyle='white'
    ctx.lineWidth = 6
    ctx.strokeText(text, location.x, location.y) 
    ctx.fillText(text, location.x, location.y) 
}

function drawCoordinateSystem (ctx, offset) {
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
