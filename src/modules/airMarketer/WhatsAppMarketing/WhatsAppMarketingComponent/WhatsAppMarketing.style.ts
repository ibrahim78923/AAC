export const styles = {
  wrapper: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}, 0px 1px 3px 0px ${theme?.palette?.custom?.shade_grey}`,
    '& .tabs-container': {
      ml: '24px',
      mt: '0',
    },
  }),
  heading: () => ({
    p: '24px',
    display: 'flex',
    alignItems: 'center',
    '& > .MuiTypography-root': {
      flex: '1',
    },
    '& > .MuiButton-root': {
      ml: '12px',
    },
  }),
};
