var main = document.querySelector('main')
main.addEventListener('hashchange', function(){
    
}, false)
function SpaRouter () {
    this.routers = {}
}
SpaRouter.prototype = {
    init: function () {
        window.location.hash = '/index'
    },
    getParamUrl: function () {
        var path = window.location.path,
            hash = path.split('?')[0].split('#')[1],
            queryStr = path.split('?')[1].split('&')
            query = {}
        for(var i of queryStr){
            query[i] = queryStr[i]
        }
        return {
            path: path,
            query: query
        }
    },
    changeUrl: function (hash) {
        var xhr = new XMLHttpRequest(),
            path = 'http://localhost:3000/' + hash
        xhr.open('get', path, true)
        xhr.send(null)
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var main = document.querySelector('main')
                    main.innerHTML = xhr.responseText
                }else{
                    window.location.hash = '/index'
                }
            }
        }
    },
    asyncLoadScript: function (filePath) {
        var script = document.createElement('script')
        script.src = filePath
        script.async = true
        script.onload = function () {
            console.log('脚本加载完毕')
        }
        document.body.appendChild('script')
    }
}
var SRouter = new SpaRouter()
SRouter.init()