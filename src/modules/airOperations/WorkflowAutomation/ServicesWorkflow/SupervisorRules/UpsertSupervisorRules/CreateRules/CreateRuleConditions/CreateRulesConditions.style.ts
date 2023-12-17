export const styles = {
  logicOrButtons: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey?.[700]} !important`,
    borderRadius: '0 12px 12px 0 !important',
    p: '6px 16px !important',
    color: 'grey.900',
    '&.Mui-selected': {
      bgcolor: 'primary.light',
      '&:hover': {
        bgcolor: 'primary.light',
      },
    },
  }),
  logicAndButtons: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey?.[700]} !important`,
    borderRadius: '12px 0 0 12px !important',
    p: '6px 16px !important',
    color: 'grey.900',
    '&.Mui-selected': {
      bgcolor: 'primary.light',
      '&:hover': {
        bgcolor: 'primary.light',
      },
    },
  }),
};
