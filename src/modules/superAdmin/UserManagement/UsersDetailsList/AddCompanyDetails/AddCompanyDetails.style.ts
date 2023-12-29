export const styles = {
  productItem: () => {
    return {
      '.MuiFormGroup-root .MuiGrid-root ': {
        flexWrap: 'nowrap',
        minWidth: '40%',
        overflow: 'auto',
        '.MuiFormControlLabel-root': {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          position: 'relative',
          '.MuiButtonBase-root': {
            position: 'absolute',
            top: 0,
            right: '10px',
          },
        },
      },
    };
  },
  productCard: (theme: any) => {
    return {
      width: '150px',
      height: '160px',
      border: `1px solid ${theme?.palette?.custom.off_white_one}`,
      paddingTop: '36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
    };
  },
};
