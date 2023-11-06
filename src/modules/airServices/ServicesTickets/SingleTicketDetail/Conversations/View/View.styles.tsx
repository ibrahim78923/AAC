export const styles = {
  parent: {
    borderRadius: '8px',
    border: '1px solid var(--gray-200, #EAECF0)',
    background: 'var(--base-white, #FFF)',
    padding: '20px',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
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
};
