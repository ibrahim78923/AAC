// ======================================================================

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// ======================================================================

const AUTH_ROOT_PAGE = '/auth';
const DASHBOARD_ROOT_PAGE = '/dashboard';

// ======================================================================

export const PATH_AUTH = {
  root: AUTH_ROOT_PAGE,
  login: path(AUTH_ROOT_PAGE, '/login'), // /auth/login
  register: path(AUTH_ROOT_PAGE, '/register'), // /auth/register
  forgotPassword: path(AUTH_ROOT_PAGE, '/forgot-password'),
  verify: path(AUTH_ROOT_PAGE, '/verify'),
};

// ======================================================================
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: DASHBOARD_ROOT_PAGE,
  user: {
    root: path(DASHBOARD_ROOT_PAGE, '/user'),
    profile: path(DASHBOARD_ROOT_PAGE, '/user/profil'),
    account: path(DASHBOARD_ROOT_PAGE, '/user/account'),
  },
};
