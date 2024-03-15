import { IMG_URL } from '@/config';

const colorLoop = (str: string) => {
  let a = 1;
  let b = 0;
  let i = 0;
  const l = str.length;
  const m = 65521;
  for (; i < l; i++) {
    a = (a + str.charCodeAt(i)) % m;
    b = (b + a) % m;
  }
  return (b << 16) | a;
};
export const generateColorFromName = (name: string) => {
  const hash = colorLoop(name);
  const r = (hash & 0xff0000) >> 17;
  const g = (hash & 0x00ff00) >> 3;
  const b = hash & (0x0000ff >> 1);
  return `rgb(${r},${g},${b})`;
};

export const truncateText = (text = '---', sliceLimit = 20) => {
  return text?.length > sliceLimit
    ? `${text?.slice?.(0, sliceLimit)} ...`
    : text;
};

export const fullName = (firstName?: any, lastName?: any) => {
  if (!!!firstName && !!!lastName) return 'None';
  return `${firstName ?? ''} ${lastName ?? ''}`;
};

export const fullNameInitial = (firstName?: any, lastName?: any) => {
  if (!!!firstName && !!!lastName) return '-';
  return `${firstName?.[0] ?? ''} ${lastName?.[0] ?? ''}`;
};

export const generateImage = (imgSrc?: any) => {
  return `${IMG_URL}${imgSrc}`;
};

export const formatFileSize = (fileSize = 0) => {
  const MARKER = 1024;
  const DECIMAL = 2;
  const KILO_BYTES = MARKER;
  const MEGA_BYTES = MARKER * MARKER;

  if (fileSize < KILO_BYTES) return fileSize + ' B';
  if (fileSize < MEGA_BYTES)
    return (fileSize / KILO_BYTES).toFixed(DECIMAL) + ' KB';
  return (fileSize / MEGA_BYTES).toFixed(DECIMAL) + ' MB';
};
