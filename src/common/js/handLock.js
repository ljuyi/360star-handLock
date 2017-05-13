import {bindEvent} from './bindEvent'
 
var canvas = document.getElementById('canvas')  // 获取画布
var ctx = canvas.getContext('2d')

var oHeader = document.getElementById('header')        // 获取头部
var oDiv = document.getElementById('body')
var info = document.getElementById('info')
var oLabel = document.getElementById('select').getElementsByTagName('label')
var check = document.getElementById('check')
var oLi = oDiv.getElementsByTagName('li')

var firstSet = []        // 设置密码时第一次输入
var route = {               // 手势划过点的信息
    'input': [],         // 依次划过的点
    'isCheck': true        // 是否是验证密码，若为false则是设置密码
}


let Storage = (typeof localStorage === 'undefined') ? null : window.localStorage

check.checked = true          // 初始化选中为验证密码

for (var i = 0; i < oLi.length; i++) {
    bindEvent([oLi[i]], 'touchstart touchmove touchend', touch)
    oLi[i].index = i                                    // 给每个点设置唯一索引
    oLi[i].x = oLi[i].offsetLeft                        // 给每个点设置x,y值为其在页面上的位置
    oLi[i].y = oLi[i].offsetTop
}
function labelClick () {
    route.isCheck = false
    initPoint()
}

bindEvent([oLabel[0], oLabel[1]], 'click', labelClick)

Storage.setItem('psd',[0,1,2,4,6,7,8])               // 初始密码


function initPoint () {                                  // 清空画布信息和划过的点
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].className = ''
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    route.input = []
}


function Point () {                                       // 初始化点的坐标
    this.x = arguments[0] || 0
    this.y = arguments[0] || 0
}
function paintLine () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < route.input.length - 1; i++) {
        ctx.beginPath()
        ctx.moveTo(oLi[route.input[i]].offsetLeft + 18, oLi[route.input[i]].offsetTop + 18)
        ctx.lineTo(oLi[route.input[i + 1]].offsetLeft + 18, oLi[route.input[i + 1]].offsetTop + 18)
        ctx.strokeStyle = '#E57679'
        ctx.strokeWidth = '0.1rem'
        ctx.closePath()
        ctx.stroke()
    }
}                     // 连接走过的点

function paintEndLine (eventC) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paintLine()
    ctx.beginPath()
    ctx.moveTo(oLi[route.input[route.input.length - 1]].offsetLeft + 18, oLi[route.input[route.input.length - 1]].offsetTop + 18)
    ctx.lineTo(eventC.x, eventC.y)
    ctx.strokeStyle = '#E57679'
    ctx.strokeWidth = '0.1rem'
    ctx.closePath()
    ctx.stroke()
}            // 绘制最后一条不确定的线

function switchCase (index) {
    if (route.input.indexOf(index) < 0) {
        route.input.push(index)
        oLi[index].className = 'active'
        paintLine()
    }
}

function touch (event) {                                           // 触摸事件
    event = event || window.event
    var obj = event.srcElement ? event.srcElement : event.target

    switch (event.type) {
        case 'touchstart':
            initPoint()
            obj.className = 'active'
            route.input.push(obj.index)
            break
        case 'touchmove':
            var eventC = new Point()
            eventC.x = parseInt(event.changedTouches[0].clientX)
            eventC.y = parseInt(event.changedTouches[0].clientY - oHeader.offsetHeight)
            switch (true) {
                // 0
                case eventC.x >= oLi[0].x && eventC.x <= oLi[0].x + 36 && eventC.y >= oLi[0].y && eventC.y <= oLi[0].y + 36:
                    switchCase(0)
                    break
                // 1
                case eventC.x >= oLi[1].x && eventC.x <= oLi[1].x + 36 && eventC.y >= oLi[1].y && eventC.y <= oLi[1].y + 36:
                    switchCase(1)
                    break
                // 2
                case eventC.x >= oLi[2].x && eventC.x <= oLi[2].x + 36 && eventC.y >= oLi[2].y && eventC.y <= oLi[2].y + 36:
                    switchCase(2)
                    break
                // 3
                case eventC.x >= oLi[3].x && eventC.x <= oLi[3].x + 36 && eventC.y >= oLi[3].y && eventC.y <= oLi[3].y + 36:
                    switchCase(3)
                    break
                // 4
                case eventC.x >= oLi[4].x && eventC.x <= oLi[4].x + 36 && eventC.y >= oLi[4].y && eventC.y <= oLi[4].y + 36:
                    switchCase(4)
                    break
                // 5
                case eventC.x >= oLi[5].x && eventC.x <= oLi[5].x + 36 && eventC.y >= oLi[5].y && eventC.y <= oLi[5].y + 36:
                    switchCase(5)
                    break
                // 6
                case eventC.x >= oLi[6].x && eventC.x <= oLi[6].x + 36 && eventC.y >= oLi[6].y && eventC.y <= oLi[6].y + 36:
                    switchCase(6)
                    break
                // 7
                case eventC.x >= oLi[7].x && eventC.x <= oLi[7].x + 36 && eventC.y >= oLi[7].y && eventC.y <= oLi[7].y + 36:
                    switchCase(7)
                    break
                // 8
                case eventC.x >= oLi[8].x && eventC.x <= oLi[8].x + 36 && eventC.y >= oLi[8].y && eventC.y <= oLi[8].y + 36:
                    switchCase(8)
                    break
                default:
                    paintEndLine(eventC)
            }
            event.preventDefault()
            break
        case 'touchend':
            if (route.isCheck) {
                if (route.input.toString() === Storage.getItem('psd').toString()) {
                    info.innerHTML = '<p>密码正确!</p>'

                } else {
                    info.innerHTML = '<p>输入的密码不正确</p>'
                    initPoint()
                }
            } else {
                if (route.input.length < 5) {
                    info.innerHTML = '<p>密码太短，至少需要5个点</p>'
                    initPoint()
                } else if (firstSet.length === 0) {
                    firstSet = route.input.slice(0)
                    info.innerHTML = '<p>请再次输入手势密码</p>'
                    initPoint()
                } else if (firstSet.length !== 0) {
                    if (firstSet.toString() === route.input.toString()) {
                        info.innerHTML = '<p>密码设置成功</p>'
                        Storage.setItem('psd', route.input)
                        firstSet = []
                        initPoint()
                    } else {
                        info.innerHTML = '<p>两次输入的不一致</p>'
                        firstSet = []
                        initPoint()
                    }
                }
            }
            break
    }
}

