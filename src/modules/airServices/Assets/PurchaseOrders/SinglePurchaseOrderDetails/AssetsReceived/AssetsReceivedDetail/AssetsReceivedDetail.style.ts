export const styles = {
  assetsCard: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    my: 2,
    py: '1.5rem',
    borderRadius: '4px',
    borderBottom: `4px solid ${theme.palette.custom.aqua_breeze}`,
    boxShadow:
      '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
    flexWrap: 'wrap',
  }),
  cardDetail: { display: 'flex', alignItems: 'center' },
  cardLine: (theme: any) => ({
    my: { sm: 0, xs: 1 },
    height: '30px',
    width: '1px',
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.custom.main,
    fontWeight: 400,
  }),
  cardText: { pl: '1rem', pr: '3rem' },
};
