export const styles = {
  pageHeader: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    p: '16px 24px',
    flexWrap: 'wrap',
  }),
  pageHeaderTitle: (theme: any) => ({
    color: theme?.palette?.grey[800],
    '@media (max-width: 532px)': {
      marginBottom: '18px',
    },
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
    },
  }),
};
