export const styles = {
  BoxStyling: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      padding: '1rem',
      boxShadow: '0px 1px 2px 0px #1018280F',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    };
  },
};
