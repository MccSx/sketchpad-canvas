//全局变量
var sketchpad = document.getElementById('sketchpad')
var ctx = sketchpad.getContext('2d')
var lineThickness = 3
var lineColor = 'black'
var eraserEnabled = false

//功能函数
function autoSetCanvasSize(canvas) {
  function setSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  
  setSize()

  window.onresize = function () {
    setSize()
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.strokeStyle = lineColor
  ctx.moveTo(x1, y1)
  ctx.lineWidth = lineThickness * 2
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}
function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.fillStyle = lineColor
  ctx.arc(x, y, radius, 0, Math.PI*2)
  ctx.fill()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    oldX: undefined,
    oldY: undefined
  }
  //特性检测是否是触控屏
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) {
      using = true
      var x1 = e.touches[0].clientX
      var y1 = e.touches[0].clientY
      if (eraserEnabled) {
        ctx.clearRect(x1 - lineThickness * 2, y1 - lineThickness * 2, 20, 20)
      } else {
        lastPoint = {
          oldX: x1,
          oldY: y1
        }
        drawCircle(x1, y1, lineThickness)
      }
    }
    canvas.ontouchmove = function (e) {
      var x2 = e.touches[0].clientX
      var y2 = e.touches[0].clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        ctx.clearRect(x2 - lineThickness * 2, y2 - lineThickness * 2, 20, 20)
      } else {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2)
        drawCircle(x2, y2, lineThickness)
        lastPoint = {
          oldX: x2,
          oldY: y2
        }
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    canvas.onmousedown = function (e) {
      using = true
      var x1 = e.clientX
      var y1 = e.clientY
      if (eraserEnabled) {
        ctx.clearRect(x1 - lineThickness * 2, y1 - lineThickness * 2, 20, 20)
      } else {
        lastPoint = {
          oldX: x1,
          oldY: y1
        }
        drawCircle(x1, y1, lineThickness)
      }
    }
    canvas.onmousemove = function (e) {
      var x2 = e.clientX
      var y2 = e.clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        ctx.clearRect(x2 - lineThickness * 2, y2 - lineThickness * 2, 20, 20)
      } else {
        drawLine(lastPoint.oldX, lastPoint.oldY, x2, y2)
        drawCircle(x2, y2, lineThickness)
        lastPoint = {
          oldX: x2,
          oldY: y2
        }
      }
    }
    canvas.onmouseup = function () {
      using = false
    }
  }
}

/************/

eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
clear.onclick = function () {
  ctx.clearRect(0, 0, sketchpad.width, sketchpad.height)
}
iconDownload.onclick = function () {
  var url = sketchpad.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'my sketchpad'
  a.target = '_blank'
  a.click()
}
black.onclick = function () {
  lineColor = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function () {
  lineColor = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function () {
  lineColor = 'green'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  lineColor = 'blue'
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
thin.onclick = function () {
  lineThickness = 3
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function () {
  lineThickness = 5
  thin.classList.remove('active')
  thick.classList.add('active')
}

autoSetCanvasSize(sketchpad)

listenToUser(sketchpad)