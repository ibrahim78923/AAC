export const styles = {
  select: (value: any, theme: any) => {
    return {
      padding: '2px 6px',
      borderRadius: '16px',
      height: '22px',
      '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      'svg path': {
        fill:
          value === 'active' || value === 'open'
            ? theme?.palette?.success?.main
            : theme?.palette?.error?.main,
      },
    };
  },
};
