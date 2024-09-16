export const styles = {
  wrapper: (theme: any) => ({
    padding: '8px 11px',
    borderRadius: '6px',
    border: `1px solid  ${theme?.palette?.grey[400]}`,
    backgroundColor: theme?.palette?.grey[100],
    boxShadow: '0px 9px 16px 0px rgba(245, 250, 255, 0.04)',
  }),
  switchButton: (theme: any) => ({
    height: '25px',
    borderRadius: '10px',
    boxShadow: 'none',
    color: 'inherit',
    border: '1px solid transparent',
    '&:hover': {
      backgroundColor: theme?.palette?.custom?.light_gray_bg,
    },
    '&.active': {
      backgroundColor: theme?.palette?.primary?.lighter,
      color: theme?.palette?.primary?.main,
      borderColor: theme?.palette?.primary?.main,
    },
  }),
};
