export const styles = {
  AttachmentDetailsTitle: (theme: any) => ({
    color: theme.palette.grey[800],
    fontSize: {
      sm: '0.875rem',
      xs: '0.625rem',
    },
    fontWeight: {
      sm: 500,
      xs: 400,
    },
    lineHeight: '1.25rem',
    letterSpacing: '-0.0175rem',
  }),
  AttachmentDetailsTitleDescript: {
    color: '#8F98AE',
    fontSize: {
      sm: '0.625rem',
      xs: '0.5rem',
    },
    fontStyle: 'normal',
    fontWeight: {
      sm: 400,
      xs: 300,
    },
    lineHeight: '1.125rem',
    letterSpacing: '-0.0125rem',
  },
  AttachmentDetailsCards: {
    width: '100%',
    height: '4.375rem',
    flexShrink: 0,
    borderRadius: '0.5rem',
    border: '0.0625rem solid #E5E7EB',
    background: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
  },
  AttachmentDetailsTitleButton: (theme: any) => ({
    fontWeight: '500',
    backgroundColor: theme.palette.primary.lighter,
    padding: '0.5625rem 1.125rem',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.lighter,
      color: theme.palette.primary.main,
    },
  }),
};
