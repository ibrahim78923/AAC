import {
  RHFTextField,
  RHFDropZone,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_CUSTOMER_PORTAL, DATE_FORMAT } from '@/constants';
import { AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { ROLE } from '@/constants/strings';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export const reportIssueFormValidationSchema = Yup?.object()?.shape({
  requester: Yup?.mixed()?.nullable()?.required('Requester is required'),
  subject: Yup?.string()?.trim()?.required('subject is required'),
  description: Yup?.string()?.trim()?.required('description is required'),
  associatesAssets: Yup?.mixed()?.nullable(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const reportIssueFormDefaultValues = () => {
  return {
    requester: null,
    subject: '',
    description: '',
    associatesAssets: [],
    attachFile: null,
  };
};

export const reportIssueFormFieldsDynamic = (
  apiQueryAssociateAsset: any,
  apiQueryRequester: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      externalParams: { limit: 50, role: ROLE?.ORG_REQUESTER },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
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
    id: 4,
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
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const newTicketsDropdownDynamic = (
  setOpenReportAnIssueModal: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Report an issue',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setOpenReportAnIssueModal?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Request a service',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
      });
      closeMenu?.();
    },
  },
];
