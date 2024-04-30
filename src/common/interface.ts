export interface AvatarPart {
  faces: string[];
  eyes: string[];
  mouths: string[];
  hairstyles: string[];
  bodyPerson: string[];
  glasses: string[];
  background: string[],
  eyebrows: string[],
  pet: string[];
}

export interface Avatar {
  face: string | null;
  eyes: string | null;
  mouth: string | null;
  hairstyle: string | null;
  bodyPerson: string | null;
  glasses: string | null;
  background: string | null;
  eyebrows: string | null;
  pet: string | null;
}

export interface ImageDimensions {
  width: number;
  height: number;
}