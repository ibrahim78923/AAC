export const styles: any = {
  boxMain: (isBorderBottom: boolean, theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 1,
    flexWrap: 'wrap',
    background: theme?.palette?.common?.white,
    borderBottom: isBorderBottom
      ? `0.063rem solid ${theme?.palette?.grey?.[700]}`
      : '',
    px: 2,
    py: 1,
  }),
};
