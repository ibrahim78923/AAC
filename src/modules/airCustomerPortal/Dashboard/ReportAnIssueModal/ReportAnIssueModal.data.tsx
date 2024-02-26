import {
  RHFTextField,
  RHFDropZone,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as Yup from 'yup';

export const validationSchemaReportAnIssueModal = Yup?.object()?.shape({
  requester: Yup?.string()?.trim()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string()?.trim()?.required('Required'),
  associatesAssets: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  requester: '',
  subject: '',
  description: '',
  associatesAssets: [],
};

export const reportAnIssueModalFormFields = (apiQueryAssociateAsset: any) => [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      placeholder: 'Enter Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 3,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 16,
    componentProps: {
      name: 'associatesAssets',
      label: 'Associate Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryAssociateAsset,
      externalParams: { limit: 50 },
      getOptionLabel: (option: any) => option?.displayName,
      renderOption: (option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography variant={'body2'} color={'grey.600'} fontWeight={500}>
              {option?.displayName}
            </Typography>
            <Typography variant={'body4'} color={'grey.900'}>
              {option?.assetType}
            </Typography>
          </Box>
          <Typography variant={'body4'} color={'grey.900'}>
            EOL:
            {dayjs(option?.assetLifeExpiry)?.format(DATE_FORMAT?.UI) ??
              dayjs(new Date())?.format(DATE_FORMAT?.UI)}
          </Typography>
        </Box>
      ),
      placeholder: 'Choose Assets',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: 'Attach File',
      fullWidth: true,
      fileType: 'Upload any file',
    },
    component: RHFDropZone,
    md: 12,
  },
];
