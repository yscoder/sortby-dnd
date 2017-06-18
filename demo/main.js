import Vue from 'vue'
import App from './App.vue'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-light.css'
import { js_beautify } from 'js-beautify'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.configure({
    tabReplace: '    '
})

Vue.prototype.$hljs = hljs
Vue.prototype.$beautifyJs = js_beautify

new Vue({
    el: '#app',
    render: h => h(App)
})
