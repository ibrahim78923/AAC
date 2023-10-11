export const styles = {
  timeSlot: (theme: any) => {
    return {
      background: theme.palette.common.white,
      width: 'fit-content',
      position: 'relative',
      paddingRight: '20px',
      '&:before': {
        content: '""',
        position: 'absolute',
        right: '0',
        top: '10px',
        background: theme.palette.grey[700],
        width: '9px',
        height: '9px',
        borderRadius: '50%',
      },
    };
  },
  chatBoxWrapperInset: (theme: any) => {
    return {
      background: theme.palette.primary.lighter,
      padding: '10px 14px',
      width: 'fit-content',
      borderRadius: '12px 12px 12px 0px',
      border: `1px solid ${theme.palette.grey[700]}`,
    };
  },
};
