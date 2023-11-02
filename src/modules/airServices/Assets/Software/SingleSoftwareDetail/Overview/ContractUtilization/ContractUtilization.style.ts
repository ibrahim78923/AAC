import { styled } from '@mui/material';

export const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  fontSize: '.8rem',
  fontWeight: 500,
  lineHeight: '1.2rem',
}));

export const styles = {
  mainBox: (theme: any) => ({
    border: '.1rem solid',
    borderColor: theme?.palette?.grey?.[700],
    maxWidth: '25rem',
    width: '100%',
    height: '25rem',
    radius: '.5rem',
    '@media screen and (max-width: 30rem)': {
      maxWidth: '18.7rem',
    },
    '@media screen and (max-width: 25rem)': {
      maxWidth: '17.5rem',
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
    textLabelY: 2,
    numberLabelY: 2.3,
  },

  chart: {
    '@media screen and (max-width: 30rem)': {
      marginRight: '4.6rem',
    },
    '@media screen and (max-width: 25rem)': {
      marginRight: '8.1rem',
    },
  },

  heading: {
    marginTop: '1.2rem',
    marginLeft: '1.4rem',
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: '1.7rem',
  },

  footerBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '.6rem',
  },

  footerTypographyBox: (theme: any) => ({
    textAlign: 'center',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: theme?.palette?.primary?.light,
    borderRadius: '.2rem',
  }),
};
