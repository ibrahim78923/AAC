export const styles: any = {
  accordionStyle: (theme: any) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    cursor: 'pointer',
    padding: '8px 16px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    outline: 'none',
    fontSize: '15px',
    borderRadius: '4px',
    marginTop: '24px',
    bottom: '1px',
  }),
  panelStyle: (isActive: boolean, theme: any) => ({
    paddingTop: '10px',
    display: isActive ? 'block' : 'none',
    backgroundColor: theme.palette.common.white,
    overflow: 'hidden',
  }),
};
