import { Theme } from '@mui/material';

export const styles = {
  horizontalTabsBox: {
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '15px 15px 25px 15px',
    borderRadius: '10px',
  },
  horizontalTabsInnnerBox: {
    pt: 1,
    height: '33vh',
    overflow: 'scroll',
    width: '100%',
  },

  detailsBox: () => {
    return {
      borderRadius: '8px',
      boxShadow: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
      height: '195px',
      padding: '15px',
      overflow: 'auto',
    };
  },
  noproductBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
  },
  salesBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '13px',
  },
  salesTextBox: (theme: Theme) => {
    return {
      color: theme?.palette?.custom?.main,
    };
  },
  salesHeading: (theme: Theme) => {
    return {
      color: theme?.palette?.blue?.dull_blue,
      fontWeight: 600,
    };
  },
  headingSpacingBetween: {
    display: 'flex',
    justifyContent: 'end',
    gap: 1,
    flexDirection: { xs: 'column', sm: 'row' },
  },
  salesPriority: (theme: Theme) => {
    return {
      background: theme?.palette?.grey[400],
      padding: '2px 4px 2px 6px',
      borderRadius: '16px',
      color: theme?.palette?.slateBlue?.main,
      display: 'flex',
      alignItems: 'center',
      gap: 0.2,
    };
  },

  emailBox: {
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '20px',
  },
  subjectHeading: (theme: any) => {
    return {
      padding: '2px 8px 2px 6px',
      background: '#F3F4F6',
      width: 'fit-content',
      borderRadius: '16px',
      my: 1,
      color: theme?.palette?.custom?.main,
    };
  },
};
