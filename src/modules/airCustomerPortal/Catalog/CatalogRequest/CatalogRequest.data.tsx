import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';
import * as Yup from 'yup';
export const placeRequestValidationSchema = (searchStringLowerCase: any) =>
  Yup?.object()?.shape({
    requestor: Yup.mixed().nullable().required('Required'),
    ...(searchStringLowerCase ===
      CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase() && {
      noOfItem: Yup.number().nullable().required('Required'),
    }),
    requestForSomeOneElse: Yup.boolean(),
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
) => [
  {
    componentProps: {
      name: 'noOfItem',
      label: 'No of item',
      fullWidth: true,

      required:
        searchStringLowerCase === CATALOG_SERVICE_TYPES?.HARDWARE.toLowerCase()
          ? true
          : false,

      type: 'number',
    },
    shouldDisplay: ({ other: { searchStringLowerCase } }: any) =>
      searchStringLowerCase === CATALOG_SERVICE_TYPES?.HARDWARE.toLowerCase(),
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
      apiQuery: apiQueryRequester,
      EndIcon: AddCircleIcon,
      externalParams: { limit: 50, role: 'ORG_REQUESTER' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
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
      EndIcon: AddCircleIcon,
      externalParams: { limit: 50, role: 'ORG_REQUESTER' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
    shouldDisplay: ({ getValues }: any) => getValues('requestForSomeOneElse'),
    md: 12,
  },
];
