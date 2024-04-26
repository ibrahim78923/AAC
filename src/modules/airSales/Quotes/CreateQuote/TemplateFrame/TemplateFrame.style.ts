export const styles = {
  frame: (theme: any) => ({
    bgcolor: `${theme?.palette?.common?.white}`,
    borderRadius: '6px',
    boxShadow: '0px 2px 32px 0px rgba(0,0,0,0.06)',
  }),
  header: (theme: any) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    p: '6px',
    borderBottom: `1px solid ${theme?.palette?.custom?.light_greyish}`,
    position: 'relative',
  }),
  headerText: (theme: any) => ({
    color: `${theme?.palette?.custom?.lighter}`,
    fontSize: '14px',
    bgcolor: `${theme?.palette?.custom?.white_fifty}`,
    p: '0 24px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
  }),
  body: () => ({
    height: '640px',
    overflowY: 'auto',
  }),
  dots: (theme: any) => ({
    display: 'flex',
    position: 'absolute',
    height: '12px',
    left: '30px',
    top: '50%',
    mt: '-6px',
    '& > span': {
      height: '12px',
      width: '12px',
      borderRadius: '50%',
      ml: '8px',
      '&:first-of-type': {
        bgcolor: `${theme?.palette?.custom?.custom_red}`,
        ml: '0',
      },
      '&:nth-child(2)': {
        bgcolor: `${theme?.palette?.custom?.super_nova}`,
      },
      '&:nth-child(3)': {
        bgcolor: `${theme?.palette?.custom?.lime_green}`,
      },
    },
  }),
};
