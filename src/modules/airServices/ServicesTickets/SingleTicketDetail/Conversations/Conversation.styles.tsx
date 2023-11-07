export const styles = {
  parent(theme: any) {
    return {
      borderRadius: '8px',
      border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
      background: theme?.palette?.common?.white,
      padding: '20px',
      boxShadow: 1,
    };
  },
  leftSideParent: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  imageBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    mb: '10px',
  },
  imageHeading(styles: any) {
    return {
      color: styles?.palette?.blue?.dull_blue,
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '20px',
    };
  },
  date: {
    color: '#A0A3BD',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '18px',
  },
  message(styles: any) {
    return {
      color: styles?.palette?.blue?.dull_blue,
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '18px',
    };
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    columnGap: '16px',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },

  selectDiscuss: (theme: any) => ({
    background: theme?.palette?.common?.white,
    headerBgColor: theme?.palette?.primary?.main,
    headerFontSize: '20px',
    botBubbleColor: theme?.palette?.primary?.main,
    botFontColor: theme?.palette?.common?.white,
    userBubbleColor: theme?.palette?.common?.white,
  }),
};
