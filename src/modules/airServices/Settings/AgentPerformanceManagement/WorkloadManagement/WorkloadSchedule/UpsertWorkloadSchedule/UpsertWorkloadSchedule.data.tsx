import {
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import { errorSnackbar } from '@/utils/api';
import { RemoveRedEyeOutlined } from '@mui/icons-material';

import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';

export const upsertWorkloadScheduleDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    businessHoursId: data?.bussinessHoursDetails ?? null,
    agentsId: data?.agentsList ?? [],
  };
};

export const upsertWorkloadScheduleValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  businessHoursId: Yup?.mixed()?.nullable(),
  agentsId: Yup?.mixed()?.nullable(),
});

export const upsertWorkloadScheduleFormFieldsDynamic = (
  apiQueryAgent: any,
  apiQueryBusinessHours: any,
  getValues: any,
  router: any,
) => [
  {
    _id: 1,
    md: 7,
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    md: 7,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: { height: 200 },
    },
    component: RHFEditor,
  },
  {
    _id: 3,
    md: 7,
    componentProps: {
      name: 'businessHoursId',
      label: 'Business Hours',
      fullWidth: true,
      apiQuery: apiQueryBusinessHours,
      placeholder: 'Choose Business Hour',
    },
    component: RHFAutocompleteAsync,
  },
  {
    heading: (
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={0.5}
        onClick={() => {
          const businessHourId = getValues('businessHoursId');
          if (!!!businessHourId?._id) {
            errorSnackbar('Please select business hour');
            return;
          }
          router?.push({
            pathname: AIR_SERVICES?.UPSERT_BUSINESS_HOUR,
            query: {
              id: businessHourId?._id,
            },
          });
        }}
      >
        <RemoveRedEyeOutlined color="primary" />
        <Typography>View Business Hour</Typography>
      </Box>
    ),
    md: 5,
    component: Typography,
    componentProps: {
      variant: 'body3',
      color: 'primary',
      component: 'p',
      display: 'flex',
      alignItems: 'flex-end',
      height: '75%',
    },
  },
  {
    _id: 4,
    md: 7,
    componentProps: {
      name: 'agentsId',
      label: 'Add Users',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: { limit: 50, role: 'ORG_AGENT' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
];
