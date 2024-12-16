export const styles = {
  menu: {
    '& .MuiList-root': {
      padding: '0',
    },
  },
  fieldItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 12px',
  },
  fieldIcon: {
    height: '30px',
    width: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createNewField: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme?.palette?.custom?.cloud_white,
    gap: '10px',
    padding: '10px 12px',
    mt: '6px',
  }),
  icon: {
    height: '18px',
    width: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid #292D32`,
    borderRadius: '50%',
  },
  plainItem: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-h6': {
      margin: '30px 0',
    },
  },
  search: {
    padding: '12px 12px 6px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};
