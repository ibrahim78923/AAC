export const styles = {
  chatsCardWrapper: (activeCheck: any) => {
    return {
      display: 'flex',
      padding: '0px 10px',
      borderLeft: `${
        activeCheck ? '3px solid #38CAB5' : '3px solid transparent'
      }`,
    };
  },
  chatsCardInner: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E9EAEF',
      padding: '8px 0px 7px 0px',
      width: '100%',
    };
  },
};
