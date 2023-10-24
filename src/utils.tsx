import debounce from 'lodash.debounce';

import { AES, enc } from 'crypto-js';

export function isNullOrEmpty(
  value: string | null | undefined | unknown[] | Record<string, unknown>,
): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
}

//=====debounce search

const DEBOUNCE_DELAY = 1000;
export const debouncedSearch = debounce((value: any, setSearchBy: any) => {
  setSearchBy(value);
}, DEBOUNCE_DELAY);

const setEncryptObject = (key: string, userData: any, secretKey: string) => {
  const ciphertext = AES.encrypt(
    JSON.stringify(userData),
    secretKey,
  ).toString();
  localStorage.setItem(key, ciphertext);
};

const getDecryptedObject = (key: string, secretKey: string) => {
  const ciphertext = localStorage.getItem(key);
  if (ciphertext) {
    const bytes = AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(enc.Utf8);
    const jsonData = JSON.parse(decryptedData);

    try {
      return jsonData;
    } catch (error) {
      return error;
    }
  }
  return null;
};

export { setEncryptObject, getDecryptedObject };
