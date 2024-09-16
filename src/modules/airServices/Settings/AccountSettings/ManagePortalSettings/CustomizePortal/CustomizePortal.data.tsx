import { RHFDropzonePreview, RHFTextField } from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { pxToRem } from '@/utils/getFontValue';

export type DefaultValuesKeys = keyof ReturnType<
  typeof customizePortalDefaultValues
>;

export const customizePortalDefaultValues = (theme?: any, data?: any) => ({
  image: data?.logo ?? null,
  btnPrimary: data?.btnPrimary ?? theme?.palette?.primary?.main,
  btnSecondary: data?.btnSecondary ?? theme?.palette?.secondary?.main,
  sideMenu: data?.sideMenu ?? theme?.palette?.common?.white,
  iconPrimary: data?.iconPrimary ?? theme?.palette?.secondary?.main,
  iconSecondary: data?.iconSecondary ?? theme?.palette?.common?.white,
});

const fieldStylings = {
  '& .MuiInputBase-root': {
    p: 0.8,
  },
  '& .MuiOutlinedInput-input': {
    p: 0,
    height: pxToRem(44),
  },
  '& input[type="color"]': {
    width: '100%',
    cursor: 'pointer',
  },
  '& input[type="color"]::-webkit-color-swatch': {
    border: 'none',
    borderRadius: 1,
  },
  '& input[type="color"]::-webkit-color-swatch-wrapper': {
    padding: 0,
  },
};

const iconButtonStylings = {
  bgcolor: 'blue.darker',
  color: 'common.white',
  borderRadius: 1,
  height: pxToRem(44),
  width: pxToRem(44),
  '&:hover': {
    bgcolor: 'blue.darker',
  },
};

export const getCustomizationsDataArray = (
  resetHandler: (fieldName: DefaultValuesKeys) => void,
) => [
  {
    _id: 1,
    title: 'Company Logo',
    contentArray: [
      {
        id: 1,
        componentProps: {
          name: 'image',
          fileType: 'Supports JPEG and PNG Files',
          accept: {
            'image/png': ['.png', '.PNG'],
            'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
          },
        },
        component: RHFDropzonePreview,
      },
    ],
  },
  {
    _id: 2,
    title: 'Button Colors',
    contentArray: [
      {
        id: 2,
        componentProps: {
          name: 'btnPrimary',
          label: 'Primary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('btnPrimary')}
                  sx={{ ...iconButtonStylings }}
                >
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          sx: { ...fieldStylings },
        },
        component: RHFTextField,
      },
      {
        id: 3,
        componentProps: {
          name: 'btnSecondary',
          label: 'Secondary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('btnSecondary')}
                  sx={{ ...iconButtonStylings }}
                >
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          sx: { ...fieldStylings },
        },
        component: RHFTextField,
      },
    ],
  },
  {
    _id: 3,
    title: 'Side Menu Color',
    contentArray: [
      {
        id: 4,
        componentProps: {
          name: 'sideMenu',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('sideMenu')}
                  sx={{ ...iconButtonStylings }}
                >
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          sx: { ...fieldStylings },
        },
        component: RHFTextField,
      },
    ],
  },
  {
    _id: 4,
    title: 'Side Menu Icons Color',
    contentArray: [
      {
        id: 5,
        componentProps: {
          name: 'iconPrimary',
          label: 'Primary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('iconPrimary')}
                  sx={{ ...iconButtonStylings }}
                >
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          sx: { ...fieldStylings },
        },
        component: RHFTextField,
      },
      {
        id: 6,
        componentProps: {
          name: 'iconSecondary',
          label: 'Secondary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('iconSecondary')}
                  sx={{ ...iconButtonStylings }}
                >
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          sx: { ...fieldStylings },
        },
        component: RHFTextField,
      },
    ],
  },
];
