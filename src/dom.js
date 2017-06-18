// closest
export const closest = (el, selector) => {
    let element = el
    while (element && element.matches) {
        if (element.matches(selector)) {
            return element
        }
        element = element.parentNode
    }

    return null
}

// event
export const on = (el, type, handle) => el.addEventListener(type, handle)
export const off = (el, type, handle) => el.removeEventListener(type, handle)

// query
const arrSlice = Array.prototype.slice
export const $ = (selector, context = document) => context.querySelector(selector)
export const $$ = (selector, context = document) => arrSlice.call(context
    .querySelectorAll(selector))

const indexOf = Array.prototype.indexOf
export const nodeIndex = node => indexOf.call(node.parentNode.children, node)

// style
export const style = (el, styles) => {
    Object.keys(styles).forEach(name => (el.style[name] = styles[name]))
}

// class
export const addClass = (el, ...classArgs) => el.classList.add(classArgs)
export const removeClass = (el, ...classArgs) => el.classList.remove(classArgs)

// dom operation
export const insertBefore = (node, beforeNode) => node.insertAdjacentElement('beforebegin', beforeNode)
export const insertAfter = (node, afterNode) => node.insertAdjacentElement('afterend', afterNode)
export const prepend = (node, preNode) => node.insertAdjacentElement('afterbegin', preNode)

// scrollDirection
export const scrollDirection = el => {
    if (el.scrollHeight > el.offsetHeight) return 'y'
    if (el.scrollWidth > el.offsetWidth) return 'x'
    return null
}

export const prevent = e => e.preventDefault()
