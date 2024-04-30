export const isAvatarsEqual = (avatar1: Record<string, string | number>, avatar2: Record<string, string | number>): boolean => {
  return avatar1.id === avatar2.id;
}