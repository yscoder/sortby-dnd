const os = Object.prototype.toString

// isString
export const isString = obj => os.call(obj) === '[object String]'

// isFunction
export const isFunction = obj => os.call(obj) === '[object Function]'

// assign
export const assign = (target, ...sources) => {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }

    const to = Object(target)

    let index = 0
    while (index < sources.length) {
        const next = sources[index++]
        if (!!next) {
            for (let key in next) {
                if (Object.prototype.hasOwnProperty.call(next, key)) {
                    to[key] = next[key]
                }
            }
        }
    }

    return to
}
