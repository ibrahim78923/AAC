export const styles = {
  card: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    backgroundColor: '#1f305d',
    padding: '0px 0px 20px 0px',
  }),
  buyerInfoTitle: (theme: any) => ({
    fontWeight: '400',
    color: theme?.palette?.common?.white,
  }),
  buyerInfoText: (theme: any) => ({
    color: theme?.palette?.common?.white,
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
  title: (theme: any) => ({
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.555556',
    color: theme?.palette?.common?.white,
  }),
  infoSubtitle: (theme: any) => ({
    display: 'block',
    color: theme?.palette?.common?.white,
    lineHeight: '1.5',
    mt: '8px',
  }),
};
