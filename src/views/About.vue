<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="nav">
      <router-link to="/about/child1">Child1</router-link> |
      <router-link to="/about/child2">Child2</router-link>
    </div>
    <router-view/>
  </div>
</template>
