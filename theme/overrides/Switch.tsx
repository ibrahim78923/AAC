const Switch = (theme: any) => {
  return {
    MuiSwitch: {
      '& .MuiSwitch-switchBase': {
        width: 46,
        height: 20,
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: theme?.palette?.common?.white,
          '& + .MuiSwitch-track': {
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        width: 36,
        height: 20,
        boxSizing: 'border-box',
      },
      '& .MuiSwitch-track': {
        width: 36,
        height: 20,
        borderRadius: 26 / 2,
        backgroundColor:
          theme?.palette?.mode === 'light' ? '#D2D6DF' : '#39393D',
        opacity: 1,
        transition: theme?.transitions?.create(['background-color'], {
          duration: 500,
        }),
      },
    },
  };
};

export default Switch;
