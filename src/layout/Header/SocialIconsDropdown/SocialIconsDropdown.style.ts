export const styles = {
  xsQuickLinkBox: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.custom.dark}`,
      display: { xs: 'flex', sm: 'none' },
      flexDirection: 'row',
      borderRadius: '6px',
      padding: '8px 0px 4px 0px',
    };
  },
};
