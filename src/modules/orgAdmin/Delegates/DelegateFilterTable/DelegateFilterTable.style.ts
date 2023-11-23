export const styles = {
  fiterButton: (theme: any) => {
    return {
      display: 'flex',
      alignContent: 'center',
      columnGap: '10px',
      border: `1px solid ${theme?.palette?.grey[0]}`,
      color: `${theme?.palette?.custom.main}`,
      fontWeight: 500,
      fontSize: '14px',
    };
  },
};
