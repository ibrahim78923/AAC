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
    fontSize: '0.75rem',
    fontWeight: 700,
    color: theme?.palette?.common?.[800],
    mt: 1,
  }),

  announcementTextOne: {
    fontSize: '0.75rem',
    color: '#A0A3BD',
    mt: 1,
  },

  announcementTextTwo: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme?.palette?.custom?.main,
    display: 'flex',
  }),
};
