export const planCard = (theme: any) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: `20px 4px 20px 4px`,
});

export const planStatus = {
  display: `flex`,
  justifyContent: `flex-end`,
  padding: `20px 20px 9px 20px`,
  minHeight: '57px',
};

export const planActiveChip = {
  fontSize: `14px`,
  lineHeight: `1.42857`,
  color: `success.main`,
  backgroundColor: `success.lighter`,
  padding: `4px 12px`,
  borderRadius: `16px`,
};

export const planIcon = {
  borderRadius: `50%`,
  height: `51px`,
  width: `51px`,
  backgroundColor: `primary.lighter`,
  margin: `0 auto`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
};

export const planTitle = {
  textAlign: 'center',
  fontWeight: '600',
};

export const planPlan = {
  fontSize: '12px',
  fontWeight: '500',
  color: '#374151',
  textAlign: 'center',
  mt: '4px',
  pb: '16px',
};

export const planStrip = {
  backgroundColor: `primary.lighter`,
  p: `9px`,
  textAlign: `center`,
};

export const planPrice = {
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.5',
};

export const planBillOn = (theme: any) => ({
  color: theme.palette.custom[1],
  lineHeight: '1.42857',
});

export const planType = (theme: any) => ({
  fontSize: '16px',
  lineHeight: '1.5',
  fontWeight: '500',
  color: theme.palette.grey[800],
  textAlign: 'center',
  mt: '10px',
});

export const planActions = {
  p: '24px 20px',
  justifyContent: 'center',
};

export const buttonOutlineGrey = (theme: any) => ({
  borderColor: theme.palette.custom[1],
  color: theme.palette.custom[1],
});
