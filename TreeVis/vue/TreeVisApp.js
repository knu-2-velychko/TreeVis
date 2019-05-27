'use strict';
var AvlTree = httpVueLoader('./vue/components/AVLTree.vue')
var BinaryTree = httpVueLoader('./vue/components/binary.vue')
var BinarySearchTree = httpVueLoader('./vue/components/binarySearch.vue')
var RedBlackTree = httpVueLoader('./vue/components/redBlack.vue')

var routes = [
    {
        path: '/AVLTree',
        name: 'AVLTree',
        component: AvlTree
    },
    {
        path: '/binary',
        name: 'binary',
        component: BinaryTree
    },
    {
        path: '/BinarySearchTree',
        name: 'BinarySearchTree',
        component: BinarySearchTree
    },
    {
        path: '/RedBlackTree',
        name: 'RedBlackTree',
        component: RedBlackTree
    }
];

var router = new VueRouter({
    hashbang: false,
    history: true,
    routes: routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
});

var app = new Vue({

    el: '#app',
    router: router,
    components: {
        'head-menu': httpVueLoader('./vue/components/headmenu.vue'),
        'bottom-bar': httpVueLoader('./vue/components/bottomBar.vue')
    }
});

