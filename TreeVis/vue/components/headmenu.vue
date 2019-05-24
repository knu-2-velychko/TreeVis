<template>
    <div>
        <nav class="page-nav">
            <!-- use { name: 'user', params: { } } to pass parameters to view -->
            <router-link class="menu-link" :to="{ name: 'avl'}">AVL Tree</router-link>
            <router-link class="menu-link" :to="{ name: 'binary'}">Binary Tree</router-link>
            <router-link class="menu-link" :to="{ name: 'binary-search'}">Binary Search Tree</router-link>
            <router-link class="menu-link" :to="{ name: 'red-black'}">Red Black Tree</router-link>
        </nav>  
        <section class="page-body">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    module.exports = {
        name: 'head-menu'
    }
</script>

<style scoped>
    .page-nav {
        width: 100%;
        background: #FFC107;
        height: 50px;
        line-height: 50px;
        padding-top: 5px;
    }

    .page-nav:first-child:before {
        content: 'Awesome Tree Visualization';
        font-weight: 700;
        padding: 0px 50px;
    }

    .menu-link {
        display: inline-block;
        padding: 0px 16px;
        color: #212121;
        text-decoration: none;
        transition: .3s background;
        font-weight: bold;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px; 
    }

    .menu-link.active, .menu-link:hover {
        background: #fefefe;
    }
</style>
