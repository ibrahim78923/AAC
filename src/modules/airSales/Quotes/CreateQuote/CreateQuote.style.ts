export const styles = {
  stepperButtons: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    pt: '24px',
    mt: '24px',
    borderTop: `1px solid ${theme?.palette?.grey[700]}`,
    flexWrap: 'Wrap',
    justifyContent: 'space-between',
    '@media (max-width:360px)': {
      justifyContent: 'end',
    },
  }),
  btnBack: (theme: any) => ({
    borderColor: theme?.palette?.custom?.dark,
    color: theme?.palette?.custom?.main,
    '&:hover': {
      borderColor: theme?.palette?.custom?.dark,
    },
    '@media (max-width:560px)': {
      marginBottom: '10px !important',
    },
  }),
};
