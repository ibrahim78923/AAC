export const styles = {
  tabsStyle: (theme: any) => {
    return {
      marginTop: '1.5rem',
      paddingTop: '8px',
      width: '20%',
      height: { lg: '100vh', xs: '0vh' },
      marginRight: '1%',
      borderTop: `1px solid ${theme?.palette?.graph?.slate_gray}`,
      '@media (max-width: 1500px)': {
        width: '30%',
      },
      '@media (max-width: 899px)': {
        width: '100%',
        marginRight: '0px',
        borderBottom: `1px solid ${theme?.palette?.graph?.slate_gray}`,
      },
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'scroll',
      },
      '& .MuiTab-root': {
        color: `${theme?.palette?.grey[900]}`,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        marginRight: '0px !important',
        '@media (max-width: 899px)': {
          marginRight: '50px !important',
        },
      },
      '& .MuiTab-root.Mui-selected': {
        color: `${theme?.palette?.secondary?.main}`,
        fontWeight: 600,
      },
      '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
      },
    };
  },
  tabData: (theme: any) => {
    return {
      width: '100%',
      position: 'relative',
      top: '-58px',
      borderLeft: `1px solid ${theme?.palette?.graph?.slate_gray}`,
      '@media (max-width: 899px)': {
        width: '100%',
        top: '0px',
        borderLeft: 'none',
      },
    };
  },
};
