<template>
    <section class="docs-example">
        <h2 class="docs-example-title">{{title}}</h2>
        <div class="docs-card">
            <div class="docs-example-source">
                <slot></slot>
            </div>
            <pre class="docs-example-code"><code class="javascript" ref="code">// {{comment + '\n'}}new SortByDnd('{{el}}', {{ htmlOption }})</code></pre>
        </div>
    </section>
</template>
<script>
import SortByDnd from '../src/dnd'

export default {
    props: ['title', 'comment', 'el', 'option'],
    computed: {
        htmlOption() {
            return JSON.stringify(this.option)
                .replace(/\"(\w+)\":/g, ' $1: ')
                .replace(/\"/g, "'")
                .replace(/([\,\{\[])/g, "$1\n\t")
                .replace(/([\}\]])/g, '\n$1')
        }
    },
    mounted() {
        new SortByDnd(this.el, this.option).bind()
        this.$hljs.highlightBlock(this.$refs.code)
    }
}
</script>
<style lang="less">
.docs- {
    &example {
        padding: 20px 0;

        &-title {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 12px;
        }

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

    &card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 3px; // box-shadow: 0 0 3px rgba(0, 0, 0, .1)
    }
}
</style>
