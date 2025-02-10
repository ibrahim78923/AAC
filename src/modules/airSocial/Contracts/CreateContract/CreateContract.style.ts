import { Theme } from '@mui/material';

export const styles = {
  container: {
    p: '30px 60px',
    '@media (max-width: 1199px)': {
      p: '30px',
    },
    '@media (max-width: 767px)': {
      p: '24px 16px',
    },
  },

  contentRow: {
    '@media (min-width: 768px)': {
      height: 'calc(100vh - 120px)',
    },
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
  },

  content: (theme: Theme) => ({
    flex: 1,
    backgroundColor: theme?.palette?.common?.white,
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '8px',
    height: '100%',
    overflowY: 'auto',
    p: '24px 45px',
    '@media (max-width: 1199px)': {
      p: '24px',
    },
    '@media (max-width: 767px)': {
      width: '100%',
    },
  }),

  sidebar: (theme: Theme) => ({
    width: '300px',
    backgroundColor: theme?.palette?.common?.white,
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    height: '100%',
    borderRadius: '8px',
    overflowY: 'auto',
    p: '18px',
    '@media (max-width: 767px)': {
      width: '100%',
    },
  }),

  contentTopbar: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: '16px',
    position: 'relative',
    zIndex: '111',
  }),

  headingBar: () => ({
    height: '46.5px',
    display: 'flex',
    alignItems: 'center',
    p: '15px 24px',
    boxShadow: '0px 2.25px 4.5px 0px #6B72801A',
    backgroundColor: '#EDFBFB',
    mb: '18px',
  }),

  headingBarTitle: () => ({
    color: '#101828',
    fontSize: '13.5px',
  }),

  partyCardgridItem: {
    // '&:first-of-type': {
    //   '& .delete-button': {
    //     display: 'none',
    //   },
    // },
  },
};
