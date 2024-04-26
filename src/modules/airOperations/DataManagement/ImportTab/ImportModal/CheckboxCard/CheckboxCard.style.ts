export const style = {
  cardWrapper: (palette: any, checked: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    border: checked
      ? `1px solid ${palette?.primary?.main}`
      : '1px solid transparent',
    bgcolor: checked ? `${palette?.primary?.main + 10}` : 'transparent',
    p: { xs: 1, md: 2.4 },
    borderRadius: 2,
    cursor: 'pointer',
    boxShadow: 1,
    '&:hover': {
      border: `1px solid ${palette?.primary?.main}`,
    },
  }),
};
