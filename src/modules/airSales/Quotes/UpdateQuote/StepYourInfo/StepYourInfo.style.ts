export const styles = {
  heading: () => ({
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.5',
    color: 'slateBlue.main',
    mb: '16px',
  }),
  checkInformation: () => ({
    fontSize: '16px',
    fontWeight: '400',
    color: 'custom.main',
    mb: '24px',
  }),
  boxTitle: () => ({
    fontSize: '16px',
    fontWeight: '600',
    color: 'slateBlue.main',
    mb: '16px',
  }),
  box: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    p: '16px',
    display: 'flex',
  }),
  icon: () => ({
    height: '32px',
    width: '32px',
    mr: '8px',
  }),
  contactInfo: () => ({
    flex: '1',
  }),
  contactTitle: () => ({
    fontSize: '18px',
    fontWeiht: '500',
    lineHeight: '1.55555556',
    color: 'slateBlue.main',
  }),
  contactInfoText: () => ({
    fontSize: '12px',
    fontWeiht: '400',
    lineHeight: '1.5',
    color: 'custom.main',
    textTransform: 'capitalize',
  }),
};
