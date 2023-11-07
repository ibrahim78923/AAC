export const styles = {
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '0.625rem',
  },
  dialogBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  modelSizing: {
    '& .MuiDialog-container': {
      '& .MuiPaper-root': {
        width: '100%',
        maxWidth: '736px',
      },
    },
  },
};
