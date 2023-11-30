export const styles = () => {
  return {
    flexBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mainWrapper: {
      borderRadius: '12px',
    },
    mainHeading: (theme: any) => {
      return {
        color: theme?.palette?.slateBlue?.main,
      };
    },
    formGridWrapper: (theme: any) => {
      return {
        borderLeft: `1px solid ${theme?.palette?.custom?.dark}`,
        position: 'relative',
        padding: 2.4,
      };
    },
    formBtnWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  };
};
