import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CATALOG_SERVICE_TYPES, ROLES } from '@/constants/strings';
import * as Yup from 'yup';
export const placeRequestValidationSchema = (searchStringLowerCase: any) =>
  Yup?.object()?.shape({
    ...(searchStringLowerCase ===
      CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase() && {
      noOfItem: Yup.number().nullable()?.required('Required'),
    }),
    requestForSomeOneElse: Yup.boolean(),
    requestor: Yup.mixed().when('requestForSomeOneElse', {
      is: (value: any) => value,
      then: (schema: any) => schema?.notRequired('Required'),
      otherwise: (schema) => schema?.required(),
    }),
    requestorFor: Yup.mixed().when('requestForSomeOneElse', {
      is: (value: any) => value,
      then: (schema: any) => schema?.required('Required'),
      otherwise: (schema) => schema?.notRequired(),
    }),
  });
export const placeRequestDefaultValues = {
  requestor: '' || null,
  requestorFor: '' || null,
  noOfItem: 0,
  requestForSomeOneElse: false,
};

export const placeRequest = (
  apiQueryRequester?: any,
  router?: any,
  searchStringLowerCase?: string,
  requestForSomeOne?: boolean,
) => [
  {
    componentProps: {
      name: 'noOfItem',
      label: 'No of item',
      fullWidth: true,

      required:
        searchStringLowerCase === CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase()
          ? true
          : false,

      type: 'number',
    },
    shouldDisplay: ({ other: { searchStringLowerCase } }: any) =>
      searchStringLowerCase === CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase(),
    component: RHFTextField,
    md: 3,
  },
  {
    id: 1,
    componentProps: {
      name: 'requestor',
      label: 'Requester',
      fullWidth: true,
      required: true,
      disabled: requestForSomeOne,
      apiQuery: apiQueryRequester,
      externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
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
      name: 'requestForSomeOneElse',
      label: 'Request For Someone else',
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'requestorFor',
      label: 'Requester For',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    shouldDisplay: ({ getValues }: any) => getValues('requestForSomeOneElse'),
    md: 12,
  },
];
