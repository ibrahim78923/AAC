export const styles: any = {
  boxMain: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 4,
    background: theme?.palette?.common?.white,
    borderRadius: '0.5rem',
    border: `0.063rem solid ${theme?.palette?.grey?.[700]}`,
    flexShrink: 0,
    height: '5.875rem',
  }),
};
