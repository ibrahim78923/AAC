export const styles = {
  chatAreaWrapper: () => {
    return {
      height: '55vh',
      overflow: 'scroll',
      padding: '15px 30px',
      '@media (max-width:600px)': {
        padding: '15px 20px',
      },
    };
  },
  chatInnerBox: (chatType: any) => {
    return {
      width: '100%',
      mb: 2,
      display: 'flex',
      justifyContent: chatType === 'receiver' ? 'flex-start' : 'flex-end',
    };
  },
  chatBox: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    };
  },
  userImageWrapper: () => {
    return {
      background: '#F3F4F6',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    };
  },
  chatBoxInset: (chatType: any) => {
    return {
      background: chatType === 'receiver' ? '#EBFAF8' : '#F9FAFB',
      padding: '16px',
      minWidth: '13vw',
      maxWidth: '25vw',
      borderRadius: '4px',
      '@media (max-width:600px)': {
        minWidth: '20vw',
        maxWidth: '50vw',
      },
    };
  },
  chatHead: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
  },
  // Chat Footer Styles
  chatFooter: () => {
    return {
      border: '1.5px solid #E5E7EB',
      padding: '14px 24px',
    };
  },
  chatFooterInset: () => {
    return {
      border: '1.5px solid #E5E7EB',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0px 15px 0px 0px',
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
