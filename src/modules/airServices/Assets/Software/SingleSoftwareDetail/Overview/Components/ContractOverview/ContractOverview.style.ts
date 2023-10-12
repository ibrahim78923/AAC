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
    maxWidth: '452px',
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

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },

  contentBoxData: (theme: any) => ({
    marginBottom: '12px',
    paddingRight: '20px',
    paddingLeft: '20px',
    borderRadius: '8px',
    display: 'flex',
    backgroundColor: theme.palette.grey?.[100],
    maxWidth: '400px',
    width: '100%',
    height: '52px',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
};
