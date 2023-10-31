export const styles = {
  card: (theme: any) => ({
    backgroundColor: '#F7F9FB',
    border: `1px solid ${theme.palette.grey[700]}`,
    borderRadius: '10px',
    height: '616px',
  }),
  cardHeader: () => ({
    backgroundColor: 'common.white',
    borderRadius: '10px 10px 0 0',
    p: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 3px 6px 0px #6B72801A',
  }),
  cardHeaderLeft: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  dealsNumber: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24px',
    minWidth: '24px',
    backgroundColor: 'secondary.main',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1.5',
    p: '3px 4px',
    color: 'common.white',
    ml: '6px',
  }),
  cardHeaderRight: () => ({
    ml: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }),
  totalAmount: () => ({
    fontSize: '12px',
    color: 'blue.main',
    '& > span': {
      fontWeight: '700',
    },
  }),
  dealsPercentage: () => ({
    backgroundColor: 'secondary.main',
    fontSize: '8px',
    color: 'common.white',
    p: '2px 4px',
    borderRadius: '3px',
    mt: '2px',
  }),
  cardBody: () => ({
    p: '16px',
  }),
};
