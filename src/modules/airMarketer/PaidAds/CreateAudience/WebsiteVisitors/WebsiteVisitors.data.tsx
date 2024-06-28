import { CustomTooltip } from '@/components/CustomTooltip';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Box } from '@mui/material';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  lastVisited: '90 days',
};

export const websiteVIisitorsData = [
  {
    componentProps: {
      label: 'Source Pixel',
      name: 'sourcePixel',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'peopleVisited',
      label: 'People Visited',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'lastVisited',
      label: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Visited in the last{' '}
          <CustomTooltip title="add canned response">
            <InfoRoundedIcon />
          </CustomTooltip>
        </Box>
      ),
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'India', label: 'India' },
      { value: 'uk', label: 'UK' },
      { value: 'us', label: 'US' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
