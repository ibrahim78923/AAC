export const styles = {
  cont: () => ({
    p: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      display: 'block',
    },
  }),
  headerLeft: () => ({
    flex: '1',
    display: 'flex',
  }),
  headerRight: () => ({
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      mt: '16px',
    },
  }),
};
