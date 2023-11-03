export const styles: any = {
  boxMain: (theme: any) => ({
    background: '#FFF',
    borderRadius: '0.5rem',
    border: `0.063rem solid ${theme?.palette?.grey?.[700]}`,
    flexShrink: 0,
  }),

  topPerformaceText: (theme: any) => ({
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.25rem',
    letterSpacing: '-0.018rem',
    color: theme?.palette?.grey?.[600],
  }),

  topPerformaceTextOne: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.25rem',
    letterSpacing: '-0.015rem',
    color: theme?.palette?.grey?.[600],
  }),
  topPerformaceTextTwo: (theme: any) => ({
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.055rem',
    letterSpacing: '-0.017rem',
    color: theme?.palette?.grey?.[600],
  }),
  topPerformaceTextThree: {
    fontSize: '0.663rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.055rem',
    letterSpacing: '-0.013rem',
    color: '#4E4B66',
  },
  topPerformaceTextFour: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1rem',
    letterSpacing: '0.015rem',
    color: '#4E4B66',
    marginTop: 1,
  },
  topPerformaceProgressBar: (theme: any) => ({
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.266rem',
    letterSpacing: '0.018rem',
    color: theme?.palette?.custom?.main,
  }),
};
