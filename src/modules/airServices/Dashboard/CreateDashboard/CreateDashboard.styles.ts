export const styles = (theme: any) => ({
  createDashboardContainer: {
    borderBottom: '1px solid',
    borderColor: 'grey.700',
    mt: 2,
    mb: 3,
    pb: 3,
  },
  userCardOuter: {
    bgcolor: 'common.white',
    p: '1rem',
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'grey.700',
  },
  userCardInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  userAvatar: { width: 24, height: 24 },
  multiCheckboxContainer: { overflowY: 'scroll', pl: '1.25rem' },
  previewDashboardButton: {
    padding: '0px 1.4rem',
    fontWeight: '500',
    color: 'primary.main',
    '& path': {
      fill: theme?.palette?.primary?.main,
    },
  },
  detailsViewBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'grey.700',
    p: '1.25rem',
  },
  bgImageBox: { pointerEvents: 'none', userSelect: 'none' },
  buttonStyles: {
    padding: '0px 1.4rem',
    fontWeight: '500',
  },
});
