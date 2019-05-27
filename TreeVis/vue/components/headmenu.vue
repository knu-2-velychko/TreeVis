<template>
    <div>
        <nav class="page-nav">
            <!-- use { name: 'user', params: { } } to pass parameters to view -->
            <router-link class="menu-link" :to="{ name: 'AVLTree'}"
                         v-on:click="changeTree('AVLTree')">AVL Tree
            </router-link>
            <!-- <router-link class="menu-link" :to="{ name: 'binary'}">Binary Tree</router-link> -->
            <router-link class="menu-link" :to="{ name: 'BinarySearchTree'}"
                         v-on:click="changeTree('BinarySearchTree')">Binary Search Tree
            </router-link>
            <router-link class="menu-link" :to="{ name: 'RedBlackTree'}"
                         v-on:click="changeTree('RedBlackTree')">Red Black Tree
            </router-link>
        </nav>
        <section class="page-body">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    module.exports = {
        name: "head-menu",
        methods: {
            changeTree: async function (treeType) {
                var currentTreeType = treeType;
                treeImplementation = getTreeImplementation(treeType);
            }
        }
    };
</script>

<style scoped>
    .page-nav {
        width: 100%;
        background: #ffc107;
        height: 50px;
        line-height: 50px;
        padding-top: 5px;
    }

    .page-nav:first-child:before {
        content: "Awesome Tree Visualization";
        font-weight: 700;
        font-size: 22px;
        padding: 0px 50px;
    }

    .menu-link {
        display: inline-block;
        padding: 0px 16px;
        color: #212121;
        text-decoration: none;
        transition: 0.3s background;
        font-weight: bold;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .menu-link.active,
    .menu-link:hover {
        background: #fefefe;
    }
</style>
