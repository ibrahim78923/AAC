export const styles = {
  mainDealBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      display: 'flex',
      flexWrap: 'wrap',
      rowGap: '5px',
      maxWidth: '360px',
      padding: '1.2rem',
      cursor: 'pointer',
    };
  },
};
