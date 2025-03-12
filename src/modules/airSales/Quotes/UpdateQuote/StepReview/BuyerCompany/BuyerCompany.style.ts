export const styles = {
  card: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    p: '32px 32px 20px',
  }),
  buyerInfoTitle: (theme: any) => ({
    fontWeight: '600',
    color: theme?.palette?.grey[800],
  }),
  buyerInfoText: (theme: any) => ({
    color: theme?.palette?.custom?.main,
    mt: '8px',
    lineHeight: '1.42857',
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
};
