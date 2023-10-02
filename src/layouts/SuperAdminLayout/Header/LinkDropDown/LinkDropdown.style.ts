export const LinkDropDownStyles = {
  quickLinkButtonStyle: (isLinkDropDownOpen: boolean, theme: any) => {
    return {
      borderRadius: '4px',
      padding: '3px 10px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',

      background: isLinkDropDownOpen && theme.palette.grey[400],
      border: isLinkDropDownOpen
        ? '1px solid transparent'
        : `1px solid ${theme.palette.grey[0]}`,
    };
  },

  menuDropDownLink: (isEditLink: boolean, theme: any) => {
    return {
      p: '6px',
      background: isEditLink
        ? `${theme?.palette?.primary?.lighter}`
        : 'transparent',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '28px',
    };
  },
};
