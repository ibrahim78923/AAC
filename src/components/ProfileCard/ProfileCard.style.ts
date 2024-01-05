export const styles = {
  cardWrapper: (theme: any) => {
    return {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: theme.palette.common.white,
      borderRadius: '8px',
      flexWrap: 'wrap',
      display: 'flex',
      padding: '24px',
    };
  },
  profile: {
    gap: { md: '24px', xs: '12px' },
    alignItems: 'center',
    flexWrap: 'wrap',
    display: 'flex',
  },
  badge: (theme: any) => {
    return {
      backgroundColor: '#E6FAEB',
      borderRadius: '30px',
      padding: '2px 8px',
      color: theme.palette.success.main,
    };
  },
  imgWrapper: (theme: any) => ({
    position: 'relative',
    color: theme?.grey[500],
    borderRadius: '21px',
    overflow: 'hidden',
    height: 120,
    width: 120,
    '& .user_profile': {
      objectFit: 'cover',
      heigth: '100%',
      width: '100%',
      backgroundColor: 'black',
    },
  }),
  editIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'none',
    cursor: 'pointer',
  },
  iconWrapper: (theme: any) => {
    return {
      background: theme.palette.grey[100],
      borderRadius: '4px',
      height: '28px',
      width: '28px',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    };
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
};
