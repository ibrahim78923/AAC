export const styles = {
  heading: () => ({
    lineHeight: '1.25',
  }),
  previewAvatar: () => ({
    width: 40,
    height: 40,
    bgcolor: 'primary.main',
    fontSize: '14px',
  }),
  previewName: (theme: any) => ({
    fontSize: '15px !important',
    lineHeight: '1',
    fontWeight: '700',
    color: theme?.palette?.custom?.text_slate_blue,
  }),
  previewTime: () => ({
    fontSize: '13px !important',
    lineHeight: '1',
    mt: '5px',
  }),
  previewAttachment: (theme: any) => ({
    bgcolor: theme?.palette?.custom?.light_grayish_blue,
    height: '150px',
    borderRadius: '12px',
  }),
  previewLabel: (theme: any) => ({
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '600',
    color: theme?.palette?.custom?.mulled_wine,
    mb: '8px',
  }),
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
  previewContacts: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '8px',
    padding: '10px',
  }),
};
