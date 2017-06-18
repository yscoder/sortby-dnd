<template>
    <block :title="title">
        <div class="docs-example-source">
            <slot></slot>
        </div>
        <pre class="docs-example-code"><code class="javascript" ref="code">{{formatCode}}</code></pre>
    </block>
</template>
<script>
import Block from './Block'
import SortByDnd from 'dnd'

export default {
    components: {
        Block
    },
    props: ['title', 'comment', 'el', 'option'],
    computed: {
        comments () {
            return Array.isArray(this.comment)
                ? this.comment.map(str => `// ${str}`).join('\n')
                : `// ${this.comment}`
        },
        preCode () {
            return Array.isArray(this.option)
                ? this.option.map((item, i) => `const dnd${i + 1} = new SortByDnd('${this.el}', ${this.stringifyOption(item)})
                    dnd${i + 1}.bind()
                `).join('\n')
                : `const dnd = new SortByDnd('${this.el}', ${this.stringifyOption(this.option)})
                    dnd.bind()`
        },
        formatCode () {
            return this.$beautifyJs(`
                ${this.comments}
                ${this.preCode}
            `)
        }
    },
    methods: {
        stringifyOption (option) {
            return JSON.stringify(option)
                .replace(/\"(\w+)\":/g, '$1:')
                .replace(/\"/g, "'")
        }
    },
    mounted () {
        Array.isArray(this.option)
            ? this.option.forEach(item => new SortByDnd(this.el, item).bind())
            : new SortByDnd(this.el, this.option).bind()

        this.$hljs.highlightBlock(this.$refs.code)
    }
}
</script>
<style lang="less">
.docs- {
    &example {

        &-source {
            padding: 20px;
            border-bottom: 1px solid #ddd;
            user-select: none
        }

        &-code {
            font-size: 14px;
            line-height: 1.8;
            letter-spacing: .03em;
            .hljs {
                padding: 20px;
                color: #666;
            }
        }
    }
}
</style>
