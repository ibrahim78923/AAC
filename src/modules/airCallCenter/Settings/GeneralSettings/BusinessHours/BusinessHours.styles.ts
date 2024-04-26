export const styles = {
  pageHeader: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  heading: () => ({
    flex: '1',
  }),
  paheHeaderActions: () => ({
    ml: '16px',
  }),
  subHeading: () => ({
    mt: '4px',
    color: 'slateBlue.main',
    lineHeight: '1.875',
    fontSize: '16px',
  }),
  learnMore: () => ({
    color: 'primary.main',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '2.14285',
  }),
  hoursList: () => ({
    mt: '24px',
    '& > div': {
      mt: '16px',
    },
  }),
};
