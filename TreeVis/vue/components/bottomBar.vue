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
        height: 32px;
        line-height: 32px;
        position: fixed;
        color: rgb(54, 54, 54);
        bottom: 0;
        background: #21212111;
    }
</style>
