export const styles = {
  tabsStyle: () => {
    return {
      borderRight: 1,
      borderColor: '#EDEDED',
      paddingTop: '2rem',
      width: '15%',
      '@media (max-width: 1500px)': {
        width: '30%',
      },
      '@media (max-width: 899px)': {
        width: '100%',
      },
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        alignItems: 'flex-start',
      },
      '& .MuiTab-root': {
        color: '#9CA3AF',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
      },
      '& .MuiTab-root.Mui-selected': {
        color: '#35456D',
        fontWeight: 600,
      },
    };
  },
};
