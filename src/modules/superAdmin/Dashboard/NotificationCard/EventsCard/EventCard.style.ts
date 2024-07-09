export const style = {
  stepperIconColor: (borderColor: string) => {
    return {
      border: `1px solid ${borderColor}`,
      borderRadius: '50%',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
};
