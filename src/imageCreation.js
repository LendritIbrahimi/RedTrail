const fs = require('fs')
const { createCanvas } = require('canvas')

//Canvas circle
function drawCircle(ctx, x, y, radius, fill, stroke = null, strokeWidth = null) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}

//Canvas Scale
const scale = 4;
const canvas = createCanvas(300 * scale, 200 * scale)
const ctx = canvas.getContext('2d')

//Background
ctx.fillStyle = "#1a1a1b";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Avatar
drawCircle(ctx, scale * 50, scale * 50, 28 * scale / 2, "white");

//Username
ctx.font = 12 * scale + 'px Arial'
ctx.fillStyle = "white"
ctx.fillText('username!', scale * 72, scale * 55)
var text = ctx.measureText('Hello world!')

//Time
ctx.font = 12 * scale + 'px Arial'
ctx.fillStyle = "#818384"
ctx.fillText('· ' + '2m', scale * 70 + text.width, scale * 55)

//Content
ctx.font = 14 * scale + 'px Arial'
ctx.fillStyle = "white"
ctx.fillText('Hello world textful!', scale * 72, scale * 80)

//Bottom
ctx.font = 12 * scale + 'px Arial'
ctx.fillStyle = "#818384"
ctx.fillText('Reply   Share   Report   Save', scale * 72, scale * 110)

//Output to file
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./image.png', buffer)


