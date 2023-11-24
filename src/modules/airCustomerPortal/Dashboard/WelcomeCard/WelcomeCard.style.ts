export const styles = {
  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', xl: 'row' },
    alignItems: { xs: 'start', xl: 'center' },
    px: 2.4,
    py: 0.9,
    borderRadius: '0.75rem',
    backgroundColor: 'blue.main',
    gap: 1.6,
    backgroundRepeat: `no-repeat`,
    backgroundSize: '100% 110%',
  },
  ticketCardWrapper: {
    flexBasis: { xs: '100%', xl: '50%' },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 1.6,
    flexWrap: 'wrap',
  },
};
