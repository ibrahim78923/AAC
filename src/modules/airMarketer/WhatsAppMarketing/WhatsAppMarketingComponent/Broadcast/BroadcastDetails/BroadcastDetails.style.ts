export const styles = {
  pageHeader: () => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '24px',
    rowWrap: 'wrap',
    '@media (max-width: 540px)': {
      display: 'block',
    },
  }),
  wrapper: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A`,
    '& .tabs-container': {
      ml: '24px',
      mt: '0',
    },
  }),
  cardHeader: (theme: any) => {
    return {
      background: theme?.palette?.grey[400],
      alignItems: 'center',
      width: 'fit-content',
      borderRadius: '30px',
      display: 'flex',
      p: '8px 16px',
      gap: 1,
      '@media (max-width: 540px)': {
        mt: '8px',
      },
    };
  },
};
