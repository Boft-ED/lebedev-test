<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <RouterLink to="/">Домой</RouterLink>
        <RouterLink to="/favorites">Избранное</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  margin: 20px 0;
}

header nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

header nav a:last-child {
  margin-right: 0;
}
</style>
