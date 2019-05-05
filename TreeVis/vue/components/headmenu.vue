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

<style scoped>
.pageNav {
    width: 100%;
    background: #FFC107;
    height: 60px;
    line-height: 60px;
    padding-top: 5px;
}

.pageNav:first-child:before {
    content: 'Awesome Tree Visualization';
    font-weight: 700;
    padding: 0px 50px;
}

.menuLink {
    display: inline-block;
    padding: 0px 16px;
    color: #212121;
    text-decoration: none;
    transition: .3s background;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px; 
}

.menuLink.active, .menuLink:hover {
    background: #fefefe;
}
</style>
