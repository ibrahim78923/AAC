export const styles = {
  mainWrapper: (theme: any) => {
    return {
      borderRadius: '12px',
      border: `1px solid ${theme?.palette?.custom?.off_white}`,
      boxShadow: `0px 1px 3px 0px ${theme?.palette?.custom?.transparent_dark_blue}`,
      padding: 2.4,
      height: 720,
      overflow: 'scroll',
    };
  },
  mainHeading: (theme: any) => {
    return {
      color: theme?.palette?.slateBlue?.main,
      fontSize: '1.25rem',
      fontWeight: 600,
      pb: '1.75rem',
    };
  },
  subHeading: (theme: any) => {
    return {
      color: theme?.palette?.custom?.main,
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '30px',
      pb: 2.4,
    };
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    m: '1.875rem 1.875rem 0 0',
  },
};
