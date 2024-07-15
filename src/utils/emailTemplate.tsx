import { TEMPLATE_CONTENT_TYPES } from '@/constants';
import { useTheme } from '@mui/material';

export function generateHTML(items: any[], minifyPreview: boolean = false) {
  const theme = useTheme();
  return items
    ?.map((item) => {
      let htmlString = '';
      switch (item?.type) {
        case TEMPLATE_CONTENT_TYPES?.TEXT_AREA:
          htmlString = item?.value ? `<div>${item?.value}</div>` : '';
          break;
        case TEMPLATE_CONTENT_TYPES?.SPACE:
          htmlString = '<br />';
          break;
        case TEMPLATE_CONTENT_TYPES?.BUTTON:
          htmlString = item?.buttonText
            ? `<button 
                style="background: ${theme?.palette?.primary?.main}; 
                outline: none;
                border: none;
                padding: ${minifyPreview ? '3px 10px' : '7px 20px'};
                color: ${theme?.palette?.common?.white};
                border-radius: 3px;
                margin-top: 6px;
                font-size: ${
                  minifyPreview ? '10px !important' : '16px !important'
                };
                ">${item?.buttonText}</button><br/>`
            : '';
          break;
        case TEMPLATE_CONTENT_TYPES?.DIVIDER:
          htmlString = `<hr style="background: ${theme?.palette?.grey[700]}; border:none; height: 1px; margin-top: 5px; margin-bottom: 5px;" />`;
          break;
        default:
          htmlString = '';
      }

      return htmlString;
    })
    ?.join('');
}
