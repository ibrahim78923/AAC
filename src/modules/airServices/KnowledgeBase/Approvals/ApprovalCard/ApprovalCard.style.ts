export const styles = {
  cardWrapper: (theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textTransform: 'capitalize',
    p: 1.6,
    boxShadow: `0rem 0.125rem 0.25rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}, 0rem 0.25rem 0.5rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}`,
    borderRadius: 4,
    gap: 1.2,
  }),
  label: (theme: any) => ({
    color: theme?.palette?.custom?.main,
    fontSize: 12,
    fontWeight: 600,
  }),
  approvalStatusBtn: (theme: any) => ({
    height: '2rem',
    backgroundColor: theme?.palette?.blue?.main,
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
  }),
};
