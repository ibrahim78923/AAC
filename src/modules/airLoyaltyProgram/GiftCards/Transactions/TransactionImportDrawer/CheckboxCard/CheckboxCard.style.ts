export const style = {
  cardWrapper: (palette: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    border: `1px solid ${palette?.primary?.main}`,
    bgcolor: `${palette?.primary?.main + 10}`,
    p: { xs: 1, md: 2.4 },
    px: 2,
    borderRadius: 2,
    cursor: 'pointer',
    boxShadow: 1,
    '&:hover': {
      border: `1px solid ${palette?.primary?.main}`,
    },
  }),
};
