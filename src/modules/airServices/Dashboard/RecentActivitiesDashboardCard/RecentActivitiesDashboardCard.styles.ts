export const styles: any = {
  boxMain: (isborderbottom: boolean, theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 2,
    background: theme.palette.common.white,
    borderBottom: isborderbottom
      ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
      : '',
    marginTop: 1,
  }),

  recentActivitiesTextBoldWord: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme?.palette?.custom?.bright,
  }),

  recentActivitiesText: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme?.palette?.grey?.[600],
  }),

  recentActivitiesTextPassword: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme?.palette?.grey?.[800],
  }),

  recentActivitiesTextDateTimeDetail: (theme: any) => ({
    fontSize: '0.625rem',
    color: theme?.palette?.grey?.[600],
    marginBottom: 1,
  }),
};
