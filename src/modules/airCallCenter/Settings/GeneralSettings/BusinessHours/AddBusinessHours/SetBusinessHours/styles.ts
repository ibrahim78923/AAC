export const styles = {
  label: () => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4285',
  }),
  btnGroup: (theme: any) => ({
    mt: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',

    '& > .MuiButtonBase-root.MuiToggleButton-root': {
      backgroundColor: theme?.palette?.grey[100],
      border: `1px solid ${theme?.palette?.grey[100]}`,
      color: theme?.palette?.grey[900],
      minWidth: '97px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.4285',
      fontWeight: '400',
      ml: '0',
      '&:hover': {
        borderColor: theme?.palette?.primary?.main,
        color: theme?.palette?.primary?.main,
      },
      '&.Mui-selected': {
        backgroundColor: theme?.palette?.primary?.main,
        color: theme?.palette?.common?.white,
        borderColor: theme?.palette?.primary?.main,
      },
    },
  }),
};
// MuiButtonBase-root MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButton-root Mui-selected MuiToggleButton-sizeMedium MuiToggleButton-primary MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButtonGroup-middleButton css-12px3zp-MuiButtonBase-root-MuiToggleButton-root
// MuiButtonBase-root MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-primary MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButtonGroup-firstButton css-12px3zp-MuiButtonBase-root-MuiToggleButton-root
// MuiButtonBase-root MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-primary MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal MuiToggleButtonGroup-middleButton css-12px3zp-MuiButtonBase-root-MuiToggleButton-root
