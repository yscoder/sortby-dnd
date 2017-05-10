import { assign, isString, isFunction } from './util'
import {
    $,
    $$,
    on,
    off,
    closest,
    nodeIndex,
    style,
    prevent,
    addClass,
    removeClass,
    insertBefore,
    insertAfter,
    prepend,
    scrollDirection,
} from './dom'

/**
 * 拖拽排序
 *
 * @class SortByDnd
 */
export default class SortByDnd {
    constructor(el, option) {
        let $el = el
        if (isString(el)) {
            $el = $(el)
        }

        if ($el.nodeType !== 1) {
            throw new TypeError('el is not a selector or element.')
        }

        this.$container = $el
        this.option = assign({}, this.defaults, option)
        this.initArgs()
    }

    defaults = {
        accepts: null,
        draggable: '.item',
        handle: '',
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

    $dragItem = null
    $cloneNode = null
    $from = null
    fromIndex = -1
    toIndex = -1
    $to = null
    startPost = null
    cancel = false
    moving = false
    cloneStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        zIndex: 9999,
        pointerEvents: 'none'
    }
    scrollFrame = {}

    MOVE_RULE = {
        PREPEND: 'prepend',
        BEFORE: 'before',
        AFTER: 'after',
        APPEND: 'append'
    }

    initArgs() {
        this.$dragItem = null
        this.$cloneNode = null
        this.$from = null
        this.fromIndex = -1
        this.toIndex = -1
        this.$to = null
        this.startPost = null
    }

    emit(type, ...args) {
        const handle = this.option[type]
        if (isFunction(handle)) {
            handle({
                item: this.$dragItem,
                from: this.$from,
                fromIndex: this.fromIndex,
                to: this.$to,
                toIndex: this.toIndex,
                clone: this.$cloneNode
            }, args)
        }
    }

    checkDragItem = (target, callback) => {
        const handle = this.option.handle
        if (handle && !closest(target, handle)) return

        const $dragItem = closest(target, this.option.draggable)
        if (!$dragItem) return

        const index = nodeIndex($dragItem)
        if (index !== -1) {
            this.fromIndex = index
            callback($dragItem)
        }
    }

    onMouseDown = evt => {
        const { button, target, clientX: x, clientY: y } = evt
        if (button !== 0) return

        this.cancel = false
        this.checkDragItem(target, $dragItem => {
            this.startPost = { x, y }
            this.$dragItem = $dragItem
            this.$from = $dragItem.parentNode
            this.emit('onDrag', evt)
        })
    }

    onMouseUp = evt => {
        this.cancel = true
        if (!this.startPost) return

        removeClass(this.$dragItem, this.option.ghostClass)
        if (this.$cloneNode) {
            this.$cloneNode.remove()
            this.emit('onEnd', evt)
        }
        this.initArgs()
    }

    clone(evt) {
        const $dragItem = this.$dragItem
        const $cloneNode = $dragItem.cloneNode(true)
        const { top, left, width } = $dragItem.getBoundingClientRect()
        style($cloneNode, assign(this.cloneStyle, {
            width: $dragItem.style.width || `${width}px`,
            transform: `translate(${left}px, ${top}px)`
        }))
        addClass($dragItem, this.option.ghostClass)
        addClass($cloneNode, this.option.dragClass)
        document.body.appendChild($cloneNode)
        this.$cloneNode = $cloneNode
        this.emit('onClone', evt)
    }

    autoScroll() {
        if (!this.option.scrollEl) return

        const $scrollEls = $$(this.option.scrollEl, this.$container.parentNode)
        $scrollEls.forEach($box => {
            const scrollDirec = scrollDirection($box)
            if (!scrollDirec) return

            this.scrollContainer($box, scrollDirec)
        })
    }

    scrollTo($box, len, axis, direc) {
        if (this.cancel) {
            this.clearScrollFrames()
            return
        }

        const { scrollSpacing, scrollSpeed } = this.option
        const length = Math.max((scrollSpacing - len) / 20 * scrollSpeed, 1)

        switch (direc) {
            case 'left':
                $box.scrollLeft -= length
                if ($box.scrollLeft === 0) return
                break
            case 'right':
                $box.scrollLeft += length
                if ($box.scrollLeft === $box.scrollWidth - $box.offsetWidth) return
                break
            case 'top':
                $box.scrollTop -= length
                if ($box.scrollTop === 0) return
                break
            case 'bottom':
                $box.scrollTop += length
                if ($box.scrollTop === $box.scrollHeight - $box.offsetHeight) return
                break
            default:
        }

        const request = requestAnimationFrame(this.scrollTo.bind(this, $box, len, axis, direc))
        if (!this.scrollFrame[axis]) {
            this.scrollFrame[axis] = request
        }
    }

    clearScrollFrames(axis) {
        if (!axis) {
            Object.keys(this.scrollFrame).forEach(e => this.clearScrollFrames(e))
            return
        }

        if (this.scrollFrame[axis]) {
            cancelAnimationFrame(this.scrollFrame[axis])
            delete this.scrollFrame[axis]
        }
    }

    scrollContainer($box, axis) {
        const { x, y } = this.startPost
        const { left, right, top, bottom } = $box.getBoundingClientRect()
        const len = this.option.scrollSpacing  // 小于边界距离时滚动

        this.clearScrollFrames(axis)

        // 拖拽到边界时滚动
        if (axis === 'x' && y >= top && y <= bottom) {
            const rLen = right - x
            const lLen = x - left

            if (rLen <= len) {
                this.scrollTo($box, rLen, axis, 'right')
            }

            if (lLen <= len) {
                this.scrollTo($box, lLen, axis, 'left')
            }
            return
        }

        if (x >= left && x <= right) {
            const tLen = y - top
            const bLen = bottom - y

            if (tLen <= len) {
                this.scrollTo($box, tLen, axis, 'top')
            }

            if (bLen <= len) {
                this.scrollTo($box, bLen, axis, 'bottom')
            }
        }
    }

    onMove = evt => {
        if (this.$container.contains(evt.target)) {
            prevent(evt)
        }

        const { clientX, clientY } = evt
        if (this.moving || this.cancel || !this.$dragItem
            || (this.startPost.x === clientX && this.startPost.y === clientY)) return

        this.moving = true

        if (!this.$cloneNode) {
            this.clone(evt)
        }

        const $cloneNode = this.$cloneNode
        const { x, y } = this.startPost
        const rect = $cloneNode.getBoundingClientRect()

        style($cloneNode, {
            transform: `translate(${rect.left + clientX - x}px, ${rect.top + clientY - y}px)`
        })

        this.startPost = {
            x: clientX,
            y: clientY
        }

        this.emit('onMove', evt)
        this.autoScroll()

        const $closestItem = this.getClosestItem()

        if ($closestItem) {
            this.$to = $closestItem.parentNode
            this.toIndex = nodeIndex($closestItem)
            this.emit('onOver', evt)
            this.moveDraggable($closestItem)
            this.moving = false
            return
        }

        const accept = this.getClosestAccept()
        if (accept) {
            const { $target, rule } = accept
            let $to = $target
            let toIndex = 0

            if (rule === this.MOVE_RULE.APPEND) {
                toIndex = $target.childElementCount
            }

            if (rule === this.MOVE_RULE.AFTER) {
                $to = $target.parentNode
                toIndex = nodeIndex($target) + 1
            }

            if (rule === this.MOVE_RULE.BEFORE) {
                $to = $target.parentNode
                toIndex = nodeIndex($target)
            }

            this.$to = $to
            this.toIndex = toIndex

            this.emit('onOver', evt, rule)
            this.moveItem($target, rule)
        }

        this.moving = false
    }

    getClosestAccept() {
        const accepts = this.option.accepts
        if (!accepts) return null

        let ret = null
        let i = 0
        while (!ret && i < accepts.length) {
            const { container, relative, ignore, rule } = accepts[i]
            i += 1
            const $containers = $$(container, this.$container)
            const $closest = $containers.find($el => {
                if ($el.contains(this.$dragItem)) return false

                if (ignore) {
                    const $ignore = $(ignore, $el)
                    return (!$ignore.childElementCount || !this.intersecting($ignore, true))
                        && this.intersecting($el)
                }

                return this.intersecting($el)
            })

            if ($closest) {
                const $target = $closest.matches(relative) ? $closest
                    : $(relative, $closest)
                ret = { $target, rule }
            }
        }
        return ret
    }

    getClosestItem() {
        const $dragList = $$(this.option.draggable, this.$container)

        return $dragList.find($dragEl => {
            if ($dragEl === this.$dragItem) return false
            return this.intersecting($dragEl)
        })
    }

    intersecting($to, flag) {
        const {
            left: l1,
            top: t1,
            right: r1,
            bottom: b1,
            width
        } = this.$cloneNode.getBoundingClientRect()
        const {
            left: l2,
            top: t2,
            right: r2,
            bottom: b2
        } = $to.getBoundingClientRect()

        if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) return false
        if (flag) return true  // true: 有交集, false: 继续判断交集面积

        const height = b1 - t1
        const l = Math.max(l1, l2)
        const t = Math.max(t1, t2)
        const r = Math.min(r1, r2)
        const b = Math.min(b1, b2)

        // 交集大于拖拽节点面积二分之一
        return Math.round((r - l) * (b - t)) > Math.round(width * height / 2)
    }

    moveDraggable = $overItem => {
        const index = nodeIndex(this.$dragItem)
        if (this.toIndex <= index) {
            this.moveItem($overItem, this.MOVE_RULE.BEFORE)
        } else {
            this.moveItem($overItem, this.MOVE_RULE.AFTER)
        }
    }

    moveItem($target, rule = this.MOVE_RULE.APPEND) {
        switch (rule) {
            case this.MOVE_RULE.PREPEND:
                prepend($target, this.$dragItem)
                break
            case this.MOVE_RULE.BEFORE:
                insertBefore($target, this.$dragItem)
                break
            case this.MOVE_RULE.AFTER:
                insertAfter($target, this.$dragItem)
                break
            default: // append
                $target.appendChild(this.$dragItem)
                break
        }

        this.emit('onDrop', rule)
    }

    bind() {
        on(this.$container, 'dragstart', prevent)
        on(this.$container, 'mousedown', this.onMouseDown)
        on(document, 'mouseup', this.onMouseUp)
        on(document, 'mousemove', this.onMove)
    }

    destroy() {
        off(this.$container, 'dragstart', prevent)
        off(this.$container, 'mousedown', this.onMouseDown)
        off(document, 'mouseup', this.onMouseUp)
        off(document, 'mousemove', this.onMove)
    }
}

if (typeof exports == 'undefined' && typeof define == 'undefined') {
    window.SortByDnd = SortByDnd
}
