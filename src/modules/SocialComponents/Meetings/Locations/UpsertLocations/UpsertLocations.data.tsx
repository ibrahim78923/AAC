import { RHFTextField } from '@/components/ReactHookForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import * as Yup from 'yup';

export const TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add Location',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Edit Location',
};

export const BUTTON_TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Submit',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Update',
};

export const upsertLocationsFormValidationSchema = Yup?.object()?.shape({
  locationName: Yup?.string()?.trim()?.required('Location name is Required'),
  destination: Yup?.string()?.trim(),
  description: Yup?.string()?.trim(),
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
    id: 1,
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
    id: 2,
    componentProps: {
      name: 'destination',
      label: 'Destination',
      fullWidth: true,
      placeholder: 'Enter Destination',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Type Description Here',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
];
