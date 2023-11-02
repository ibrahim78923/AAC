export const styles = {
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1.6,
    py: 1.6,
  },
  articleWrapper: (palette: any) => ({
    px: 1.2,
    py: 0.6,
    display: 'flex',
    alignItems: 'center',
    gap: 0.6,
    borderRadius: 1,
    background: palette?.grey?.[100],
    flexBasis: { xs: '100%', lg: '49%' },
  }),
};
