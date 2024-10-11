export const styles = {
  field: () => ({
    position: 'relative',
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
      padding: '10px 12px',
      borderRadius: '5px',
      border: `1px solid ${theme?.palette?.custom?.hex_grey}`,
    },
    '& textarea.field-control': {
      height: 'auto',
    },
  }),
  fieldButton: (theme: any, style: any) => ({
    border: `1px solid ${
      style?.backgroundColor ?? theme?.palette?.primary?.main
    }`,
    backgroundColor: style?.backgroundColor ?? theme?.palette?.primary?.main,
    color: style?.color ?? theme?.palette?.common?.white,
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  }),
};
