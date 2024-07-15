export const styles = {
  wrapper: () => ({}),

  // content: () => ({
  //   flex: '1',
  //   padding: '30px',
  //   minWidth: '0',
  // }),

  contentPaper: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
    backgroundColor: theme?.palette?.common?.white,
    height: '100%',
    borderRadius: '10px',
  }),

  viewSwitcher: (theme: any) => ({
    backgroundColor: theme?.palette?.custom?.light_white_bg,
    border: `1px solid ${theme?.palette?.custom?.light_gray_bg}`,
    p: '8px, 11px',
    borderRadius: '6px',
    boxShadow: `0px 9px 16px 0px rgba(245, 250, 255, 0.04)`,
    width: 'fit-content',
    margin: 'auto',
    padding: '10px',
    mb: '24px',
  }),

  viewButtonDesktop: (theme: any, desktopView: boolean) => ({
    borderRadius: '5px',
    margin: '0 5px',
    height: '26px',
    padding: '6px 10px',
    backgroundColor: desktopView
      ? theme?.palette?.primary?.light
      : 'transparent',
    color: desktopView
      ? theme?.palette?.primary?.main
      : theme?.palette?.grey[900],
  }),

  dropZone: () => ({
    borderRadius: '8px',
    margin: '0 auto',
    padding: '15px',
    overflowY: 'auto',
    minHeight: '60vh',
    paddingBottom: '10vh',
  }),

  sideBar: (theme: any) => ({
    backgroundColor: theme?.palette?.common?.white,
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    minHeight: '70vh',
    overflowY: 'auto',
    position: 'sticky',
    top: '60px',
  }),

  formContainer: (theme: any) => ({
    backgroundColor: theme?.palette?.common?.white,
    padding: '30px',
  }),

  customField: (theme: any) => ({
    borderRadius: ' 8px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    marginTop: '25px',
    cursor: 'pointer',
  }),
};
