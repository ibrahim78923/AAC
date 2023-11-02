export const styles = {
  mainWrapper: (palette: any) => ({
    p: '0.75rem 1rem 0.5rem',
    background: palette?.grey?.[0],
    borderRadius: '0.75rem',
    border: `1px solid ${palette?.grey?.[700]}`,
    my: '0.75rem',
  }),
  approvalWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    pt: '0.5rem',
  },
  approvalTicket: (palette: any) => ({
    fontSize: 12,
    pl: '0.5rem',
    color: palette?.blue?.main,
  }),
};
