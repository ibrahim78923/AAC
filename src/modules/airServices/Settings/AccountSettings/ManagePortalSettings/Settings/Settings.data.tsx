import { RHFTextField } from '@/components/ReactHookForm';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import * as Yup from 'yup';
import { IconButton, InputAdornment } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  ISettingsDataItem,
  ISettingsDefaultValues,
  ISettingsDefaultValuesProps,
} from './Settings.interface';

export const settingsValidationSchema = Yup?.object()?.shape({
  portalName: Yup?.string(),
  portalURL: Yup?.string(),
  dateFormat: Yup?.string(),
  timeFormat: Yup?.string(),
  primaryLanguage: Yup?.string(),
});

export const settingsDefaultValues = ({
  domain,
  encryptedValue,
  apiKeyData,
}: ISettingsDefaultValuesProps): ISettingsDefaultValues => {
  return {
    portalName: 'Air Customer Portal',
    portalURL: `${domain}/air-customer-portal/sign-up?companyId=${encryptedValue}`,
    dateFormat: DATE_FORMAT?.UI,
    timeFormat: TIME_FORMAT?.UI,
    primaryLanguage: 'English',
    apiKey: apiKeyData ?? '',
  };
};

export const getSettingsDataArray = (
  handleTextFieldClick?: () => void,
  handleApiKeyClick?: () => void,
): ISettingsDataItem[] => [
  {
    id: 1,
    componentProps: {
      name: 'portalName',
      label: 'Portal Name',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'portalURL',
      label: 'Portal URL',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTextFieldClick}>
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    md: 6,
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'dateFormat',
      label: 'Date Format',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'timeFormat',
      label: 'Time Format',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'primaryLanguage',
      label: 'Primary Language',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    id: 7,
    componentProps: {
      name: 'apiKey',
      label: 'Api Key',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleApiKeyClick}>
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    md: 6,
    component: RHFTextField,
  },
];
