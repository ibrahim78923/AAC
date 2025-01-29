export const styles = {
  cpuCard: {
    border: '1px solid #D0D5DD',
    height: '186px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    overflow: 'hidden',
  },

  cupCardBody: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cupCardBodyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: '#98A2B3',
    fontSize: '20px',
    fontWeight: 'bold',
  },

  cpuCardStripe: {
    height: '9px',
    background: `repeating-linear-gradient(-55deg, #38CAB5, #38CAB5 32px, #ffffff 32px, #ffffff 36px)`,
  },
};
