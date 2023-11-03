export const styles: any = {
  boxMain: (isBorderBottom: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 2,
    background: '#FFF',
    borderBottom: isBorderBottom ? '0.063rem solid #E5E7EB' : '',
    flexShrink: 0,
  }),

  announcementText: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: '#1F2937',
    mt: 1,
  },

  announcementTextOne: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: '##A0A3BD',
    mt: 1,
  },

  announcementTextTwo: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.125rem',
    letterSpacing: '-0.015rem',
    color: '#6B7280',
    display: 'flex',
  },
};
