import {XMLHttpRequest} from 'XMLHttpRequest'
export default class SpaRouter {
    constructor () {
        this.routers = {},
        this.currentUrl = ''
    }
    init () {
        window.addEventListener('load', this.refresh.bind(this), false)
        window.addEventListener('hashchange', this.refresh.bind(this), false)
    }
    route (path, callback) {
        this.routers[path] = callback || function () {}
    }
    refresh () {
        this.currentUrl = localtion.hash.slice(1) || '/'
        this.routes[this.currentUrl]()
    }
}
