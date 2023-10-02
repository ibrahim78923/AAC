export const tableContainer = (theme: any) => ({
  border: `1px solid ${theme.palette.custom.off_white2}`,
  borderRadius: '4px',
});

export const tableStyle = (theme: any) => ({
  '& .MuiTableCell-root': {
    border: `1px solid ${theme.palette.custom.off_white2}`,
  },
});

export const tableHeadStyle = (theme: any) => ({
  '& th.MuiTableCell-root': {
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.5',
    color: theme.palette.custom.main,
    p: '26px 16px',
  },
});

export const productBoxTitleStyle = (theme: any) => ({
  fontSize: '24px',
  lineHeight: '1.25',
  color: theme.palette.grey[800],
});

export const productBoxTextStyle = (theme: any) => ({
  color: theme.palette.custom.main,
});

export const planBoxStyle = (theme: any) => ({
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
});

export const freeTrialBoxStyle = () => ({
  textAlign: 'center',
});
