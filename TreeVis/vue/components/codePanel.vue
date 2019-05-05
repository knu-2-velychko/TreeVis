<template>
    <div class='sidePanel'>
        <h2>Custom code</h2>
        <textarea name="code" id="codeInput"></textarea>
    </div>
</template>

<script>
module.exports = {
    name: 'codepanel',
    methods: {

    }
}
</script>

<style scoped>
    .sidePanel {
        float: left;
        position: relative;
        width: 20%;
        height: 100%;
    }

    .sidePanel textarea {
        opacity: .5;
        width: 100%;
        height: 70%;
    }
</style>
