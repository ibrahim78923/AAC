export const styles = {
  totalDeals: (theme: any) => {
    return {
      background: '#FFE8E8',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        border: `1px solid ${theme?.palette?.error?.main}`,
      },
    };
  },
  openDeals: (theme: any) => {
    return {
      background: '#ECFFF1',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        border: `1px solid ${theme?.palette?.success?.main}`,
      },
    };
  },
  closeDeals: (theme: any) => {
    return {
      background: '#ECFCFF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem',
      borderRadius: '8px',
      cursor: 'pointer',
      '&:hover': {
        border: `1px solid ${theme?.palette?.custom?.bright}`,
      },
    };
  },
  pieChart: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
      padding: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '8px',
    };
  },
};
