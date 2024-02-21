export const styles = {
  channelsBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '16px',
    borderRadius: '20px',
    background: '#FAFAFA',
    margin: '20px 0px',
    width: '100%',
    justifyContent: 'space-between',
    padding: '17px 38px',
    '@media (max-width:500px)': {
      padding: '17px 10px',
      gap: '5px',
    },
  },
  subChannels: {
    borderRadius: '20px',
    border: '1px solid rgba(31, 48, 93, 0.09)',
    padding: '17px 60px',
    display: 'inline-flex',
    gap: '15px',
    width: '100%',
    alignItems: 'center',
    overflowY: 'scroll',
    justifyContent: 'space-between',
    '@media (max-width:500px)': {
      padding: '17px 10px',
    },
  },
};
