export const styles = (matches: boolean) => ({
  createDashboardButton: {
    fontWeight: 500,
    fontSize: '1rem',
    p: '1.125rem',
    width: matches ? '100%' : 202,
    display: 'flex',
  },
  tableBox: {
    border: '1px solid',
    borderColor: 'custom.off_white_three',
    borderRadius: 2,
    mt: 3,
  },
  tableHeaderBox: {
    p: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1.5,
  },
  filterButton: {
    fontWeight: 500,
    p: '0.75rem',
    height: 36,
    width: matches ? '100%' : 95,
    color: 'custom.main',
    borderColor: '#D1D5DB !important',
  },
});
