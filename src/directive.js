import SortByDnd from './dnd'
import { assign } from './util'

let config = {}

// suport object && array
const bind = (el, option = {}) => {
    if (Array.isArray(option)) {
        return option.map(optItem => bind(el, optItem))
    }

    const instance = new SortByDnd(el, assign({}, config, option))
    instance.bind()
    return instance
}

// export directive
export const dnd = {
    bind(el, { value }) {
        el.__DND_DIRECTIVE = bind(el, value)
    },
    unbind(el) {
        const instance = el.__DND_DIRECTIVE
        if (Array.isArray(instance)) {
            instance.forEach(item => item.destroy())
        } else {
            instance.destroy()
        }
        delete el.__DND_DIRECTIVE
    }
}

const dndPlugin = {
    install(Vue, option) {
        config = option
        Vue.directive('sortby-dnd', dnd)
    }
}

if (window.Vue) {
    Vue.use(dndPlugin)
}

// export plugin
export default dndPlugin
