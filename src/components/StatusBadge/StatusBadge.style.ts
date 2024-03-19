export const styles = {
  select: (color: string) => {
    return {
      borderRadius: '16px',
      height: '22px',
      '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      'svg path': {
        fill: color,
        // fill:
        //   value === 'ACTIVE' || value === 'open'
        //     ? theme?.palette?.success?.main
        //     : theme?.palette?.error?.main,
      },
    };
  },
};
