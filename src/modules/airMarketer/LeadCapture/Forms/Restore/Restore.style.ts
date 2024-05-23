export const styles = {
  header: () => ({
    mb: '20px',
  }),
  headerLeft: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  }),
  backArrow: () => ({
    cursor: 'pointer',
    display: 'inline-flex',
    mt: '5px',
  }),
  searchBar: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    mb: 2,
    gap: '15px',
  }),
  filterButton: (theme: any) => ({
    width: '95px',
    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    fontWeight: 500,
    color: theme?.palette?.grey[600],
    // '@media (max-width:560px)': {
    //   width: '100%',
    // },
    '&:hover': {
      background: `${theme?.palette?.grey[400]}`,
      border: '1.5px solid transparent',
    },
  }),
};
