export const style = {
  cancelButton: (theme: any) => {
    return {
      color: theme?.custom?.main,
      border: '1px solid #D1D5DB',
      padding: '0px 22px',
      height: '44px',
      fontWeight: '500',
      '&:hover': { bgcolor: theme?.grey[400] },
    };
  },
};
