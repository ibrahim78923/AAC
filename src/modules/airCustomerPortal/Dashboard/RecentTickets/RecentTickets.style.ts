export const styles = {
  mainWrapper: (palette: any) => ({
    p: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: { xs: 'start', lg: 'center' },
    flexDirection: { xs: 'column', lg: 'row' },
    gap: 1.6,
    background: palette?.grey?.[0],
    borderRadius: '0.75rem',
    mb: 1,
  }),
  approvalWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    pt: '0.5rem',
  },
  processingBtn: {
    display: 'inline-block',
    p: '0.25rem 0.75rem',
    borderRadius: 216,
    backgroundColor: 'grey.400',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
};
