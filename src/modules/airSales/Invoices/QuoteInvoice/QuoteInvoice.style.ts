export const style = {
  cancelButton: (theme: any) => {
    return {
      color: theme?.custom?.main,
      border: `1px solid ${theme?.palette?.grey[0]}`,
      padding: '0px 22px',
      height: '44px',
      fontWeight: '500',
      '&:hover': { bgcolor: theme?.palette?.grey[400] },
    };
  },
};
