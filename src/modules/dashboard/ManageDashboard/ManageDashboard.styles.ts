export const styles = (matches: boolean) => ({
  createDashboardButton: {
    fontWeight: 500,
    fontSize: '1rem',
    p: '18px',
    width: matches ? '100%' : '202px',
  },
  tableBox: {
    border: '1px solid',
    borderColor: 'custom.off_white_three',
    borderRadius: '8px',
    mt: '24px',
  },
  tableHeaderBox: {
    p: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1.5,
  },
  filterButton: {
    fontWeight: 500,
    p: '12px',
    height: '36px',
    width: matches ? '100%' : '95px',
    color: 'custom.main',
    borderColor: '#D1D5DB !important',
  },
});
