import { RHFTextField } from '@/components/ReactHookForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import * as Yup from 'yup';

export const TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add Location',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Update Location',
};

export const BUTTON_TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Update',
};

export const upsertLocationsFormValidationSchema = Yup?.object()?.shape({
  locationName: Yup?.string()
    ?.trim()
    ?.required('Location name is Required')
    ?.max(
      CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_NAME_MAX_CHARACTERS,
      `Location name should be less than ${CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_NAME_MAX_CHARACTERS} characters`,
    ),
  destination: Yup?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_DESTINATION_MAX_CHARACTERS,
      `Destination should be less than ${CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_DESTINATION_MAX_CHARACTERS} characters`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_DESCRIPTION_MAX_CHARACTERS,
      `Description should be less than ${CHARACTERS_LIMIT?.SOCIAL_COMPONENTS_MEETINGS_LOCATION_DESCRIPTION_MAX_CHARACTERS} characters`,
    ),
});

export const upsertLocationsDefaultValues = (data?: any) => {
  return {
    locationName: data?.locationName ?? '',
    destination: data?.destination ?? '',
    description: data?.description ?? '',
  };
};

export const upsertLocationsFormFieldsDynamic = () => [
  {
    _id: 1,
    componentProps: {
      name: 'locationName',
      label: 'Location Name',
      fullWidth: true,
      required: true,
      placeholder: 'Add Location Name',
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'destination',
      label: 'Destination',
      fullWidth: true,
      placeholder: 'Enter Destination',
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Type Description Here',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
  },
];
