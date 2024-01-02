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

//=====debounce search

const DEBOUNCE_DELAY = 1000;
export const debouncedSearch = debounce((value: any, setSearchBy: any) => {
  setSearchBy(value);
}, DEBOUNCE_DELAY);

const getSession = () => {
  const sessionJSON = window.localStorage.getItem('session');

  if (sessionJSON) return JSON.parse(sessionJSON);
  return {};
};

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

export { getSession, setSession, isTokenValidationCheck };
