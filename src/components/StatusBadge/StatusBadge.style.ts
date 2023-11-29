export const styles = {
  select: (value: any, defaultValue: any, theme: any) => {
    return {
      borderRadius: '16px',
      height: '22px',
      '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      'svg path': {
        fill:
          value === 'ACTIVE' || value === 'open'
            ? theme?.palette?.success?.main
            : theme?.palette?.error?.main,
      },
    };
  },
};
