import { GreenBgImage, UnionBgImage } from '@/assets/images';

export const style = {
  TotalCardStyle: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
      backgroundImage: `url(${UnionBgImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'space-between',
    };
  },
  EarningCardStyle: (theme: any) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '0.8rem',
      backgroundImage: `url(${GreenBgImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'space-between',
    };
  },
};
