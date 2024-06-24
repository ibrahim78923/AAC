export const styles = {
  mainDiv: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    boxShadow: '0px 1px 2px 0px #1018283d',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '25px',
  }),
  innerBox: {
    padding: '10px',
    margin: '10px',
    height: 210,
    boxShadow: '0px 0px 10px 0px #0000001A',
    borderRadius: 2,
    textAlign: 'center',
    position: 'relative',
    transition: 'all 0.1s linear',
    '&:hover': {
      borderBottom: '8px solid',
      borderColor: 'primary.main',
    },
  },
};
