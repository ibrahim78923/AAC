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
      justifyContent: 'space-between',
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
      position: { xs: 'relative', xl: 'absolute' },
      bottom: 0,
      right: 0,
      pl: { xl: 2.4 }
    },
  };
};
