# sortby-dnd
Sort by drag and drop.

## Install

```bash
npm i sort-by-dnd -S
```

## Usage

### Javascript

```js
new SortByDnd(element, {
    // ...option
})
// or
new SortByDnd(selector, {
    // ...option
})
```

### Vue

```js
import Vue from 'vue'
import SortByDnd from 'sort-by-dnd/dist/vueSortByDnd'

// use directive
Vue.use(SortByDnd)
```

```html
<template>
    <div class="drag-container"
         v-sortby-dnd="dndOption">
        <!-- ...elements -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            // config
            dndOption: {
                // ...option
            },
            // or Array
            // dndOption: [{
            //    // ...option1
            // }, {
            //     // ...option2
            // }],
        }
    }
}
</script>
```

## Config

```js
// defaults
{
    accepts: null,
    draggable: '.item',
    handle: '',
    ignore: 'input, textarea',
    dragClass: 'drag',
    ghostClass: 'ghost',
    scrollEl: null,
    scrollSpacing: 80,
    scrollSpeed: 4,
    onDrag: null,
    onClone: null,
    onMove: null,
    onOver: null,
    onDrop: null,
    onEnd: null
}
```
