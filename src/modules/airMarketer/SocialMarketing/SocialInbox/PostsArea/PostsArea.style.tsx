export const styles = {
  mainPostsWrapper: () => {
    return {
      borderRadius: '15px',
      width: '100%',
      border: '1px solid #e7e7e9',
      padding: '24px',
    };
  },
  postCard: () => {
    return {};
  },
  gallery: () => {
    return {
      '& img': {
        width: '100%',
        height: 'auto',
        borderRadius: '15px',
      },
    };
  },
  reactionsGripper: () => {
    return {
      borderTop: '1px solid #D9DBE9',
      borderBottom: '1px solid #D9DBE9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pt: 1,
      pb: 1,
      mt: 1,
    };
  },
  reactionsFlex: () => {
    return {
      display: 'flex',
    };
  },
  boxReaction: () => {
    return {
      display: 'flex',
      gap: '3px',
      borderRight: '1px solid #D9DBE9',
      padding: '0px 14px',
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

      borderRight: '1px solid #EBECF1',
      '& :last-child': {
        borderRight: '1px solid red',
      },
    };
  },
};
