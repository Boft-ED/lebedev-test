<template>
  <div id="avatar">
    <svg :ref="setSvgRef as VNodeRef" :width="IMAGE_WIDTH" :height="IMAGE_HEIGHT" xmlns="http://www.w3.org/2000/svg">
      <image :href="avatarStore.currentAvatar.background || ''" :x="backgroundX" :y="backgroundY"
        :width="backgroundWidth" :height="backgroundHeight" />
      <image :href="avatarStore.currentAvatar.face || ''" :x="faceX" :y="faceY" :width="faceWidth"
        :height="faceHeight" />
      <image :href="avatarStore.currentAvatar.eyes || ''" :x="eyesX" :y="eyesY" :width="eyesWidth"
        :height="eyesHeight" />
      <image :href="avatarStore.currentAvatar.mouth || ''" :x="mouthX" :y="mouthY" :width="mouthWidth"
        :height="mouthHeight" />
      <image :href="avatarStore.currentAvatar.eyebrows || ''" :x="eyebrowsX" :y="eyebrowsY" :width="eyebrowsWidth"
        :height="eyebrowsHeight" />
      <image :href="avatarStore.currentAvatar.glasses || ''" :x="glassesX" :y="glassesY" :width="glassesWidth"
        :height="glassesHeight" />
      <image :href="avatarStore.currentAvatar.hairstyle || ''" :x="hairstyleX" :y="hairstyleY" :width="hairstyleWidth"
        :height="hairstyleHeight" />
      <image :href="avatarStore.currentAvatar.bodyPerson || ''" :x="bodyPersonX" :y="bodyPersonY"
        :width="bodyPersonWidth" :height="bodyPersonHeight" />
      <image class="avatar-pet" :href="avatarStore.currentAvatar.pet || ''" :x="petX" :y="petY" :width="petWidth"
        :height="petHeight" />
    </svg>
    <div class="actions">
      <button @click="generateRandomAvatar" class="generate-btn">
        Обновить
      </button>
      <button @click="addToFavorites" class="favorites-btn">В избранное</button>
      <button @click="downloadImage" class="download-btn">Скачать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, type VNodeRef, type Ref } from 'vue'
import { useAvatarStore } from '@/store';
import { useFavoritesStore } from '@/store';
import { toPng } from 'html-to-image';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@/common/constants';
import type { ImageDimensions } from '@/common/interface';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const avatarStore = useAvatarStore();
const favoritesStore = useFavoritesStore();
const $toast = useToast();

const svgRef = ref<HTMLElement | null>(null);

const faceDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const eyesDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const mouthDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const hairstyleDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const bodyPersonDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const glassesDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const backgroundDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const eyebrowsDimensions = ref<ImageDimensions>({ width: 0, height: 0 });
const petDimensions = ref<ImageDimensions>({ width: 0, height: 0 });

const loadDimensions = async (imageUrl: string, target: Ref<ImageDimensions>) => {
  try {
    const img = new Image();
    img.onload = () => {
      target.value = { width: img.naturalWidth, height: img.naturalHeight };
    };
    img.src = imageUrl;
  } catch (error) {
    console.error('Не удалось загрузить размеры изображения:', error);
  }
};

watchEffect(() => {
  const { face, eyes, mouth, hairstyle, bodyPerson, glasses, background, eyebrows, pet } = avatarStore.currentAvatar;
  if (face) loadDimensions(face, faceDimensions);
  if (eyes) loadDimensions(eyes, eyesDimensions);
  if (mouth) loadDimensions(mouth, mouthDimensions);
  if (hairstyle) loadDimensions(hairstyle, hairstyleDimensions);
  if (bodyPerson) loadDimensions(bodyPerson, bodyPersonDimensions);
  if (glasses) loadDimensions(glasses, glassesDimensions);
  if (background) loadDimensions(background, backgroundDimensions);
  if (eyebrows) loadDimensions(eyebrows, eyebrowsDimensions);
  if (pet) loadDimensions(pet, petDimensions);
});

const faceWidth = computed(() => faceDimensions.value.width);
const faceHeight = computed(() => faceDimensions.value.height);
const eyesWidth = computed(() => eyesDimensions.value.width);
const eyesHeight = computed(() => eyesDimensions.value.height);
const mouthWidth = computed(() => mouthDimensions.value.width);
const mouthHeight = computed(() => mouthDimensions.value.height);
const hairstyleWidth = computed(() => hairstyleDimensions.value.width);
const hairstyleHeight = computed(() => hairstyleDimensions.value.height);
const bodyPersonWidth = computed(() => bodyPersonDimensions.value.width);
const bodyPersonHeight = computed(() => bodyPersonDimensions.value.height);
const glassesWidth = computed(() => glassesDimensions.value.width);
const glassesHeight = computed(() => glassesDimensions.value.height);
const backgroundWidth = computed(() => backgroundDimensions.value.width);
const backgroundHeight = computed(() => backgroundDimensions.value.height);
const eyebrowsWidth = computed(() => eyebrowsDimensions.value.width);
const eyebrowsHeight = computed(() => eyebrowsDimensions.value.height);
const petWidth = computed(() => petDimensions.value.width);
const petHeight = computed(() => petDimensions.value.height);

const faceX = computed(() => (IMAGE_WIDTH - faceWidth.value) / 2);
const faceY = computed(() => 125);
const eyesX = computed(() => (IMAGE_WIDTH - eyesWidth.value) / 2);
const eyesY = computed(() => 200);
const mouthX = computed(() => {
  if (mouthDimensions.value.height > 100) {
    return 136
  }

  return (IMAGE_WIDTH - mouthWidth.value) / 2
});
// 
const mouthY = computed(() => {
  if (mouthDimensions.value.height > 100) {
    return 175
  }

  return 225
});
const hairstyleX = computed(() => (IMAGE_WIDTH - hairstyleWidth.value) / 2);
const hairstyleY = computed(() => 58);
const bodyPersonX = computed(() => (IMAGE_WIDTH - bodyPersonWidth.value) / 2);
const bodyPersonY = computed(() => 297);
const glassesX = computed(() => (IMAGE_WIDTH - glassesWidth.value) / 2);
const glassesY = computed(() => 194);
const backgroundX = computed(() => (IMAGE_WIDTH - backgroundWidth.value) / 2);
const backgroundY = computed(() => 0);
const eyebrowsX = computed(() => (IMAGE_WIDTH - eyebrowsWidth.value) / 2);
const eyebrowsY = computed(() => 176);
const petX = computed(() => -230);
const petY = computed(() => 300);


const generateRandomAvatar = () => avatarStore.generateRandomAvatar();

const downloadImage = async () => {
  if (svgRef.value) {
    const dataUrl = await toPng(svgRef.value);
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'avatar.png';
    downloadLink.click();
  }
};

const addToFavorites = async () => {
  if (svgRef.value) {
    const dataUrl = await toPng(svgRef.value);
    const id = Math.floor(Math.random() * 100)
    favoritesStore.addFavoriteAvatar({ id, source: dataUrl });
    $toast.success('Добавлено в избранное!', { position: 'top-right' });
  }
};

const setSvgRef = (el: HTMLElement | null) => {
  svgRef.value = el;
};

onMounted(() => generateRandomAvatar());
</script>

<style>
.actions {
  position: absolute;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.actions button {
  text-decoration: none;
  color: #fff;
  padding: 5px 12px;
  border-radius: 4px;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
}

.actions .generate-btn {
  background: #fd4820;
  display: flex;
}

.actions .generate-btn::before {
  background-image: url("data:image/svg+xml,%3Csvg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.172 4.65646C11.7208 3.47137 10.8555 2.50433 9.73638 1.91685C8.5871 1.31355 7.25442 1.15566 5.97398 1.49776C3.20333 2.23803 1.55912 5.07775 2.30151 7.84047C3.04391 10.6032 5.89177 12.2427 8.66243 11.5024C9.98663 11.1486 11.0904 10.3038 11.7786 9.1531C11.8444 9.04315 11.906 8.93087 11.9635 8.81649C12.1024 8.53983 12.4224 8.39053 12.7126 8.49831C13.0035 8.60638 13.1538 8.93146 13.0198 9.21142C12.9356 9.38723 12.8433 9.55916 12.7431 9.72663C11.9067 11.1252 10.5625 12.154 8.95307 12.584C5.58336 13.4843 2.11971 11.4903 1.2168 8.13028C0.313891 4.77022 2.31363 1.3165 5.68334 0.416178C7.23952 0.000394627 8.86246 0.192686 10.2595 0.92602C11.5177 1.58649 12.5132 2.64347 13.0898 3.93889L13.7593 1.85048C13.8538 1.55561 14.1692 1.39297 14.4643 1.48701C14.76 1.58126 14.9231 1.89763 14.8284 2.1932L13.5739 6.10651L9.54487 5.2325C9.2424 5.16688 9.05053 4.86831 9.11651 4.56592C9.18237 4.26404 9.48032 4.07256 9.78229 4.13807L12.172 4.65646Z' fill='white' stroke='white' stroke-width='0.2' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  margin-right: 5px;
  content: '';
  display: block;
  width: 15px;
  height: 15px;
}


.actions .favorites-btn {
  background: red;
}

.actions .favorites-btn::after {
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.96475 5.16921L9.19995 3.89801L9.20891 3.85041C9.31587 3.28537 9.44243 2.60721 9.36739 2.02033C9.32987 1.73193 9.24587 1.48385 9.10083 1.28785C8.95803 1.09577 8.74411 0.935608 8.41203 0.841528C7.90803 0.699288 7.54683 0.812968 7.21643 1.07841C6.86195 1.36289 6.55059 1.81481 6.17931 2.36025L6.17651 2.36417C5.95307 2.69177 5.71171 3.04569 5.43731 3.38505C5.128 3.76455 4.80888 4.13596 4.48027 4.49889V14.1292H8.75307C9.57571 14.1292 10.6476 13.6958 11.5962 12.8933C12.5392 12.0953 13.3311 10.9574 13.6189 9.59153C14.1884 6.89009 12.2419 5.16921 10.6061 5.16921H8.96475ZM3.08027 14.1292V5.16921H0.801073C0.662949 5.16921 0.530481 5.22408 0.432812 5.32175C0.335143 5.41942 0.280273 5.55188 0.280273 5.69001V13.6084C0.280273 13.8962 0.513233 14.1292 0.801073 14.1292H3.08027Z' fill='white'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  margin-left: 5px;
  content: '';
  display: block;
  width: 13px;
  height: 13px;
}


.actions .download-btn {
  background-color: #000;
  border: 1px solid #fff;
}

.avatar-pet {
  transform: rotate(-20deg);
}

#avatar {
  position: relative;
  width: 440px;
  height: 440px;
  overflow: hidden;
  margin: 0 auto;
}

#avatar svg {
  position: absolute;
  width: 100%;
  height: 100%;
}

#avatar svg svg {
  display: none;
}

.show {
  display: block !important;
}
</style>
