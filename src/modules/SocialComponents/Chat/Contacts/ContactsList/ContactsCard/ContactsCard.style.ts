export const styles = {
  contactsCardMain: (isCardHover: boolean, theme: any, isActiveUser: any) => {
    return {
      border: '1px solid #E5E7EB',
      borderLeft: isActiveUser
        ? `5px solid ${theme?.palette?.primary?.main}`
        : '1px solid #E5E7EB',
      height: '104px',
      padding: `${isCardHover ? '14px 10px 14px 0px' : '14px 10px 14px 32px'}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      boxShadow: `${
        isCardHover ? '0px 0px 4px 0px rgba(0, 0, 0, 0.10' : 'none'
      }`,
    };
  },
  chatNotification: () => {
    return {
      background: '#1F305D',
      color: '#fff',
      width: '21px',
      height: '21px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      marginLeft: '30px',
    };
  },
};
