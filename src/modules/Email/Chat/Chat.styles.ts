export const styles = {
  sendEmail: (theme: any) => ({
    color: theme.palette.grey[600],
    fontWeight: 600,
  }),
  emailDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: '10px',
    padding: '14px',
    marginTop: 1.2,
  },
  emailHeading: (theme: any) => ({
    color: theme.palette.blue.dull_blue,
    fontWeight: 600,
  }),
  headingWrap: { display: 'flex', flexDirection: 'column', gap: '8px' },
  emailInfo: (theme: any) => ({ color: theme.palette.custom.light }),
  emailsWrap: (theme: any) => ({
    background: theme.palette.grey[100],
    padding: '14px',
    borderRadius: '10px',
    marginBottom: 1,
  }),
  emails: (theme: any) => ({
    color: theme.palette.slateBlue.main,
    fontWeight: 600,
    lineHeight: '20px !important',
  }),
  emailDesc: (theme: any) => ({
    color: theme.palette.custom.main,
    display: 'block',
    paddingTop: 0.5,
  }),
  dealsWrap: (theme: any) => ({
    backgroundColor: theme.palette.grey[100],
    marginTop: 2,
    paddingY: '14px',
    textAlign: 'center',
  }),
};
