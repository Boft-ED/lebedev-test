import { defineStore } from 'pinia';
import type { AvatarPart, Avatar } from '@/common/interface'
import { isAvatarsEqual } from '@/common/utils'

export const useFavoritesStore = defineStore('favoritesStore', {
    state: (): { favoriteAvatars: Record<string, string | number>[] } => ({
        favoriteAvatars: JSON.parse(localStorage.getItem('favoriteAvatars') || '[]')
    }),
    actions: {
        addFavoriteAvatar(newAvatar: Record<string, string | number>): void {
            if (!this.favoriteAvatars.some(favAvatar => isAvatarsEqual(favAvatar, newAvatar))) {
                this.favoriteAvatars.push(newAvatar);
                this.updateLocalStorage();
            }
        },
        removeFavoriteAvatar(avatar: Record<string, string | number>): void {
            this.favoriteAvatars = this.favoriteAvatars.filter(favAvatar => favAvatar.id === avatar.id);
            this.updateLocalStorage();
        },
        updateLocalStorage(): void {
            localStorage.setItem('favoriteAvatars', JSON.stringify(this.favoriteAvatars));
        }
    },
});

export const useAvatarStore = defineStore('avatarStore', {
    state: () => ({
        currentAvatar: {
            face: null as string | null,
            eyes: null as string | null,
            mouth: null as string | null,
            hairstyle: null as string | null,
            bodyPerson: null as string | null,
            glasses: null as string | null,
            background: null as string | null,
            eyebrows: null as string | null,
            pet: null as string | null,
        }
    }),
    actions: {
        setAvatar(avatar: Avatar) {
            this.currentAvatar = avatar;
        },
        generateRandomAvatar() {
            const avatar: Avatar = {
                face: getRandomElement(avatarParts.faces),
                eyes: getRandomElement(avatarParts.eyes),
                mouth: getRandomElement(avatarParts.mouths),
                hairstyle: getRandomElement(avatarParts.hairstyles),
                bodyPerson: getRandomElement(avatarParts.bodyPerson),
                glasses: getRandomElement(avatarParts.glasses),
                background: getRandomElement(avatarParts.background),
                eyebrows: getRandomElement(avatarParts.eyebrows),
                pet: getRandomElement(avatarParts.pet),
            };
            this.setAvatar(avatar);
        }
    }
});

const avatarParts: AvatarPart = {
    faces: ['/src/assets/faces/face1.svg'],
    eyes: ['/src/assets/eyes/eyes1.svg', '/src/assets/eyes/eyes2.svg', '/src/assets/eyes/eyes3.svg', '/src/assets/eyes/eyes4.svg', '/src/assets/eyes/eyes5.svg'],
    mouths: ['/src/assets/mouths/mouth1.svg', '/src/assets/mouths/mouth2.svg', '/src/assets/mouths/mouth3.svg', '/src/assets/mouths/mouth4.svg', '/src/assets/mouths/mouth5.svg', '/src/assets/mouths/mouth6.svg', '/src/assets/mouths/mouth7.svg'],
    hairstyles: ['/src/assets/hairstyles/hair1.svg', '/src/assets/hairstyles/hair2.svg', '/src/assets/hairstyles/hair3.svg', '/src/assets/hairstyles/hair4.svg', '/src/assets/hairstyles/hair5.svg', '/src/assets/hairstyles/hair6.svg', '/src/assets/hairstyles/hair7.svg', '/src/assets/hairstyles/hair8.svg', '/src/assets/hairstyles/hair9.svg', '/src/assets/hairstyles/hair10.svg', '/src/assets/hairstyles/hair11.svg'],
    bodyPerson: ['/src/assets/bodyPerson/body1.svg', '/src/assets/bodyPerson/body2.svg', '/src/assets/bodyPerson/body3.svg', '/src/assets/bodyPerson/body4.svg', '/src/assets/bodyPerson/body5.svg', '/src/assets/bodyPerson/body6.svg'],
    glasses: ['/src/assets/glasses/glasses1.svg', '/src/assets/glasses/glasses2.svg', '/src/assets/glasses/glasses3.svg'],
    background: ['/src/assets/background/background1.svg', '/src/assets/background/background2.svg', '/src/assets/background/background3.svg'],
    eyebrows: ['/src/assets/eyebrows/eyebrows1.svg', '/src/assets/eyebrows/eyebrows2.svg', '/src/assets/eyebrows/eyebrows3.svg', '/src/assets/eyebrows/eyebrows4.svg', '/src/assets/eyebrows/eyebrows5.svg', '/src/assets/eyebrows/eyebrows6.svg'],
    pet: ['/src/assets/pet/pet1.svg', '/src/assets/pet/pet2.svg', '/src/assets/pet/pet3.svg'],
};

function getRandomElement(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}