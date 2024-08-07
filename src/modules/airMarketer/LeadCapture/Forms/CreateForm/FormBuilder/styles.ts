export const styles = {
  wrapper: () => ({
    position: 'relative',
    height: 'calc(100vh - 80px)',
    display: 'flex',
  }),

  content: () => ({
    flex: '1',
    padding: '30px',
    minWidth: '0',
  }),

  contentPaper: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
    p: '24px ',
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

  viewButtonMobile: (theme: any, desktopView: boolean) => ({
    borderRadius: '5px',
    margin: '0 5px',
    height: '26px',
    padding: '6px 10px',
    backgroundColor: !desktopView
      ? theme?.palette?.primary?.light
      : 'transparent',
    color: !desktopView
      ? theme?.palette?.primary?.main
      : theme?.palette?.grey[900],
  }),

  dropZone: (desktop: boolean) => ({
    transition: 'all 0.4s linear 0.1s ',
    maxWidth: desktop ? '660px' : '420px',
    boxShadow: '0px 0px 10px -2px rgba(0, 0, 0, 0.19);',
    borderRadius: '8px',
    margin: '0 auto',
    padding: '45px 15px',
    overflowY: 'auto',
    height: 'calc(100% - 72px)',
  }),

  sideBar: (theme: any) => ({
    '@media (min-width:1600px)': {
      width: '540px',
    },
    backgroundColor: theme?.palette?.common?.white,
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
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
