export const styles = {
  mainBox: (item: any, role: any, theme: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      background: item.role === role && theme.palette.primary.lighter,
      padding: '12px 16px',
      borderRadius: '8px',
    };
  },
  cartBox: (item: any, role: any, theme: any) => {
    return {
      background:
        item.role === role
          ? theme.palette.primary.main
          : theme.palette.primary.lighter,
      padding: '8px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
    };
  },
  radioCircle: (theme: any) => {
    return {
      width: '8px',
      height: '8px ',
      background: theme.palette.primary.main,
      borderRadius: '20px',
      marginRight: 1,
    };
  },
};
