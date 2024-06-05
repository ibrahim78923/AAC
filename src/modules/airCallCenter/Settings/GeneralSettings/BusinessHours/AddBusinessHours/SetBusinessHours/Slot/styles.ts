export const styles = {
  slot: () => ({
    display: 'flex',
    padding: '16px 20px',
  }),
  content: () => ({
    flex: '1',
    display: 'flex',
  }),
  slotLabel: () => ({
    width: '104px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
  }),
  addMore: () => ({
    width: '125px',
    ml: '16px',
  }),
  timeField: () => ({
    width: '100px',
    '& .MuiFormControl-root.MuiTextField-root': {
      '& .MuiFormHelperText-root': {
        display: 'none',
      },
      '& .MuiInputAdornment-root': {
        display: 'none',
      },
    },
  }),
  toString: () => ({
    width: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
