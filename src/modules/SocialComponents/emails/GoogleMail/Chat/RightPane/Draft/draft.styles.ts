export const styles = {
  draftWrap: (theme: any) => {
    return {
      borderRadius: '8px',
      background: theme?.palette?.common?.white,
      boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
      padding: '24px',
      mt: '24px',
    };
  },
  draftMainWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};
