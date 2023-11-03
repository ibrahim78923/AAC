export const styles: any = {
  boxMain: (isborderbottom: boolean, theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 2,
    background: '#FFF',
    borderBottom: isborderbottom
      ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
      : '',
    flexShrink: 0,
    marginTop: 1,
  }),

  recentActivitiesTextBoldWord: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.palette?.custom?.bright,
  }),

  recentActivitiesText: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.palette?.grey?.[600],
  }),

  recentActivitiesTextPassword: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.palette?.grey?.[800],
  }),

  recentActivitiesTextDateTimeDetail: (theme: any) => ({
    fontSize: '0.625rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.palette?.grey?.[600],
    marginBottom: 1,
  }),
};
