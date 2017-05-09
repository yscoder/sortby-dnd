<template>
    <header class="docs-header">
        <div class="docs-header-content docs-container">
            <h1 class="docs-title">{{title}}</h1>
        </div>
    </header>
</template>
<script>
export default{
    props: ['title']
}
</script>
<style lang="less">
.docs- {
    &header {
        width: 100%;
        height: 200px;
        background: #3F51B5;

        &-content {
            padding-top: 60px;
            height: 100%;
            color: #fff;
        }
    }

    &title {
        text-align: center;
        font-size: 3em;
        font-weight: 500;
    }
}
</style>
