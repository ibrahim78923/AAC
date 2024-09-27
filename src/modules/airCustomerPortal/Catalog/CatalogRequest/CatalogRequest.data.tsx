import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import * as Yup from 'yup';

export const placeRequestValidationSchema = (
  categoryType: string,
  checkPermission: string,
) =>
  Yup?.object()?.shape({
    ...(categoryType && {
      noOfItem: Yup?.number()
        ?.positive('Greater than zero')
        ?.typeError('Not a number'),
    }),
    requestForSomeOneElse: Yup?.boolean(),
    requesterName: !!checkPermission
      ? Yup?.string()
      : Yup?.string()?.trim()?.required('Required'),
    requesterEmail: !!checkPermission
      ? Yup?.string()
      : Yup?.string()?.email()?.required('Required'),
    requestor: Yup?.mixed()
      ?.nullable()
      ?.when('requesterEmail', {
        is: (requesterEmail: any) => !requesterEmail,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
  });

export const placeRequestDefaultValues = {
  requestor: null,
  requesterEmail: '',
  requesterName: '',
  noOfItem: 1,
  requestForSomeOneElse: false,
};

export const placeRequest = (
  apiQueryRequester?: any,
  categoryType?: string,
  requestForSomeOne?: boolean,
  checkPermission?: string,
) => {
  const formFields = [
    ...(!!categoryType
      ? [
          {
            id: 3,
            componentProps: {
              name: 'noOfItem',
              label: 'No of item',
              required: true,
              type: 'number',
            },
            component: RHFTextField,
            md: 2,
          },
        ]
      : []),
    ...(checkPermission
      ? []
      : [
          {
            id: 4,
            componentProps: {
              name: 'requesterName',
              label: 'Requester Name',
              placeholder: 'Requester Name',
              fullWidth: true,
              required: true,
            },
            component: RHFTextField,
            md: 12,
          },
          {
            id: 5,
            componentProps: {
              name: 'requesterEmail',
              label: 'Requester Email',
              placeholder: 'Requester Email',
              fullWidth: true,
              required: true,
            },
            component: RHFTextField,
            md: 12,
          },
        ]),
    ...(checkPermission
      ? [
          {
            id: 1,
            componentProps: {
              name: 'requestor',
              label: requestForSomeOne ? 'Request For' : 'Requester',
              fullWidth: true,
              required: true,
              apiQuery: apiQueryRequester,
              externalParams: {
                limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
                role: ROLES?.ORG_REQUESTER,
              },
              getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
                `${option?.firstName} ${option?.lastName}`,
              placeholder: 'Add Requester',
            },
            component: RHFAutocompleteAsync,
            md: 12,
          },
        ]
      : []),
    {
      id: 2,
      componentProps: {
        name: 'requestForSomeOneElse',
        label: 'Request For Someone else',
      },
      component: RHFCheckbox,
      md: 12,
    },
  ];

  return formFields;
};
