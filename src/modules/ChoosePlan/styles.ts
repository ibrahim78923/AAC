export const cardStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 3px 6px 0 rgba(107, 114, 128, 0.1)',
  p: '20px',
  borderRadius: '8px',
  '&:not(:first-child)': {
    mt: '20px',
  },
};

export const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
};

export const cardHeaderIconStyle = {
  display: 'flex',
  height: '40px',
  width: '40px',
  backgroundColor: 'primary.lighter',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '2px',
  mr: '24px',
};

export const cardHeaderActionStyle = {
  ml: 'auto',
};

export const dividerStyle = (theme: any) => ({
  borderTop: `1px solid ${theme.palette.custom[3]}`,
  margin: '24px 0',
});

export const planSelectionRow = {
  display: 'flex',
};

export const planSelectionForm = {
  flex: '1',
};

export const planTableRow = {
  display: 'flex',
  justifyContent: 'space-between',
  p: '4px 0',
};

export const planTableTd = (theme: any) => ({
  color: theme.palette.custom[1],
  fontSize: '16px',
  lineHeight: '1.5',
});

export const planTableTdBold = (theme: any) => ({
  color: theme.palette.slateBlue.main,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
});

export const planTableTh = (theme: any) => ({
  color: theme.palette.slateBlue.main,
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: 1.5555556,
  textAlign: 'right',
});

export const updateSubscriptionStyle = (theme: any) => ({
  borderTop: `1px solid ${theme.palette.custom[3]}`,
  mt: '110px',
  pt: '24px',
  justifyContent: 'flex-end',
});

export const cancelButtonStyle = (theme: any) => ({
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.custom[1],
});
