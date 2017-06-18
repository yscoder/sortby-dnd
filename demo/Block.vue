<template>
    <section class="docs-example">
        <h2 class="docs-example-title">{{title}}</h2>
        <div class="docs-card">
            <slot></slot>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        title: String
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
    }

    &card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 3px; // box-shadow: 0 0 3px rgba(0, 0, 0, .1)
    }
}
</style>
