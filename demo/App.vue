<template>
    <div class="docs">
        <a href="//github.com/yscoder/sortby-dnd/">
            <img style="position: fixed; top: 0; right: 0; border: 0;"
                src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
        </a>
        <doc-header title="Sort by drag and drop"></doc-header>
        <div class="docs-container">
            <example title="Simple drag"
                comment="使用 `draggable` 标记可拖拽的项的，不匹配的兄弟元素不可拖拽"
                el="#demo-1"
                :option="{ draggable: '.drag-item' }">
                <ul id="demo-1">
                    <li class="demo-item drag-item"
                        v-for="n in 5">{{'DragItem-' + n}}</li>
                    <li class="demo-item">IgnoreItem</li>
                </ul>
            </example>
            <example title="Drag handle"
                comment="使用 `handle` 标记位于元素上的拖动响应元素"
                el="#demo-2"
                :option="{ draggable: '.drag-item', handle: '.drag-handle'}">
                <ul id="demo-2">
                    <li class="demo-item drag-item"
                        v-for="n in 5">
                        <div class="drag-handle">≡</div> {{'DragItem-' + n}} </li>
                </ul>
            </example>
            <example title="Multi"
                comment="使用 `accepts` 使列容器可接受拖拽"
                el="#demo-3"
                :option="{ draggable: '.drag-item', accepts: [{ container: '.drag-col', element: '.drag-col' }] }">
                <div id="demo-3"
                    class="demo-column">
                    <ul class="demo-column-item drag-col">
                        <li class="demo-item drag-item"
                            v-for="n in 2">{{'DragItem-1-' + n}} </li>
                    </ul>
                    <ul class="demo-column-item drag-col">
                        <li class="demo-item drag-item"
                            v-for="n in 5">{{'DragItem-2-' + n}} </li>
                    </ul>
                </div>
            </example>
        </div>
    </div>
</template>
<script>
import DocHeader from './Header'
import Example from './Example'

export default {
    components: {
        DocHeader,
        Example
    }
}
</script>
<style lang="less">
*,
*::before,
*::after {
    box-sizing: border-box
}

body,
ul,
pre,
h1,
h2,
h3 {
    margin: 0
}

ul {
    padding: 0;
}

ul,
li {
    list-style: none
}

body {
    line-height: 1.5;
    font-size: 15px;
    color: #4d4d4d
}

.docs- {
    &container {
        margin: 0 auto;
        max-width: 1000px;
        min-width: 720px;
        padding-left: 40px;
        padding-right: 40px;
    }
}

.demo-item {
    position: relative;
    width: 100%;
    height: 35px;
    line-height: 35px;
    margin: 5px 0;
    text-align: center;
    color: #fff;
    background: #3F51B5;
    &.ghost {
        opacity: .6
    }
    .drag-handle {
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        padding: 0 5px;
    }
}

.demo-column {
    display: flex;
    height: 200px;
    &-item {
        flex: 1;
        margin: 0 5px;
        padding: 5px 20px;
        overflow-y: auto;
        background: #eee
    }
}
</style>
