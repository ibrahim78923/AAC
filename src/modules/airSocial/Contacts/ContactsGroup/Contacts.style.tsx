export const styles = {
  createGroupCard: () => {
    return {
      borderRadius: '12px',
      width: '246px',
      height: '126px',
      boxShadow:
        '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
    };
  },
  groupsCard: () => {
    return {
      borderRadius: '12px',
      width: '246px',
      height: '126px',
      boxShadow:
        '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
      p: 2,
    };
  },
  flexCards: () => {
    return {
      display: '-webkit-box',
      gap: '20px',
      overflow: 'scroll',
      pt: 1,
      pb: 2,
    };
  },
  btnLeft: () => {
    return {
      position: 'absolute',
      left: '-25px',
      top: '50px',
    };
  },
  btnRight: () => {
    return {
      position: 'absolute',
      right: '-25px',
      top: '50px',
    };
  },
  btnRounded: () => {
    return {
      minWidth: '30px',
      padding: '0',
      height: '30px',
      borderRadius: '20px',
    };
  },
};
