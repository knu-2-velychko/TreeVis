<template>
    <div class="footer">
        Tree visualization website made by Sergei Yarema, Taya Velychko, Vladislav Tochanenko and Mykyta Oliinyk.
    </div>
</template>

<script>
module.exports = {
    name: 'bottom-bar'
}
</script>

<style scoped>
    .footer {
        padding-left: 16px;
        width: calc(100% - 16px);
        height: 50px;
        line-height: 50px;
        position: fixed;
        color: #BDBDBD;
        bottom: 0;
        background: #212121ee;
    }
</style>
