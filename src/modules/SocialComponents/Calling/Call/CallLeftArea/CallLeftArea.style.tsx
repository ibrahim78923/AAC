export const styles = {
  tabsWrapperCalls: (toggleCall: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '10px',
      cursor: 'pointer',
      filter: `${
        toggleCall === 'calls'
          ? 'none'
          : 'grayscale(1) brightness(1) grayscale(1)'
      }`,
      '&:hover': {
        filter: 'none',
      },
    };
  },
  tabsWrapperMessage: (toggleCall: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '10px',
      cursor: 'pointer',
      filter: `${
        toggleCall === 'messages'
          ? 'none'
          : 'grayscale(1) brightness(1) grayscale(1)'
      }`,
      '&:hover': {
        filter: 'none',
      },
    };
  },
};
