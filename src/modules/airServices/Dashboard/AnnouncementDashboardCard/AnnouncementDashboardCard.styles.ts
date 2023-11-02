export const styles: any = {
  boxMain: (isborderbottom: boolean, theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    background: theme?.pallete?.common?.white,
    borderBottom: isborderbottom ? '0.063rem solid #E5E7EB' : '',
    flexShrink: 0,
    px: 2,
    height: 81,
  }),

  announcementText: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.pallete?.common?.[800],
    mt: 1,
  }),

  announcementTextOne: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: '#A0A3BD',
    mt: 1,
  },

  announcementTextTwo: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: theme?.pallete?.CUSTOM_COLORS?.main,
    display: 'flex',
  }),
};
