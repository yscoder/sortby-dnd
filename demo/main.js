import Vue from 'vue'
import App from './App.vue'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.configure({
    tabReplace: '    '
})

Vue.prototype.$hljs = hljs

new Vue({
    el: '#app',
    render: h => h(App)
})
