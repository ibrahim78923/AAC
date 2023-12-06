export const styles = {
  inputStyle: {
    '@media (max-width:500px)': {
      width: '100%',
    },
    width: '80%',
    '& div': {
      border: 'none',
      '&:hover fieldset': {
        borderColor: '#88DFD3 !important',
        boxShadow: '0px 0px 0px 3px #A0E5DB80',
      },
    },
    '& input': {
      height: '24px',
      border: `none`,
      borderRadius: '8px',
      fontSize: '16px',
      padding: '10px',
      color: 'black',
    },
    '& .Mui-disabled': {
      background: '#F9FAFB',
    },
  },
};
