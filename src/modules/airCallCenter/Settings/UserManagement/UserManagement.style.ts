export const styles = {
  container: (theme: any) => ({
    borderRadius: '8px',
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
  }),
  header: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    p: '16px 24px 0',
  }),
  pageTitle: () => ({
    flex: '1',
  }),
  headerActions: () => ({
    ml: '16px',
  }),
  tabList: (theme: any) => ({
    p: '15px 24px',
    '& .MuiTabs-root': {
      borderBottom: `2px solid ${theme?.palette?.grey[700]}`,
      minHeight: '0',

      '& .MuiTabs-indicator': {
        display: 'none',
      },

      '& .MuiButtonBase-root.MuiTab-root': {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.42857',
        color: theme?.palette?.grey[900],
        margin: '0',
        p: '4px 16px',
        minHeight: '0',
        '&.Mui-selected': {
          fontWeight: '600',
          color: theme?.palette?.primary?.main,
        },
      },
    },
  }),
};
