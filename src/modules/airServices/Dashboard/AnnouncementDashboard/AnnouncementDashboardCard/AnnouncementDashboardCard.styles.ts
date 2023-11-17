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
    px: 2,
    height: 81,
  }),
};
