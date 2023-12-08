export const styles = {
  actionButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.dark}`,
      color: `${theme?.palette?.custom?.main}`,
      fontSize: '14px',
      fontWeight: 500,
      width: { lg: 'unset', md: 'unset', sm: 'unset', xs: '100%' },
    };
  },
  fiterButton: (theme: any) => {
    return {
      display: 'flex',
      alignContent: 'center',
      columnGap: '10px',
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom?.main}`,
      fontWeight: 500,
      fontSize: '14px',
    };
  },
  createFolderButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom?.main}`,
      display: 'flex',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 500,
    };
  },
  filterUserButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom?.main}`,
      display: 'flex',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 600,
    };
  },
  filterUserAnyButton: (theme: any) => {
    return {
      color: `${theme?.palette?.common?.white}`,
      display: 'flex',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 600,
    };
  },

  folderBackground: (theme: any) => {
    return {
      background: `${theme?.palette?.grey[400]}`,
      borderRadius: '4px',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },

  documentTitle: (theme: any) => {
    return {
      fontWeight: 500,
      color: `${theme?.palette?.grey[800]}`,
      textAlign: {
        lg: 'start',
        md: 'start',
        sm: 'start',
        xs: 'center',
      },
    };
  },
};
