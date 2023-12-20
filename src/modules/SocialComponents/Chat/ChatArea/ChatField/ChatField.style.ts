export const styles = {
  timeSlot: (theme: any) => {
    return {
      background: theme?.palette?.common?.white,
      width: 'fit-content',
      position: 'relative',
      paddingRight: '20px',
      '&:before': {
        content: '""',
        position: 'absolute',
        right: '0',
        top: '10px',
        background: theme?.palette?.grey[700],
        width: '9px',
        height: '9px',
        borderRadius: '50%',
      },
    };
  },
  chatBoxWrapperInset: (theme: any, role: any) => {
    return {
      position: 'relative',
      background:
        role === 'sender'
          ? theme?.palette?.primary?.main
          : theme?.palette?.primary?.lighter,
      color:
        role === 'sender'
          ? theme?.palette?.common?.white
          : theme?.palette?.custom?.grayish_blue,
      padding: '10px 14px',
      minWidth: '15vw',
      maxWidth: '46vw',
      borderRadius: `${
        role === 'sender' ? '12px 12px 0px 12px' : '12px 12px 12px 0px'
      }`,
      border: `1px solid ${theme?.palette?.grey[700]}`,
    };
  },
  chatMessageArea: (role: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      flexDirection: role === 'sender' ? 'row-reverse' : 'flex-start',
      justifyContent: 'end',
      gap: '10px',
    };
  },
  mainChatArea: (role: any) => {
    return {
      display: 'flex',
      flexDirection: role === 'sender' ? 'row-reverse' : 'flex-start',
      gap: '10px',
      alignItems: 'flex-end',
    };
  },
  chatReplyReference: () => {
    return {
      width: '85%',
      paddingLeft: '20px',
      marginTop: '-60px',
    };
  },
  chatReplyReferenceContent: () => {
    return {
      background: '#F9FAFB',
      width: '100%',
      borderRadius: '16px 16px 0px 0px',
      padding: '20px',
    };
  },

  chatReaction: () => {
    return {
      background: '#F9F9F9',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      position: 'absolute',
      right: '25px',
      top: '-15px',
      color: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  sendReaction: (theme: any) => {
    return {
      background: theme?.palette?.common?.white,
      boxShadow: '01px 4px 4px 0px rgb(194 194 194 / 16%)',
      width: '100%',
      height: '50px',
      position: 'absolute',
      bottom: '-50px',
      left: '0px',
      borderRadius: '8px',
      border: `1px solid ${theme?.palette?.grey[400]}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      padding: '0px 15px',
      zIndex: '1',
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
};
