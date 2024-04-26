export const styles = {
  commentsWrapper: () => {
    return {
      width: '100%',
      padding: '10px 0px',
      mt: 1,
      display: 'flex',
      justifyContent: 'space-between',
    };
  },
  commentSection: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid #E5E7EB',
      width: '92%',
      borderRadius: '8px',
      paddingRight: '10px',
      '@media (max-width:700px)': {
        width: '70vw',
      },
      '@media (max-width:400px)': {
        width: '55vw',
      },
    };
  },
  unStyledButton: () => {
    return {
      borderRadius: '50%',
      width: 'fit-content',
      minWidth: 'fit-content',
      height: 'fit-content',
      margin: '0',
      padding: '0',
    };
  },
  chatTextarea: () => {
    return {
      width: '100%',
      '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
        border: '0px',
      },
    };
  },
};
