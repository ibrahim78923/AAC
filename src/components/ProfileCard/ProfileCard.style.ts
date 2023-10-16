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
  imgWrapper: {
    position: 'relative',
    borderRadius: '21px',
    overflow: 'hidden',
    height: 120,
    width: 120,
    '& .user_profile': {
      objectFit: 'cover',
      heigth: '100%',
      width: '100%',
    },
    '&:hover': {
      '& .edit-Icon': {
        display: 'flex',
      },
    },
  },
  editIcon: {
    transition: 'all 0.2s linear',
    justifyContent: 'center',
    background: '#79839E99',
    position: 'absolute',
    alignItems: 'center',
    cursor: 'pointer',
    display: 'none',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
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
