export const styles = {
  main: () => ({
    display: 'flex',
    height: '100%',
  }),
  sidebar: (theme: any) => ({
    width: '276px',
    radius: '8px 0 0 8px',
    borderRight: `1px solid ${theme?.palette?.graph?.slate_gray}`,
    height: '100%',
  }),
  submenuItem: () => ({
    pl: '24px',
    '& .MuiListItemText-root': {
      '& > span': {
        fontSize: '12px',
      },
    },
  }),

  content: () => ({
    flex: '1',
  }),
};
