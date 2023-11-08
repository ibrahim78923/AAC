export const styles = {
  parent(theme: any) {
    return {
      borderRadius: '0.50rem',
      border: `.1rem solid ${theme?.palette?.custom?.off_white_three}`,
      background: theme?.palette?.common?.white,
      padding: '1.25rem',
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
    gap: '1rem',
    mb: '0.625rem',
  },
  imageHeading(styles: any) {
    return {
      color: styles?.palette?.blue?.dull_blue,
    };
  },
  date: {
    color: '#A0A3BD', // color not in theme
  },
  message(styles: any) {
    return {
      color: styles?.palette?.blue?.dull_blue,
    };
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.313rem',
    columnGap: '1rem',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },

  selectDiscuss: (theme: any) => ({
    background: theme?.palette?.common?.white,
    headerBgColor: theme?.palette?.primary?.main,
    headerFontSize: '1.125rem',
    botBubbleColor: theme?.palette?.primary?.main,
    botFontColor: theme?.palette?.common?.white,
    userBubbleColor: theme?.palette?.common?.white,
  }),
};
