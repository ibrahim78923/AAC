export const styles = {
  previewDetails: (theme: any) => ({
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    p: '10px 16px',
    minHeight: '80px',
    fontSize: '12px',
    color: theme?.palette?.custom?.mulled_wine,
    '& a': {
      color: theme?.palette?.custom?.bright,
    },
  }),
  buttonPicker: {
    position: 'relative',
    display: 'inline-block',
  },
  datePickerWrapper: {
    position: 'absolute',
    bottom: '100%',
    right: '0',
    zIndex: '100',
    boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
};
