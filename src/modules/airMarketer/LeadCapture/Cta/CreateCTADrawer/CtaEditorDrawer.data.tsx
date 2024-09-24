import {
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { BASE_URL } from '@/config';
import { END_POINTS } from '@/routesConstants/endpoints';
import { generateImage } from '@/utils/avatarUtils';
import { convertObjectToCSS } from '@/utils/form-builder';

export const DRAWER_TITLE = {
  create: 'Create',
  edit: 'Edit',
  view: 'View',
};

export const BUTTON_TYPE = {
  image: 'image',
  customized: 'customized',
};

export const defaultStylesCustomized = {
  border: '1px solid #38CAB5',
  padding: '13px 15px',
  borderRadius: '4px',
  color: '#38CAB5',
  display: 'inline-flex',
  alignItem: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '14px',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  textTransform: 'capitalize',
  fontWeight: 700,
};

export const defaultStylesImage = {
  border: '1px solid #38CAB5',
  padding: '0',
  margin: '0',
  borderRadius: '4px',
  overflow: 'hidden',
  color: '#38CAB5',
  display: 'inline-flex',
  alignItem: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '14px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  textTransform: 'capitalize',
  fontWeight: 700,
};

export const getMarPadFormat = (value: string) => {
  if (!value || !value.trim()) {
    return '0';
  }
  const formattedStr = value
    .split(',')
    .map((v) => v.trim())
    .join(' ');
  return formattedStr;
};

export const step1ValidationSchema = (ctaType: string, title: string) =>
  Yup?.object()?.shape({
    buttonContent:
      ctaType === BUTTON_TYPE?.customized
        ? Yup.string().trim().nullable().required('Field is Required')
        : Yup.string().trim().nullable(),
    buttonPadding: Yup.string()
      .trim()
      .nullable()
      .matches(/^(\d+px,?\s*){0,3}\d+px$/, {
        message: 'Invalid padding format.',
        excludeEmptyString: true,
      }),
    buttonMargin: Yup.string()
      .trim()
      .nullable()
      .matches(/^(\d+px,?\s*){0,3}\d+px$/, {
        message: 'Invalid Margin format',
        excludeEmptyString: true,
      }),
    buttonImage:
      ctaType === BUTTON_TYPE?.image && title === DRAWER_TITLE?.create
        ? Yup?.mixed()?.nullable()?.required('Field is Required')
        : Yup?.mixed()?.nullable(),

    imageWidth: Yup.mixed()
      .nullable()
      .test(
        'is-number-or-empty',
        'Image width must be a number',
        function (value: any) {
          if (value === undefined || value === null || value === '') {
            return true;
          }
          return !isNaN(value);
        },
      ),
    imageHeight: Yup.mixed()
      .nullable()
      .test(
        'is-number-or-empty',
        'Image height must be a number',
        function (value: any) {
          if (value === undefined || value === null || value === '') {
            return true;
          }
          return !isNaN(value);
        },
      ),
  });

export const step2ValidationSchema = Yup?.object()?.shape({
  ctaInternalName: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
  urlRedirectType: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
  url: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.matches(
      /^(https?|http):\/\//,
      'URL must start with "http://" or "https://"',
    )
    ?.url('Invalid URL format')
    ?.required('Field is Required'),
});

const marginPaddingPxFormat = (values: string) => {
  const parts = values?.split('px').filter((part) => part !== '');
  const result = parts
    ?.map((part, index) =>
      index < parts.length - 1 ? part + 'px, ' : part + 'px',
    )
    .join('');
  return result;
};

export const ctaDefaultValues = (data: any) => {
  const styles = data?.styles;
  const paddings = marginPaddingPxFormat(styles?.padding);
  const margins = marginPaddingPxFormat(styles?.margin);
  const imageWidth = data?.imageWidth
    ? Number(data?.imageWidth?.replace('px', ''))
    : null;
  const imageHeight = data?.imageHeight
    ? Number(data?.imageHeight?.replace('px', ''))
    : null;

  return {
    buttonContent: data?.buttonContent ?? null,
    buttonStyle: data?.buttonStyle ?? 'default',
    buttonColor: data?.buttonColor ?? null,
    buttonSize: data?.buttonSize ?? null,
    buttonPadding: paddings ?? null,
    buttonMargin: margins ?? null,
    ctaInternalName: data?.ctaInternalName ?? null,
    urlRedirectType: data?.urlRedirectType ?? null,
    url: data?.url ?? null,
    buttonImage: data?.buttonImage ?? null,
    imageWidth: imageWidth,
    imageHeight: imageHeight,
    imageAltText: data?.imageAltText ?? null,
  };
};

export const customizedButtonData = [
  {
    componentProps: {
      name: 'buttonContent',
      label: 'Button content',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'buttonStyle',
      label: 'Button style',
      select: true,
    },
    options: [
      { value: 'default', label: 'Default' },
      { value: 'simple', label: 'Simple' },
      { value: 'basic', label: 'Basic' },
      { value: 'minimal', label: 'Minimal' },
      { value: 'standard', label: 'Standard' },
    ],
    component: RHFSelect,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonColor',
      label: 'Button Color',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonSize',
      label: 'Button Size',
      select: true,
    },
    options: [{ value: 'Fit to Size', label: 'Fit to Size' }],
    component: RHFSelect,
    xs: 12,
  },

  {
    componentProps: {
      name: 'buttonPadding',
      label: 'Button Padding',
      fullWidth: true,
      helperText:
        "Enter padding, e.g., '12px', or multiple values separated by commas, e.g., '10px, 12px, 13px'.",
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'buttonMargin',
      label: 'Button Margin',
      fullWidth: true,
      helperText:
        "Enter margin, e.g., '12px', or multiple values separated by commas, e.g., '10px, 12px, 13px'.",
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const ImageButtonData = [
  {
    componentProps: {
      name: 'buttonImage',
      label: 'Picture',
      fullWidth: true,
      required: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
    xs: 12,
  },

  {
    componentProps: {
      name: 'imageWidth',
      label: 'Image Width',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'imageHeight',
      label: 'Image Height',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
  {
    componentProps: {
      name: 'imageAltText',
      label: 'Alt Text',
      fullWidth: true,
    },
    component: RHFTextField,
    xs: 12,
  },
];

export const getButtonData = (buttonType: string) => {
  if (buttonType === BUTTON_TYPE.image) {
    return ImageButtonData;
  } else if (buttonType === BUTTON_TYPE.customized) {
    return customizedButtonData;
  } else {
    return [];
  }
};

export const buttonInfoData = [
  {
    component: RHFTextField,
    xs: 12,
    componentProps: {
      name: 'ctaInternalName',
      label: 'CTA Internal Name',
      placeholder: 'Left18px',
      fullWidth: true,
      required: true,
    },
  },
  {
    component: RHFSelect,
    xs: 8,
    componentProps: {
      name: 'urlRedirectType',
      label: 'URL Redirect Type',
      select: true,
      required: true,
    },
    options: [
      { value: 'new', label: 'New' },
      { value: 'air apple cart page', label: 'Air Apple Cart Page' },
      { value: 'air apple blog post', label: 'Air Apple Blog Post' },
      { value: 'meeting link', label: 'Meeting Link' },
      { value: 'file link', label: 'File Link' },
    ],
  },
  {
    component: RHFTextField,
    xs: 12,
    componentProps: {
      name: 'url',
      label: 'Enter URL',
      fullWidth: true,
      required: true,
    },
  },
];

// function convertObjectToCSS(obj: any) {
//   return Object.entries(obj)
//     .map(([key, value]) => {
//       // Convert camelCase to kebab-case
//       const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
//       return `${kebabKey}: ${value};`;
//     })
//     .join(' ');
// }

export const generateCtaIframe = (data: any) => {
  const endPoint = `${BASE_URL}${END_POINTS?.CTA_ADD_VIEW_CLICK_COUNT}`;
  const buttonContent =
    data?.buttonType === 'customized'
      ? data?.buttonContent
      : `<img
        src="${generateImage(data?.buttonImage?.url)}"
        alt="${data?.imageAltText}"
        width="${data?.imageWidth}"
        height="${data?.imageHeight}"
      />`;

  const ctaHtml = `<button id="ctaButton" class="ctaButton">${buttonContent}</button>`;

  const cssString = convertObjectToCSS(data?.styles);

  const htmlDocument = `
  <!DOCTYPE html>
  <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>Button</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: transparent;
        }
        .ctaButton {${cssString}}
      </style>
    </head>
    <body>
      ${ctaHtml}

      <script>
        const ctaBtn = document.getElementById('ctaButton');
        const reqUrl = '${endPoint}/${data?._id}';
        
        const requestUpdateClickCount = (actionType) => {
          const payload = {
            actionType: actionType,
          };

          fetch(reqUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
          .then(response => {
            if (response.ok) {
                console.log('Resource updated successfully!');
            } else {
                console.error('Error updating resource:', response.status);
            }
          })
          .catch(error => {
              console.error('Fetch error:', error);
          });
        }

        ctaBtn.addEventListener('click', (e) => {
          e.preventDefault();
          requestUpdateClickCount('clickCount');
          window.open('${data?.url}', '_blank');
        });

        // Add view count on page load
        requestUpdateClickCount('viewCount');
        
      </script>
    </body>
  </html>`;

  const decodeHtmlEntities = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const encodedHtml = encodeURIComponent(decodeHtmlEntities(htmlDocument));

  const iframeSrc = `data:text/html;charset=utf-8,${encodedHtml}`;

  const iframe = `<iframe
    style="border: none; width: 100%; height: 100%;"
    src="${iframeSrc}"
  />`;

  return iframe;
};
