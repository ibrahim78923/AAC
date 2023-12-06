export const styles = {
  mainDiv: {
    background: '#F7F9FB',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  subDiv: {
    backgroundColor: 'white',
    height: '90vh',
    width: '80%',
    boxShadow: '0px 0px 12.11678px -2.42336px rgba(0, 0, 0, 0.19)',
    borderRadius: '8px',
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  innerBox: {
    width: '50%',
    boxShadow:
      '0px 2.42336px 4.84671px -2.42336px rgba(16, 24, 40, 0.06), 0px 4.84671px 9.69342px -2.42336px rgba(16, 24, 40, 0.10)',
    marginTop: '50px',
    padding: '40px',
    height: 'fit-content',
    '@media (max-width:500px)': {
      width: '100%',
      boxShadow: 'none',
    },
  },
};
