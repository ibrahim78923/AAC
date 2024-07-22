export const styles = {
  media: (theme: any) => ({
    bgcolor: theme?.palette?.custom?.light_grayish_blue,
    placeItems: 'center',
    borderRadius: '12px',
    maxWidth: '504px',
    display: 'grid',
    height: 'auto',
  }),
  previewDetails: (theme: any) => ({
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    p: '10px 16px',
    minHeight: '80px',
    maxWidth: '504px',
    fontSize: '12px',
    mt: '16PX',
    '& p': {},
    '& a': {
      color: theme?.palette?.custom?.bright,
    },
  }),
};
