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

// use directive and setting global option
Vue.use(SortByDnd, {
    // ...option
})
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
    accepts: null,   // [{ container: DomSelector,  relative: DomSelector, ignore: DomSelector, rule: MoveRule }, ...]
    draggable: '.item',
    handle: '',
    ignore: 'input, textarea',
    dragClass: 'drag',
    ghostClass: 'ghost',
    scrollEl: null,
    scrollSpacing: 80,
    scrollSpeed: 4,
    onDrag(DndEvent, MouseEvent) { },
    onClone(DndEvent, MouseEvent) { },
    onMove(DndEvent, MouseEvent) { },
    onOver(DndEvent, MouseEvent, MoveRule) { },
    onDrop(DndEvent, MoveRule) { },
    onEnd(DndEvent, MouseEvent) { }
}
```

### MoveRule

* `prepend`
* `before`
* `after`
* `append`

### DndEvent

```js
{
    item: Element,      // drag element
    from: Element,      // from container
    fromIndex: Number,  // from index
    to: Element,        // to container
    toIndex: Number,    // to index
    clone: Element      // clone element
}
```
