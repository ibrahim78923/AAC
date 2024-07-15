import { TEMPLATE_VIEW_TYPES } from '@/constants';

export const styles = {
  previewTemplateWrapper: (theme: any, value: string) => {
    return {
      padding:
        value === TEMPLATE_VIEW_TYPES?.LAPTOP ? '10px 100px' : '10px 30px',
      overflow: 'auto',
      paddingBottom: '20px',
      ...(value === TEMPLATE_VIEW_TYPES?.MOBILE && {
        borderRadius: '45px',
        border: `12px solid ${theme?.palette?.common?.black}`,
        width: '320px',
        height: '600px',
        margin: '0 auto',
        mt: 3,
        pt: 2,
        fontSize: '12px !important',
      }),
    };
  },
  previewTemplateMinifyWrapper: () => {
    return {
      padding: '0px',
      fontSize: '10px !important',
    };
  },
  customButtonStyle: (value: string) => {
    return {
      ...(value === TEMPLATE_VIEW_TYPES?.MOBILE && {
        fontSize: '12px !important',
        height: '30px',
      }),
    };
  },
  customButtonMinify: () => {
    return {
      fontSize: '8px !important',
      height: '25px',
    };
  },
};
