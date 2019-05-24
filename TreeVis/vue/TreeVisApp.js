'use strict';
var AvlTree = httpVueLoader('./vue/components/avl.vue')
var BinaryTree = httpVueLoader('./vue/components/binary.vue')
var BinarySearchTree = httpVueLoader('./vue/components/binarySearch.vue')
var RedBlackTree = httpVueLoader('./vue/components/redBlack.vue')

var routes = [
    {
        path: '/avl',
        name: 'avl',
        component: AvlTree
    },
    {
        path: '/binary',
        name: 'binary',
        component: BinaryTree
    },
    {
        path: '/binary-search',
        name: 'binary-search',
        component: BinarySearchTree
    },
    {
        path: '/red-black',
        name: 'red-black',
        component: RedBlackTree
    }
];

var router = new VueRouter({
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

