export const styles = {
  pieChart: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
      padding: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '8px',
      flexDirection: { lg: 'row', xs: 'column' },
      alignItems: { lg: 'unset', xs: 'center' },
    };
  },
};
