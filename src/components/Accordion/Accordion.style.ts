export const styles: any = (isActive: boolean) => {
  return {
    accordionStyle: {
      backgroundColor: 'secondary.main',
      color: 'common.white',
      cursor: 'pointer',
      padding: '8px 16px',
      width: '100%',
      border: 'none',
      textAlign: 'left',
      outline: 'none',
      fontSize: '15px',
      borderRadius: '4px',
      marginTop: '24px',
      bottom: '1px',
    },
    panelStyle: {
      paddingTop: '10px',
      display: isActive ? 'block' : 'none',
      backgroundColor: 'common.white',
      overflow: 'hidden',
    },
  };
};
