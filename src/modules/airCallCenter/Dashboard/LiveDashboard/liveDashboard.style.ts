export const styles = {
  actionBtn: (theme: any) => ({
    color: `custom.main`,
    width: '112px',
    border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue} !important`,
    marginLeft: '10px',
    '@media (max-width:560px)': {
      width: '100%',
    },
  }),
};
