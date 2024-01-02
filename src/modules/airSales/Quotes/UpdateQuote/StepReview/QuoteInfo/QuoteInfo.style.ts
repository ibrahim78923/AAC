export const styles = {
  quoteInfo: (theme: any) => ({
    bgcolor: theme?.palette?.grey[100],
    padding: '20px 24px',
    mt: '16px',
    borderRadius: '8px',
  }),
  quoteInfoTitle: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme?.palette?.blue?.dull_blue,
    lineHeight: '1.42857',
    '& > span': {
      color: theme?.palette?.custom?.main,
      fontWeight: '400',
    },
  }),
};
