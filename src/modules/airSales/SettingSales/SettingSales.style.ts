export const styles = {
  tabsStyle: () => {
    return {
      marginTop: '1.5rem',
      paddingTop: '8px',
      width: '20%',
      height: { lg: '100vh', xs: '0vh' },
      marginRight: '1%',
      borderTop: '1px solid #EDEDED',
      '@media (max-width: 1500px)': {
        width: '30%',
      },
      '@media (max-width: 899px)': {
        width: '100%',
        marginRight: '0px',
        borderBottom: '1px solid #EDEDED',
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
        marginRight: '0px !important',
        '@media (max-width: 899px)': {
          marginRight: '50px !important',
        },
      },
      '& .MuiTab-root.Mui-selected': {
        color: '#35456D',
        fontWeight: 600,
      },
      '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
      },
    };
  },
  tabData: {
    width: '100%',
    position: 'relative',
    top: '-58px',
    borderLeft: ' 1px solid #EDEDED',
    '@media (max-width: 899px)': {
      width: '100%',
      top: '0px',
      borderLeft: 'none',
    },
  },
};
