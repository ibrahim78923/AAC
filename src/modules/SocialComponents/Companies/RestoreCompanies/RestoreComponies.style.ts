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
  mainCompanyBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.light_lavendar_gray}`,
      boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
      borderRadius: '8px',
      padding: '1rem',
    };
  },
};
