export const styles = {
  mainDiv: (theme: any) => ({
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
    height: '100vh',
    position: 'relative',
  }),

  headerBar: (theme: any) => ({
    px: '30px',
    backgroundColor: theme?.palette?.common?.white,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
    '@media (max-width:900px)': {
      height: 'fit-content',
      paddingY: '20px',
    },
  }),

  backBtn: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    marginRight: '20px',
    fontWeight: '500',
  }),

  saveChangesBtn: (theme: any) => ({
    color: theme?.palette?.success?.main,
    backgroundColor: theme?.palette?.graph?.published,
    width: 'fit-content',
    fontWeight: '500',
    padding: '7px 10px',
    borderRadius: '20px',
    cursor: 'pointer',
  }),

  formTitle: (theme: any) => ({
    backgroundColor: theme?.palette?.custom?.light_grayish_blue,
    borderRadius: '5px',
    '& input': {
      width: '80px',
      height: '6px',
      color: theme?.palette?.blue?.main,
      fontWeight: '500',
    },
    '@media (max-width:900px)': {
      marginY: '20px',
    },
  }),

  btnStyling: (theme: any) => ({
    borderRadius: '5px',
    border: `1px solid ${theme?.palette?.grey[0]}`,
    fontWeight: '500',
  }),

  formWrapper: () => ({
    padding: '30px',
  }),

  formContainer: (theme: any) => ({
    backgroundColor: theme?.palette?.common?.white,
    padding: '30px',
  }),

  viewSwitcher: (theme: any) => ({
    backgroundColor: theme?.palette?.grey[100],
    borderRadius: '5px',
    width: 'fit-content',
    margin: 'auto',
    padding: '10px',
    marginBottom: '35px',
    '@media (max-width:700px)': {
      marginTop: '45px',
    },
  }),

  formSideBar: (theme: any) => ({
    backgroundColor: theme?.palette?.common?.white,
    padding: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
  }),

  customField: (theme: any) => ({
    borderRadius: ' 8px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    marginTop: '25px',
    cursor: 'pointer',
  }),
};
