import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { CATALOG_SERVICE_TYPES, ROLES } from '@/constants/strings';
import * as Yup from 'yup';

export const placeRequestValidationSchema = (searchStringLowerCase: string) =>
  Yup?.object()?.shape({
    ...(searchStringLowerCase ===
      CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase() && {
      noOfItem: Yup?.number()
        ?.positive('Greater than zero')
        ?.typeError('Not a number'),
    }),
    requestForSomeOneElse: Yup?.boolean(),
    requestor: Yup?.mixed()?.nullable()?.required('Requester is required'),
  });

export const placeRequestDefaultValues = {
  requestor: null,
  noOfItem: 0,
  requestForSomeOneElse: false,
};

export const placeRequest = (
  apiQueryRequester?: any,
  searchStringLowerCase?: string,
  requestForSomeOne?: boolean,
) => [
  ...(searchStringLowerCase === CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase()
    ? [
        {
          id: 3,
          componentProps: {
            name: 'noOfItem',
            label: 'No of item',
            fullWidth: true,
            required:
              searchStringLowerCase ===
              CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase(),
            type: 'number',
            inputProps: {
              min: 0,
            },
          },
          component: RHFTextField,
          md: 5,
        },
      ]
    : []),
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
