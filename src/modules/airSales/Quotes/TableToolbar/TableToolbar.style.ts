export const styles = {
  tableToolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    p: '12px 24px',
    flexWrap: 'Wrap',
  }),
  actionButton: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[0]}`,
    color: theme?.palette?.custom?.main,
    fontSize: '14px',
    fontWeight: '500',
    p: '6px 18px',
    height: '36px',
    '@media (max-width: 500px)': {
      width: '100%',
      marginTop: '10px !important',
      marginLeft: '0px !important',
    },
  }),
};
