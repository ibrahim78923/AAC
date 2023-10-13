export const styles = {
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px 0 rgba(107, 114, 128, 0.1)',
    p: '20px',
    borderRadius: '8px',
    '&:not(:first-child)': {
      mt: '20px',
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  cardHeaderIcon: {
    display: 'flex',
    height: '40px',
    width: '40px',
    backgroundColor: 'primary.lighter',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
    mr: '24px',
  },
  cardHeaderAction: {
    ml: 'auto',
  },
  divider: (theme: any) => ({
    borderTop: `1px solid ${theme.palette.custom.off_white_one}`,
    margin: '24px 0',
  }),
  planSelectionRow: {
    display: 'flex',
  },
  planSelectionForm: {
    flex: '1',
  },
  planTableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    p: '4px 0',
  },
  planTableTd: (theme: any) => ({
    color: theme.palette.custom[1],
    fontSize: '16px',
    lineHeight: '1.5',
  }),
  planTableTdBold: (theme: any) => ({
    color: theme.palette.slateBlue.main,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.5',
  }),
  planTableTh: (theme: any) => ({
    color: theme.palette.slateBlue.main,
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: 1.5555556,
    textAlign: 'right',
  }),
  updateSubscription: (theme: any) => ({
    borderTop: `1px solid ${theme.palette.custom.off_white_one}`,
    mt: '110px',
    pt: '24px',
    justifyContent: 'flex-end',
  }),
  cancelButton: (theme: any) => ({
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.custom[1],
  }),
};
