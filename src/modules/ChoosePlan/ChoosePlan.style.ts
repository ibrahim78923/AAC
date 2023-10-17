export const styles = {
  tableContainer: (theme: any) => ({
    border: `1px solid ${theme.palette.custom.off_white_two}`,
    borderRadius: '4px',
  }),
  table: (theme: any) => ({
    '& .MuiTableCell-root': {
      border: `1px solid ${theme.palette.custom.off_white_two}`,
    },
  }),
  tableHead: (theme: any) => ({
    '& th.MuiTableCell-root': {
      backgroundColor: '#F9FAFB',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.5',
      color: theme.palette.custom.main,
      p: '26px 16px',
    },
  }),
  productBoxTitle: (theme: any) => ({
    fontSize: '24px',
    lineHeight: '1.25',
    color: theme.palette.grey[800],
  }),
  planBox: (theme: any) => ({
    pt: '32px',
    pb: '32px',
    textAlign: 'center',
    '& .MuiTypography-h3': {
      color: 'slateBlue.main',
      mb: '28px',

      '& span': {
        fontSize: '14px',
        fontWeight: '400',
        color: theme.palette.custom.main,
      },
    },
  }),
  productBoxText: (theme: any) => ({
    color: theme.palette.custom.main,
  }),
  freeTrialBox: () => ({
    textAlign: 'center',
  }),
  planDetailText: () => ({
    '& .MuiTableCell-root': {
      textAlign: 'center',
    },
    '& .MuiTypography-root': {
      color: 'custom.main',
    },
  }),
  sideHeader: () => ({
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.555556',
    color: 'custom.main',
    p: '12px 32px',
  }),
  userIncludes: () => ({
    p: '6px 16px',
    textAlign: 'center',
    '& .MuiTypography-h6': {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '1.42857',
      color: 'slateBlue.main',
    },
    '& .MuiTypography-body2': {
      color: 'custom.main',
      fontSize: '14px',
      lineHeight: '1.42857',
    },
  }),
  salesActivities: () => ({
    p: '26px 32px',
    borderBottom: 'none',
    '& .MuiTypography-h6': {
      color: 'blue.dull_blue',
    },
  }),
  workflowCell: () => ({
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.555556',
    color: 'custom.main',
    textAlign: 'center',
  }),
};
