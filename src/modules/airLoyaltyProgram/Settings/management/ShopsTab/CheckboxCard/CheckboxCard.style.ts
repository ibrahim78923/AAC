export const style = {
  cardWrapper: (palette: any, checked: boolean) => ({
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: 2,
    border: checked
      ? `1px solid ${palette?.primary?.main}`
      : `1px solid ${palette?.custom?.pale_gray}`,
    bgcolor: checked ? `${palette?.primary?.main + 10}` : 'transparent',
    p: { xs: 1, md: 2.4 },
    borderRadius: 2.4,
    cursor: 'pointer',
    boxShadow: 1,
    '&:hover': {
      border: `1px solid ${palette?.primary?.main}`,
    },
  }),
};
