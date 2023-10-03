export const styles = {
  parentBox: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '580px',
    width: '100%',
    border: '1px solid #E5E7EB',
    boxShadow: '0px 4px 24px -4px rgba(16, 24, 40, 0.02)',
    margin: 'auto',
    minHeight: '190px',
    padding: '24px',
    '@media (max-width:581px)': {
      maxWidth: '100%',
      margin: '0 12px',
    },
  },
};
