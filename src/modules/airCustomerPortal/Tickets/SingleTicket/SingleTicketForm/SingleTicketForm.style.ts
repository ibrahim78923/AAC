export const styles = {
  assetsCard: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    my: 2,
    py: 2.5,
    borderRadius: 1,
    borderBottom: `0.25rem solid ${theme?.palette?.custom?.aqua_breeze}`,
    boxShadow: 1,
    flexWrap: 'wrap',
  }),
  cardLine: (theme: any) => ({
    my: { sm: 0, xs: 1 },
    height: '1.875rem',
    width: '0.063rem',
    backgroundColor: theme?.palette?.grey?.[700],
    color: theme?.palette?.custom?.main,
    fontWeight: 400,
  }),
  cardText: { pl: '1rem', pr: '3rem', minWidth: 200 },
};
