import {
  RHFTextField,
  RHFDropZone,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { SingleDropdownButtonCloseMenuI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ROLE } from '@/constants/strings';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

export const reportIssueFormValidationSchema = (checkPermission: any) =>
  Yup?.object()?.shape({
    requesterEmail: !!checkPermission
      ? Yup?.string()?.max(
          GLOBAL_CHARACTERS_LIMIT?.EMAIL,
          `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
        )
      : Yup?.string()
          ?.max(
            GLOBAL_CHARACTERS_LIMIT?.EMAIL,
            `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
          )
          ?.email()
          ?.required('Required'),
    requesterName: !!checkPermission
      ? Yup?.string()?.max(
          GLOBAL_CHARACTERS_LIMIT?.NAME,
          `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL_SUBJECT}`,
        )
      : Yup?.string()
          ?.max(
            GLOBAL_CHARACTERS_LIMIT?.NAME,
            `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL_SUBJECT}`,
          )
          ?.trim()
          ?.required('Required'),
    requester: Yup?.mixed()
      ?.nullable()
      ?.when('requesterEmail', {
        is: (requesterEmail: any) => !requesterEmail,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    subject: Yup?.string()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.SUBJECT,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.SUBJECT}`,
      )
      ?.trim()
      ?.required('Required'),
    description: Yup?.string()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
      )
      ?.trim()
      ?.required('Required'),
    associatesAssets: Yup?.mixed()?.nullable(),
    attachFile: Yup?.mixed()?.nullable(),
  });

export const reportIssueFormDefaultValues = () => {
  return {
    requesterEmail: '',
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
  companyId: string,
) => [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      externalParams: { limit: 500, role: ROLE?.ORG_REQUESTER },
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
      externalParams: { companyId },
      getOptionLabel: (option: any) => option?.displayName,
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

    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setOpenReportAnIssueModal?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Request a service',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
        ...(!!router?.query?.companyId && {
          query: {
            companyId: router?.query?.companyId,
          },
        }),
      });
      closeMenu?.();
    },
  },
];
