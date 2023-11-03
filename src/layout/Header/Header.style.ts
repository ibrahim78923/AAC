export const styles = {
  searchAnimation: (isExpanded: boolean, theme: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      transition: 'width 0.3s ease-in-out',
      width: isExpanded ? 250 : 42,
      background: !isExpanded ? '#F6F7FC' : theme.palette.common.white,
      borderRadius: '20px',
      color: theme.palette.common.black,

      boxShadow: '0px 2px 10px 2px rgba(0, 0, 0, 0.10)',
    };
  },

  searchIcon: (theme: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      width: 40,
      background: '#F6F7FC',
      borderRadius: '20px',
      color: theme.palette.common.black,
      boxShadow: '0px 2px 10px 2px rgba(0, 0, 0, 0.10)',
    };
  },
  quickLinkBox: (theme: any) => {
    return {
      border: `1px solid ${theme.palette.custom.dark}`,
      display: { sm: 'flex', xs: 'none' },
      flexDirection: 'row',
      borderRadius: '6px',
      padding: '8px 0px 4px 0px',
    };
  },
  innerQuickLinkBox: (theme: any) => {
    return {
      borderRight: `1px solid ${theme.palette.custom.dark}`,

      '&:last-child': {
        borderRight: 'none',
      },
      padding: '0px 12px 0px 12px ',
    };
  },
};
