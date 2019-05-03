<template>
    <div>
        <nav class="pageNav">
            <!-- use { name: 'user', params: { } } to pass parameters to view -->
            <router-link class="menuLink" :to="{ name: 'avl'}">AVL Tree</router-link>
            <router-link class="menuLink" :to="{ name: 'binary'}">Binary Tree</router-link>
            <router-link class="menuLink" :to="{ name: 'binarySearch'}">Binary Search Tree</router-link>
            <router-link class="menuLink" :to="{ name: 'redBlack'}">Red Black Tree</router-link>
        </nav>  
        <section class="pageBody">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
module.exports = {
    name: 'headmenu'
}
</script>
