export const styles = {
  xsQuickLinkBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.dark}`,
      display: { xs: 'flex', sm: 'none' },
      flexDirection: 'row',
      borderRadius: '4px',
      padding: { xs: '1px 4px', sm: '1px 8px' },
      cursor: 'pointer',
    };
  },
};
