export const styles = () => {
  return {
    flexBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    mainWrapper: (theme: any) => {
      return {
        borderRadius: '12px',
        border: `1px solid ${theme?.palette?.custom?.off_white}`,
        boxShadow: `0px 1px 3px 0px ${theme?.palette?.custom?.transparent_dark_blue}`,
        padding: 2.4,
        height: 780,
        overflow: 'scroll',
      };
    },
    mainHeading: (theme: any) => {
      return {
        color: theme?.palette?.slateBlue?.main,
      };
    },
    subHeading: (theme: any) => {
      return {
        color: theme?.palette?.custom?.main,
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '30px',
        pb: 2.4,
      };
    },
  };
};
