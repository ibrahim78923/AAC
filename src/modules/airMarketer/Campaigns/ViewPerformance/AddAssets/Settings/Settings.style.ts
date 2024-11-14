export const styles = {
  tabWrapper: () => {
    return {
      '& .tabs-main-class .MuiTabs-flexContainer': {
        display: 'flex',
        alignItems: 'flex-start',
        marginX: 0,
      },
      '& .MuiTabs-indicator ': {
        display: 'none',
      },
      // '& .MuiTab-root': {
      //   marginX: 0
      // }
    };
  },
};
