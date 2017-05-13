const koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const fs = require('fs')
const path = require('path')

var app = new koa()
var router = new Router()

router
    .get('/selectRoom', function(ctx, next) {
        var fsPath = path.join(__dirname, '../../front/src/component/room.html')
        var file = fs.readFileSync(fsPath, 'utf-8'),
            stylePath = path.join(__dirname, '../../front/dist/css/selectRoom.css')
        ctx.body = {
            file: file,
            style: stylePath
        }
    })

app.use(cors()).use(router.routes())
app.listen(3000, () => {
    console.log('run on 3000')
})
