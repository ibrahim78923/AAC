export const taskStyles: any = {
  headContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: { color: 'slateBlue.main', fontWeight: 500 },
  actionBtn: {
    px: '18px',
    color: 'custom.main',
    ':hover': { bgcolor: 'common.white' },
    border: '1px solid #D1D5DB',
    display: 'flex',
    alignItems: 'center',
    justifyContents: 'center',
  },
  addTaskBtn: {
    px: '18px',
    bgcolor: 'primary.main',
    color: 'common.white',
    ':hover': { bgcolor: 'primary.main' },
  },
  btnContainer: { display: 'flex', gap: '20px' },
};
