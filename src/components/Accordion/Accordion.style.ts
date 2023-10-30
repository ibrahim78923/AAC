export const styles: any = (isActive: boolean) => [
  {
    accordionStyle: {
      backgroundColor: '#35456D',
      color: '#fff',
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
      backgroundColor: 'white',
      overflow: 'hidden',
    },
  },
];
