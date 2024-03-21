export const styles: any = {
  boxMain: (isBorderBottom: boolean, theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 2,
    background: theme?.palette?.common?.white,
    borderBottom: isBorderBottom
      ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
      : '',
  }),

  recentActivitiesTextBoldWord: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme?.palette?.custom?.bright,
  }),
};
