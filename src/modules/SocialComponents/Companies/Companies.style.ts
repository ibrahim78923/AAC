export const styles = {
  mainCompanyBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.light_lavendar_gray}`,
      boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
      borderRadius: '8px',
      padding: '1rem',
    };
  },
  importButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom.main}`,
      display: 'flex',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 600,
    };
  },
  createButton: (theme: any) => {
    return {
      color: `${theme?.palette?.common.white}`,
      display: 'flex',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 500,
    };
  },
  actionButton: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[0]}`,
      height: '36px',
      color: `${theme?.palette?.custom?.main}`,
    };
  },
};
