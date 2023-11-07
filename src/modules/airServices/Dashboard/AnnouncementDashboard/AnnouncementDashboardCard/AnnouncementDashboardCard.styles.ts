export const styles: any = {
  boxMain: (isborderbottom: boolean, theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    background: theme?.palette?.common?.white,
    borderBottom: isborderbottom
      ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
      : '',
    flexShrink: 0,
    px: 2,
    height: 76,
  }),

  announcementText: (theme: any) => ({
    color: theme?.palette?.common?.[800],
    mt: 1,
  }),

  announcementTextOne: {
    color: '#A0A3BD', //This color is not available in palette
    mt: 1,
  },

  announcementTextTwo: (theme: any) => ({
    fontWeight: 600,
    color: theme?.palette?.custom?.main,
    display: 'flex',
  }),
};
