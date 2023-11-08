export const styles: any = {
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: { color: 'slateBlue.main', fontWeight: 500 },
  actionBtn: {
    px: '1.125rem',
    color: 'custom.main',
    ':hover': { bgcolor: 'common.white' },
    border: '0.063rem solid grey.0',
    display: 'flex',
    alignItems: 'center',
    justifyContents: 'center',
  },
  addTicketBtn: {
    px: '1.125rem',
    bgcolor: 'primary.main',
    color: 'common.white',
    ':hover': { bgcolor: 'primary.main' },
  },
  btnContainer: {
    display: 'flex',
    gap: '1.25rem',
    justifyContent: { sm: 'flex-end', xs: 'center' },
  },
};
