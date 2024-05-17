export const styles = {
  title: () => ({
    padding: '20px 20px 0px',
  }),
  createdLink: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[0]}`,
    padding: '15px 32px 15px 15px',
    borderRadius: '8px',
    position: 'relative',
    '& .MuiTypography-root': {
      color: theme?.palette?.grey[900],
    },
  }),
  createdCode: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[0]}`,
    padding: '15px 32px 15px 15px',
    borderRadius: '8px',
    position: 'relative',
    color: theme?.palette?.grey[900],
  }),
};
