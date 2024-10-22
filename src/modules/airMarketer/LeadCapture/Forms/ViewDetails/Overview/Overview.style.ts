export const styles = {
  heading: (theme: any) => ({
    marginBottom: '25px',
    color: theme?.palette?.slateBlue?.main,
  }),
  fieldLabel: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme?.palette?.grey[600],
    mb: '6px',
  }),
  nameField: (theme: any) => ({
    height: '44px',
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    display: 'flex',
    alignItems: 'center',
    p: '6px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    color: theme?.palette?.grey[900],
    '&.fieldURL': {
      backgroundColor: theme?.palette?.grey[100],
      borderColor: theme?.palette?.grey[100],
      '& > span': {
        flex: '1',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& > .MuiIconButton-root': {
        ml: '8px',
      },
    },
  }),
  embedBtn: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.lighter,
    marginTop: '25px',
  }),
  dialogContent: (theme: any) => ({
    marginTop: '1rem',
    border: `1px solid ${theme?.palette?.grey[0]}`,
    padding: '15px 32px 15px 15px',
    borderRadius: '8px',
    position: 'relative',
    maxHeight: '320px',
    overflowY: 'auto',
  }),
  dialogCode: (theme: any) => ({
    color: theme?.palette?.grey[900],
    fontSize: `0.875rem`,
  }),
  copyBtn: () => ({
    position: 'absolute',
    right: '13px',
    top: '13px',
    cursor: 'pointer',
  }),
};
