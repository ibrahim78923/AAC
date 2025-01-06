import { Theme } from '@mui/material';

export const styles = {
  partyCard: (theme: Theme) => ({
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    p: '24px 18px 10px',
    borderRadius: '4px',
  }),

  cardHeader: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '18px',
    mb: '12px',
  }),

  cardHeaderHeader: () => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),

  cardIcon: () => ({
    height: '15px',
    width: '15px',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1',
  }),

  cardTitle: () => ({
    color: '#1D2939',
    fontSize: '12px',
    lineHeight: '1.25',
  }),

  cardHeaderActions: () => ({
    display: 'flex',
    gap: '10px',
  }),

  fieldLabel: () => ({
    '& > .MuiTypography-root.MuiTypography-body2': {
      fontSize: '12px',
      lineHeight: '1.25',
      mb: '4.5px',
    },
  }),
};
