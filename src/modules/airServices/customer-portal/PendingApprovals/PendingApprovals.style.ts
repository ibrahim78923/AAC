export const styles = {
  mainWrapper: (palette: any) => ({
    p: '0.75rem 1rem 0.5rem',
    background: palette?.grey?.[0],
    borderRadius: '0.75rem',
    border: `1px solid ${palette?.grey?.[700]}`,
    mb: 1,
  }),
  approvalWrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    alignItems: { xs: 'start', lg: 'center' },
    justifyContent: 'space-between',
    gap: '0.75rem',
    pt: '0.5rem',
  },
  approvalTicket: (palette: any) => ({
    fontSize: 12,
    pl: '0.5rem',
    color: palette?.blue?.main,
  }),
  divider: (palette: any) => ({
    background: palette?.grey?.[700],
    width: { xs: '100%', lg: '1.5px' },
    height: { xs: '2px', lg: '1.5rem' },
  }),
};
