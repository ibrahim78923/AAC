export const styles = {
  mainPostsWrapper: () => {
    return {
      borderRadius: '15px',
      width: '100%',
      // border: '1px solid #e7e7e9',
      padding: '10px',
    };
  },
  postCard: () => {
    return {};
  },
  gallery: (postType: any) => {
    return {
      mt: postType === 'fbPost' ? 0 : 2,
      '& img': {
        width: '100%',
        height: 'auto',
        borderRadius: '15px',
      },
    };
  },
  reactionsGripper: (postType: any) => {
    return {
      borderTop: postType === 'fbPost' ? '1px solid #D9DBE9' : 'none',
      borderBottom: postType === 'fbPost' ? '1px solid #D9DBE9' : 'none',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'space-between',
      pt: postType === 'fbPost' ? 1 : 0,
      pb: postType === 'fbPost' ? 1 : 0,
      mt: postType === 'fbPost' ? 1 : 0,
    };
  },
  reactionsFlex: () => {
    return {
      display: 'flex',
    };
  },
  boxReaction: (postType: any) => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      borderRight:
        postType === 'fbPost' ? '1px solid #D9DBE9' : '1px solid transparent',
      padding: postType === 'fbPost' ? '0px 14px' : '0px 0px',
      marginRight: postType === 'fbPost' || 'twitterPost' ? '20px' : '0px',
      cursor: 'pointer',
      '&:last-child': {
        borderRight: '1px solid transparent',
      },
    };
  },
  userProfiles: () => {
    return {
      position: 'relative',
      width: 'fit-content',
      height: 'fit-content',
    };
  },
  bottomIcon: () => {
    return {
      position: 'absolute',
      right: '-15px',
      top: '10px',
      bottom: '0',
      width: 'fit-content',
      height: 'fit-content',
    };
  },
  profileStats: () => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',

      '& :last-child': {
        borderRight: '1px solid red',
      },
    };
  },
};
