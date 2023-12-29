export const styles = {
  logicBtnContainer: (palette: any) => ({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderBottom: `1px solid ${palette?.grey?.[700]}`,
    borderTop: `1px solid ${palette?.grey?.[700]}`,
    py: 1,
  }),
  logicOrButtons: (palette: any) => ({
    border: `1px solid ${palette?.grey?.[700]} !important`,
    borderRadius: '0 10px 10px 0 !important',
    p: '6px 16px !important',
    color: palette?.grey?.[900],
    '&.Mui-selected': {
      bgcolor: palette?.grey?.[0],
    },
    '&:hover': {
      bgcolor: palette?.grey?.[700],
    },
  }),
  logicAndButtons: (palette: any) => ({
    border: `1px solid ${palette?.grey?.[700]} !important`,
    borderRadius: '10px 0 0 10px !important',
    p: '6px 16px !important',
    color: palette?.grey?.[900],
    '&.Mui-selected': {
      bgcolor: palette?.grey?.[0],
    },
    '&:hover': {
      bgcolor: palette?.grey?.[700],
    },
  }),
  groupNumber: (palette: any) => ({
    p: '9px 11px',
    borderRadius: 1,
    color: palette?.common?.white,
    bgcolor: palette?.blue?.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};
