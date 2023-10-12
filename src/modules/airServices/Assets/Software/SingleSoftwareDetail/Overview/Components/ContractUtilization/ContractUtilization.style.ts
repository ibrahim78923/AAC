import { styled } from '@mui/material';

export const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
}));

export const styles = {
  mainBox: (theme: any) => ({
    border: '1.51px solid',
    borderColor: theme.palette.grey?.[700],
    maxWidth: '300px',
    width: '100%',
    height: '310px',
    radius: '8px',
  }),

  heading: {
    marginTop: '20px',
    marginLeft: '23px',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '28px',
  },

  footerBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },

  footerTypography: {
    display: 'flex',
    alignItems: 'center',
  },

  footerTypographyBox: (theme: any) => ({
    textAlign: 'center',
    width: '25px',
    height: '25px',
    backgroundColor: theme.palette.primary?.light,
    borderRadius: '4px',
    marginRight: '6px',
  }),
};
