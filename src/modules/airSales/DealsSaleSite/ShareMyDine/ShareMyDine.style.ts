export const SMDStyles = (theme: any) => {
  const { grey, secondary, slateBlue, custom } = theme.palette;
  return {
    iconWrap: { display: 'flex', gap: '25px', alignItems: 'center' },
    accordianText: {
      color: slateBlue['main'],
      fontSize: '14px',
      fontWeight: '600',
    },
    accordianEmail: {
      color: custom['main'],
      fontSize: '14px',
      fontWeight: '600',
    },
    heading: { display: 'flex', justifyContent: 'space-between', my: '15px' },
    accordianSummary: {
      background: secondary['main'],
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '24px',
      borderRadius: '4px',
      color: grey[800],
    },
  };
};
