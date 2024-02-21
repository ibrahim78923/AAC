export const style: any = {
  detailBoxWrapper: (theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    p: '18px 20px',
    borderRadius: '4px',
    borderBottom: `1px solid ${theme?.custom?.off_white_three}`,

    '.nextBtn': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: theme?.custom?.off_white_three,

      '.nextBtn': {
        display: 'block',
      },
    },
  }),
};
