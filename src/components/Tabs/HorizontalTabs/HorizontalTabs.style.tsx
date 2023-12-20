export const styles = {
  cardStyle: (spacing: any, disableBoxShadow: any, border: any) => {
    return {
      px: spacing,
      boxShadow: disableBoxShadow ? 'none' : undefined,
      border: border,
    };
  },
  circleIconStyle: { ml: 'auto', mt: 0.5, cursor: 'pointer' },
  tabRoot: (theme: any) => ({
    '.MuiTabScrollButton-root.Mui-disabled': { opacity: 1, color: 'grey.0' },
    '.MuiTab-root': { marginRight: `1rem !important` },
    borderBottom: 1,
    borderColor: theme?.palette?.primary?.lighter,
  }),

  tabIndicator: (theme: any) => ({
    sx: { background: theme?.palette?.primary?.main },
  }),
  tabsStyle: (theme: any) => ({
    paddingX: 2,
    borderRadius: '.5rem',
    color: theme?.palette?.grey?.[900],
    fontSize: '0.875rem',
    fontWeight: 500,
    '&.Mui-selected ': {
      fontWeight: 700,
      color: theme?.palette?.primary?.main,
      backgroundColor: theme?.palette?.primary?.lighter,
    },
  }),
};
