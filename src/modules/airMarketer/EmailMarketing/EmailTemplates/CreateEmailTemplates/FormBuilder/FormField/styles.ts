export const styles = {
  fieldWrapper: () => ({
    position: 'relative',
  }),

  field: (theme: any) => ({
    position: 'relative',
    border: '1px solid transparent',
    padding: '30px',
    mt: '20px',
    borderRadius: '5px',
    '&:hover': {
      borderColor: theme?.palette?.primary?.main,
      '& .field-actions': {
        opacity: '1',
        visibility: 'visible',
      },
      '& .drag-icon': {
        opacity: '1',
        visibility: 'visible',
      },
    },
  }),

  fieldLabel: () => ({
    '& label': {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: '500',
      color: 'rgb(75, 85, 99)',
      lineHeight: '1.5',
    },
  }),

  fieldInput: (theme: any) => ({
    '& .field-control': {
      fontSize: '16px',
      color: '',
      width: '100%',
      padding: '8px 12px',
      borderRadius: '5px',
      border: `1px solid ${theme?.palette?.custom?.hex_grey}`,
    },
    '& .field-button': {
      border: `1px solid ${theme?.palette?.primary?.main}`,
      backgroundColor: theme?.palette?.primary?.main,
      color: theme?.palette?.common?.white,
      fontSize: '14px',
      padding: '6px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  }),

  fieldActions: () => ({
    position: 'absolute',
    top: '10px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    opacity: '0',
    visibility: 'hidden',
    '& .field-tool': {
      cursor: 'pointer',
    },
  }),

  dragIcon: () => ({
    position: 'absolute',
    top: '10px',
    left: '10px',
    opacity: '0',
    visibility: 'hidden',
    cursor: 'move',
  }),
};
