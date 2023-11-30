export const styles = {
  smallContactlist: (theme: any) => {
    return {
      marginTop: '24px',
      padding: '24px 0px',
      color: theme?.palette?.blue?.light,
      borderRadius: '6px',
      background: theme?.palette?.grey[100],
    };
  },

  text: {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
  },
  textTwo: (theme: any) => {
    return {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: theme?.typography?.fontWeight?.fontWeightRegular,
      paddingTop: '12px',
    };
  },
};
