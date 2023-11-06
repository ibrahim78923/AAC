export const styles: any = {
  boxMain: (theme: any) => ({
    background: theme?.palette?.common?.white,
    borderRadius: '0.5rem',
    border: `0.063rem solid ${theme?.palette?.grey?.[700]}`,
  }),

  topPerformaceText: (theme: any) => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme?.palette?.grey?.[600],
  }),

  topPerformaceTextOne: (theme: any) => ({
    fontSize: '0.75rem',
    color: theme?.palette?.grey?.[600],
  }),
  topPerformaceTextTwo: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme?.palette?.grey?.[600],
  }),
  topPerformaceTextThree: (theme: any) => ({
    fontSize: '0.663rem',
    color: theme?.palette?.grey?.[600],
  }),
  topPerformaceTextFour: (theme: any) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme?.palette?.grey?.[600],
    marginTop: 1,
  }),
  topPerformaceProgressBar: (theme: any) => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme?.palette?.custom?.main,
  }),
};
