<template>
    <div class="docs">
        <a href="//github.com/yscoder/sortby-dnd/">
            <img style="position: fixed; top: 0; right: 0; z-index: 99999; border: 0;"
                src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
        </a>
        <doc-header title="Sort by drag and drop"></doc-header>
        <div class="docs-container">
            <example title="Simple"
                comment="使用 `draggable` 标记可拖拽的项的，不匹配的兄弟元素不可拖拽"
                el="#demo-1"
                :option="{ draggable: '.drag-item'}">
                <ul id="demo-1">
                    <li class="demo-item drag-item"
                        v-for="n in 5">{{'DragItem-' + n}}</li>
                    <li class="demo-item">IgnoreItem</li>
                </ul>
            </example>
            <example title="Drag handle"
                comment="使用 `handle` 标记位于元素上的拖动响应元素"
                el="#demo-2"
                :option="{ draggable: '.demo-item', handle: '.drag-handle'}">
                <ul id="demo-2">
                    <li class="demo-item"
                        v-for="n in 5">
                        <div class="drag-handle">≡</div> {{'Item-' + n}} </li>
                </ul>
            </example>
            <example title="Multi"
                comment="使用 `accepts` 使列容器可接受拖拽"
                el="#demo-3"
                :option="{  draggable: '.demo-item', accepts: [{ container: '.demo-column-item',  relative: '.demo-column-item' }] }">
                <div id="demo-3"
                    class="demo-column">
                    <ul class="demo-column-item">
                        <li class="demo-item drag-item"
                            v-for="n in 2">{{'DragItem-1-' + n}} </li>
                    </ul>
                    <ul class="demo-column-item">
                        <li class="demo-item drag-item"
                            v-for="n in 3">{{'DragItem-2-' + n}} </li>
                    </ul>
                </div>
            </example>
            <example title="Scroll"
                el="#demo-4"
                :comment="['`scrollEl`: 拖拽到容器边缘时滚动的节点', '`scrollSpacing`: 距离容器边缘多少时滚动', '`scrollSpeed`: 滚动速度', '边际递增，距离越近速度越快']"
                :option="{ draggable: '.drag-item', scrollEl: '.scroll-el', scrollSpacing: 20, scrollSpeed: 4 }">
                <div id="demo-4">
                    <ul class="scroll-el">
                        <li class="demo-item drag-item"
                            v-for="n in 8">{{'DragItem-' + n}} </li>
                    </ul>
                </div>
            </example>
            <example title="Nested"
                el="#demo-5"
                comment="嵌套没什么大不了的，创建多实例即可"
                :option="[{ draggable: '.column', handle: '.title', scrollEl: '.nested-container'}, { draggable: '.drag-item', scrollEl: '.nested-container, .drag-col', accepts: [{ container: '.column', relative: '.drag-col', rule: 'append' }] }]">
                <div id="demo-5">
                    <div class="nested-container demo-column">
                        <div class="column"
                            v-for="c in 6">
                            <div class="drag-col">
                                <h4 class="title">Column-{{c}}</h4>
                                <div class="demo-item drag-item"
                                    v-for="n in 5">DragItem-{{c}}-{{n}} </div>
                            </div>
                        </div>
                    </div>
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
        Example,
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
h3,
h4 {
    margin: 0
}

ul {
    padding: 0;
}

ul,
li {
    list-style: none
}

.cursor() {
    cursor: move;
    cursor: -webkit-grabbing;
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
        padding: 0 10px;
        font-size: 120%;
        .cursor
    }
}

.drag-item {
    .cursor;
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

.scroll-el {
    max-height: 200px;
    overflow-y: auto;
}

.nested-container {
    padding: 5px 0;
    height: 300px;
    overflow-y: hidden;
    overflow-x: auto;
    background: #eee;
    .column {
        flex: 0 0 auto;
        width: 200px;
        height: 100%;
        padding: 0 5px;
    }
}

.drag-col {
    max-height: 100%;
    overflow-y: auto;
    padding: 5px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
    .cursor;
    .title {
        text-align: center
    }
}

.ghost {
    opacity: .6!important
}
</style>
