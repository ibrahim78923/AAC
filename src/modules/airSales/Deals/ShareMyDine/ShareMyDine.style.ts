export const styles = {
  iconWrap: { display: 'flex', gap: '25px', alignItems: 'center' },

  accordianText: (theme: any) => {
    return {
      color: theme.palette.slateBlue['main'],
      fontSize: '14px',
      fontWeight: '600',
    };
  },
  accordianEmail: (theme: any) => {
    return {
      color: theme.palette.custom['main'],
      fontSize: '14px',
      fontWeight: '600',
    };
  },
  heading: { display: 'flex', justifyContent: 'space-between', my: '15px' },
  accordianSummary: (theme: any) => {
    return {
      background: theme.palette.secondary['main'],
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '24px',
      borderRadius: '4px',
      color: theme.palette.grey[800],
    };
  },
};
