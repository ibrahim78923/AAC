export const styles = {
  createIconStyle: (theme: any) => ({
    color: theme?.palette?.common?.white,
    background: theme?.palette?.primary?.main,
    borderRadius: 2,
    padding: 0.25,
    opacity: 0,
    transition: 'opacity 1s ease',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
  }),
  arrowStyle: (theme: any) => ({
    color: theme?.palette?.common?.white,
    background: theme?.palette?.primary?.main,
    borderRadius: 2,
    cursor: 'pointer',
  }),
};
