export const styles = {
  actionBtn: (theme: any) => ({
    color: theme?.palette?.grey[500],
    width: '112px',
    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    marginLeft: '10px',
    '@media (max-width:560px)': {
      width: '100%',
    },
  }),
};
