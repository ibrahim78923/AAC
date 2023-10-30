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
    maxWidth: '400px',
    width: '100%',
    height: '400px',
    radius: '8px',
    '@media screen and (max-width: 480px)': {
      maxWidth: '300px',
    },
    '@media screen and (max-width: 400px)': {
      maxWidth: '250px',
    },
  }),

  alignGraph: {
    cx: 189,
    cy: 135,
    height: 280,
    innerRadius: 70,
    outerRadius: 100,
    paddingAngle: 5,
    cornerRadius: 15,
    startAngle: -250,
    endAngle: 300,
    textLabelX: 2.1,
    numberLabelX: 2.1,
    textLabelY: 2.1,
    numberLabelY: 2.4,
  },

  chart: {
    '@media screen and (max-width: 480px)': {
      marginRight: '75px',
    },
    '@media screen and (max-width: 400px)': {
      marginRight: '130px',
    },
  },

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
    gap: '10px',
  },

  footerTypographyBox: (theme: any) => ({
    textAlign: 'center',
    width: '25px',
    height: '25px',
    backgroundColor: theme.palette.primary?.light,
    borderRadius: '4px',
  }),
};
