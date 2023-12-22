export const styles = {
  horizontalTabsBox: {
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '15px 15px 25px 15px',
    borderRadius: '10px',
  },
  horizontalTabsInnnerBox: {
    pt: 3,
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
  salesTextBox: (theme: any) => {
    return {
      color: theme?.palette?.custom?.main,
    };
  },
  salesHeading: (theme: any) => {
    return {
      color: theme?.palette?.blue?.dull_blue,
      fontWeight: 600,
    };
  },
  headingSpacingBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 0.7,

    padding: '12px',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  salesPriority: (theme: any) => {
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
  uploadImage: {
    borderRadius: '50%',
    border: '2px solid #D1D5DB',
    height: '80px',
    width: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginBottom: '15px',
  },
  inputStyle: {
    display: 'none', // Hide the default input element
  },
  labelStyle: {
    color: '#9CA3AF',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
