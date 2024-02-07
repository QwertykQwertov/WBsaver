<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="header-wrapper">
    <nav class="header-navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <div class="header-logo-wrapper">
      <img class="logo" src="../assets/logo.png" alt="WB saver" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: 50px;
  background-color: $base-color;
  display: flex;
  justify-content: space-between;
}
.header-navigation {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.header-logo-wrapper {
  flex:1;
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  color: white;
}
.logo {
  height: 40px;
  width: 80px;
}
</style>
