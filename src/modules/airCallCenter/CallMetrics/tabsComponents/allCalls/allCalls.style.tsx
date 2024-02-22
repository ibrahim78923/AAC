export const styles = {
  searchBar: () => {
    return {
      width: '260px',
      '@media (max-width:597px)': {
        width: '100%',
      },
    };
  },
  flexActionsButtons: () => {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      '@media (max-width:597px)': {
        width: '100%',
      },
    };
  },
};
