<template>
  <div class="favorites-images">
    <h2>Избранные изображения</h2>
    <div v-if="uniqueFavoriteImages.length === 0">
      <p>Нет избранных изображений.</p>
    </div>
    <div class="favorites-content" v-else>
      <div class="favorites-item" v-for="(avatar, index) in uniqueFavoriteImages" :key="index">
        <img :src="avatar.source" alt="">
        <div class="favorites-action">
          <button @click="deleteFromFavorites(index)" class="favorites-btn">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useFavoritesStore } from '@/store';
const favoritesStore = useFavoritesStore();

const $toast = useToast();

const getFavoriteAvatarsFromLocalStorage = (): Record<string, string | number>[] => {
  const favoriteAvatarsStr = localStorage.getItem('favoriteAvatars');
  if (favoriteAvatarsStr) {
    return JSON.parse(favoriteAvatarsStr);
  }
  return [];
};

const uniqueFavoriteImages = ref(getFavoriteAvatarsFromLocalStorage());

const deleteFromFavorites = (index: number) => {
  uniqueFavoriteImages.value.splice(index, 1);
  localStorage.setItem('favoriteAvatars', JSON.stringify(uniqueFavoriteImages.value));
  console.log(uniqueFavoriteImages.value);
  $toast.success('Успешно удалили!', { position: 'top-right' });
  favoritesStore.removeFavoriteAvatar(uniqueFavoriteImages.value[index])
};
</script>

<style scoped>
.favorites-images {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorites-content {
  display: flex;
  flex-wrap: wrap;
}

.favorites-item img {
  width: 220px;
  height: 220px;
}

.favorites-item {
  margin-right: 20px;
}

.favorites-item:last-child {
  margin-right: 0;
}

.favorites-action {
  position: relative;
  bottom: 35px;
  display: flex;
  justify-content: center;
}

.favorites-action button {
  border-radius: 4px;
  background-color: #000;
  border: 1px solid #fff;
  color: #fff;
  padding: 4px 8px;
}
</style>
