export const style = {
  postCompareBox: (theme: any) => ({
    backgroundColor: theme?.primary?.lighter,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '366px',
    padding: '20px',
    borderRadius: '8px',
    '.postContent': {
      whiteSpace: 'nowrap',
      width: '215px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
  comparePosts: {
    '.MuiTableRow-head': {
      display: 'none',
    },
  },
  avatarStyle: (category: any) => ({
    backgroundColor: category === 'facebook' ? '#3B5998' : '#E1306C',
    height: '44px',
    width: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    '.MuiAvatar-root': {
      border: '2px solid #fff',
    },
    '.avatar-category': {
      position: 'absolute',
      right: '0',
      bottom: '-7px',
      svg: {
        backgroundColor: 'white',
        padding: '1px',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
      },
    },
  }),
};
