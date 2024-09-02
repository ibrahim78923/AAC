import { RHFDropZone, RHFTextField } from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { pxToRem } from '@/utils/getFontValue';

export type DefaultValuesKeys = keyof ReturnType<
  typeof customizePortalDefaultValues
>;

export const customizePortalDefaultValues = (theme?: any) => ({
  companyLogo: null,
  primaryButton: theme?.palette?.primary?.main,
  secondaryButton: theme?.palette?.secondary?.main,
  sideMenu: theme?.palette?.common?.white,
  sideMenuIconPrimary: theme?.palette?.secondary?.main,
  sideMenuIconSecondary: theme?.palette?.common?.white,
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
          name: 'companyLogo',
          maxSize: 1024 * 1024 * 2.44,
          fileType: 'Supports JPEG and PNG Files',
          accept: {
            'image/png': ['.png', '.PNG'],
            'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
          },
        },
        component: RHFDropZone,
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
          name: 'primaryButton',
          label: 'Primary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('primaryButton')}
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
          name: 'secondaryButton',
          label: 'Secondary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('secondaryButton')}
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
          name: 'sideMenuIconPrimary',
          label: 'Primary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('sideMenuIconPrimary')}
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
          name: 'sideMenuIconSecondary',
          label: 'Secondary',
          type: 'color',
          InputProps: {
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={() => resetHandler('sideMenuIconSecondary')}
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
