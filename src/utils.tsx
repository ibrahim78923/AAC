import debounce from 'lodash.debounce';

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
  const sessionJSON = window?.localStorage?.getItem('session');

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

export { getSession, setSession };
