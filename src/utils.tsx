import debounce from 'lodash.debounce';
import jwtDecode from 'jwt-decode';

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

const isTokenValidationCheck = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
export const convertIdToShortNumber = (mongodbId: string): any => {
  // Convert hexadecimal to decimal
  const decimalId = parseInt(mongodbId, 16);
  // Take modulo with a large prime number to get a unique five-digit number
  const uniqueFiveDigitNumber = decimalId % 99991; // 99991 is a prime number
  return uniqueFiveDigitNumber;
};

//=====debounce search

const DEBOUNCE_DELAY = 1000;
export const debouncedSearch = debounce((value: any, setSearchBy: any) => {
  setSearchBy(value);
}, DEBOUNCE_DELAY);

const getSession = () => {
  const sessionJSON = localStorage?.getItem('session');

  if (sessionJSON) return JSON.parse(sessionJSON);
  // return {};
};

// const setSession = (userData: any) => {
const setSession = (userData: any) => {
  if (userData) {
    localStorage.setItem('session', JSON.stringify(userData));
    // axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(authToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('session');
    // delete axios.defaults.headers.common.Authorization;
  }
};
const setActiveProductSession = (product: any) => {
  if (product) {
    localStorage.setItem('ActiveProduct', JSON.stringify(product));
  } else {
    localStorage.removeItem('ActiveProduct');
  }
};

const getActiveProductSession = () => {
  const sessionJSON = localStorage?.getItem('ActiveProduct');

  if (sessionJSON) return JSON.parse(sessionJSON);
  return {};
};

const setActivePermissionsSession = (permissions: any) => {
  if (typeof localStorage !== 'undefined') {
    if (permissions) {
      localStorage.setItem('ActivePermissions', JSON.stringify(permissions));
    } else {
      localStorage.removeItem('ActivePermissions');
    }
  }
};

const getActivePermissionsSession = () => {
  if (typeof localStorage !== 'undefined') {
    const sessionJSON = localStorage?.getItem('ActivePermissions');

    if (sessionJSON) return JSON.parse(sessionJSON);
    return [];
  }
};

const getActiveAccountSession = () => {
  if (typeof localStorage !== 'undefined') {
    const sessionJSON = localStorage?.getItem('ActiveAccount');

    if (sessionJSON) return JSON.parse(sessionJSON);
    return {};
  }
};

const setActiveAccountSession = (product: any) => {
  if (product) {
    localStorage.setItem('ActiveAccount', JSON.stringify(product));
  } else {
    localStorage.removeItem('ActiveAccount');
  }
};

export const stringArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  // Check if both arrays are of equal length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort the arrays to ensure that the order of elements doesn't affect the comparison
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Compare each element of the sorted arrays
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  // If all elements match, return true
  return true;
};

export {
  getSession,
  setSession,
  isTokenValidationCheck,
  setActiveProductSession,
  getActiveProductSession,
  setActivePermissionsSession,
  getActivePermissionsSession,
  getActiveAccountSession,
  setActiveAccountSession,
};
