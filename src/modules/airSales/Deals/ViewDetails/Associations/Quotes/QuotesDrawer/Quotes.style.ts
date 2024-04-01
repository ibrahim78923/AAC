export const styles = {
  card: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    p: '32px 32px 20px',
    mt: '20px',
  }),
  company: () => ({
    display: 'flex',
  }),
  avatar: () => ({
    height: '64px',
    width: '64px',
    mr: '20px',
  }),
  title: () => ({
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.555556',
    color: 'slateBlue.main',
  }),
  infoSubtitle: (theme: any) => ({
    display: 'block',
    color: theme?.palette?.custom?.main,
    lineHeight: '1.5',
    mt: '8px',
  }),
  quoteInfo: (theme: any) => ({
    bgcolor: theme?.palette?.grey[100],
    padding: '20px 24px',
    mt: '16px',
    borderRadius: '8px',
  }),
  quoteInfoTitle: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme?.palette?.blue?.dull_blue,
    lineHeight: '1.42857',
    '& > span': {
      color: theme?.palette?.custom?.main,
      fontWeight: '400',
    },
  }),
  wrapper: () => ({
    mt: '12px',
  }),
  heading: () => ({
    mb: '12px',
  }),
  tableWrapper: (theme: any) => ({
    border: `1px solid ${theme.palette.custom.off_white_three}`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.dark_shade_green}, 0px 1px 3px 0px ${theme?.palette?.custom?.shade_grey}`,
  }),
};
