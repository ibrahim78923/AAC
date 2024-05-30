export const styles = {
  notificationWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: (theme: any) => {
    return {
      background: theme?.palette?.common?.white,
      padding: '14px',
      m: '24px 10px',
      '&:hover': {
        background: theme?.palette?.custom?.light_white_bg,
        cursor: 'pointer',
      },
      boxShadow: '0px 0px 4px 0px #0000001A',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      borderRadius: '8px',
    };
  },
};
