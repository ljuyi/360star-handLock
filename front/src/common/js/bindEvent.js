export function bindEvent (obj, event, callback) {
    if (obj.length === 1) {
        event = event.split(' ')
        for (let i = 0; i < event.length; i++) {
            obj[0].addEventListener(event[i], callback, false)
        }
    } else {
        event = event.split(' ')
        for (let i = 0; i < obj.length; i++) {
            for (var j = 0; j < event.length; j++) {
                obj[i].addEventListener(event[j], callback, false)
            }
        }
    }
}