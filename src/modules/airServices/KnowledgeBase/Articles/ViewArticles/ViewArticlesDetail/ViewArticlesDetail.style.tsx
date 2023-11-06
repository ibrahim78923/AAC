export const styles = {
  desStyle: (des: any, theme: any) => ({
    bgcolor: des === 'Published' ? theme?.palette?.blue?.main : null,
    color:
      des === 'Published'
        ? theme?.palette?.common?.white
        : des === 'Training'
        ? theme?.palette?.primary?.main
        : theme?.palette?.grey?.[600],
    p: '4px 12px',
    borderRadius: des === 'Published' ? 6 : null,
  }),
  keywordStyle: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    color: theme?.palette?.custom?.main,
    bgcolor: theme?.palette?.grey?.[0],
    p: '4px 12px',
    borderRadius: 4,
    width: 'fit-content',
  }),
  sideStyle: (theme: any) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderLeft: { lg: `1px solid ${theme?.palette?.grey?.[700]}`, xs: null },
    borderTop: { lg: null, xs: `1px solid ${theme?.palette?.grey?.[700]}` },
    height: '100%',
    pl: { lg: 2, xs: 0 },
  }),
};
