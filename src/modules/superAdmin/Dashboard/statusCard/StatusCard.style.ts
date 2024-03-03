import { GreenBgImage, UnionBgImage } from '@/assets/images';

export const style = {
  TotalClientStyle: (theme: any) => {
    return {
      height: '100%',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      backgroundImage: `url(${UnionBgImage?.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: `${theme?.palette?.custom?.aqua_breeze}`,
      },
    };
  },
  TotalUserStyle: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      backgroundImage: `url(${UnionBgImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#0AADC780',
      },
    };
  },
  EarningCardStyle: (theme: any) => {
    return {
      height: '100%',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '0.8rem',
      backgroundImage: `url(${GreenBgImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#47B2631A',
      },
    };
  },
};
