export const styles = {
  mainDealBox: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      display: 'flex',
      flexWrap: 'wrap',
      borderRadius: '12px',
      rowGap: '5px',
      maxWidth: '360px',
      padding: '1.2rem',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: ' 0px 0px 5px 3px #A0E5DB40',
      },
    };
  },
};
