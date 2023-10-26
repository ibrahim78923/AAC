export const styles = {
  moduleCreationMain: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
    };
  },
  subModuleHeader: (theme: any) => {
    return {
      background: theme.palette.blue.main,
      borderRadius: '8px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 20px',
      justifyContent: 'space-between',
    };
  },
  tableLink: (theme: any) => {
    return {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    };
  },
};
