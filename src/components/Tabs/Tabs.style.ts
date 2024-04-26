export const styles = {
  tabWrapper: (tabStyle: any) => {
    return {
      display: `${tabStyle === 'vertical' && 'flex'}`,
      flexWrap: 'wrap',
      gap: 2,
      '& .tabs-main-class .MuiTabs-flexContainer': {
        display: 'flex',
        alignItems: 'flex-start',
      },
      '& .text-primary-my': { minWidth: 'auto', paddingBottom: '0px' },
    };
  },
  headerWrapper: {
    padding: '18px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '15px',
  },
  headerChild: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  addIcon: (theme: any) => {
    return {
      float: 'right',
      cursor: 'pointer',
      color: theme.palette.grey[900],
    };
  },
};
