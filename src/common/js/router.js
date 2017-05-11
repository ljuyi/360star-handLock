const koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const fs = require('fs')
const path = require('path')

var app = new koa()
var router = new Router()

router.all('/index',function (ctx, next) {
    var fsPath = path.join(__dirname, '../../../component/index.html')
    ctx.body = fs.readFileSync(fsPath, 'utf-8')
})
    .get('/selectRoom', function(ctx, next) {
        var fsPath = path.join(__dirname, '../../../component/room.html')
        ctx.body = fs.readFileSync(fsPath, 'utf-8')
    })

app.use(cors()).use(router.routes())
app.listen(3000, () => {
    console.log('run on 3000')
})
