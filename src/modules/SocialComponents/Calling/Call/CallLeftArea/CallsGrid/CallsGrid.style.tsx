export const styles = {
  callsCardWrapper: (activeCheck: any) => {
    return {
      display: 'flex',
      padding: '0px 10px',
      cursor: 'pointer',
      borderLeft: `${
        activeCheck ? '3px solid #38CAB5' : '3px solid transparent'
      }`,
    };
  },
  callsCardInner: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E9EAEF',
      padding: '8px 0px 7px 0px',
      cursor: 'pointer',
      width: '100%',
    };
  },
};
