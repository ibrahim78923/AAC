import { FILE_MAX_SIZE, IMG_URL } from '@/config';
import { FILE_TYPE_BASED_IMAGES } from '@/constants/images';
import { ARRAY_INDEX } from '@/constants/strings';

const colorLoop = (str: string = '') => {
  let a = 1;
  let b = 0;
  let i = 0;
  const l = str?.length;
  const m = 65521;
  for (; i < l; i++) {
    a = (a + str?.charCodeAt(i)) % m;
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
  return `${firstName?.[ARRAY_INDEX?.ZERO] ?? ''} ${
    lastName?.[ARRAY_INDEX?.ZERO] ?? ''
  }`;
};

export const generateImage = (imgSrc?: any) => {
  if (!!!imgSrc) {
    return '';
  }
  return `${IMG_URL}${imgSrc}`;
};

export const generateRandomNumbers = (min: any, max: any, precision: any) => {
  const result = [];
  for (let i = 0; i <= 22; i++) {
    const randomNumber = (Math?.random() * (max - min) + min)?.toFixed(
      precision,
    );
    result?.push(parseFloat(randomNumber));
  }
  return result;
};

export const formatFileSize = (fileSize = 0) => {
  const MARKER = 1024;
  const DECIMAL = 2;
  const KILO_BYTES = MARKER;
  const MEGA_BYTES = MARKER * MARKER;

  if (!!!fileSize) return;
  if (fileSize < KILO_BYTES) return fileSize + ' KB';
  if (fileSize < MEGA_BYTES)
    return (fileSize / KILO_BYTES).toFixed(DECIMAL) + ' MB';
  return (fileSize / MEGA_BYTES).toFixed(DECIMAL) + ' GB';
};

export const getImageByType = (data: any, imageUrl = data?.fileUrl) => {
  return (
    FILE_TYPE_BASED_IMAGES?.[data?.fileType]?.src || generateImage(imageUrl)
  );
};

export const getInitialsSingleName = (name: any) => {
  if (!name) return '-';
  const initials = name
    ?.split(' ')
    ?.map((n: any) => n[ARRAY_INDEX?.ZERO])
    ?.join('')
    ?.toUpperCase();
  return initials?.substring(0, 2);
};

export const uploadFileMaxSize =
  FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE / (1024 * 1024);
