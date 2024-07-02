import {
  RHFTextField,
  RHFRadioGroup,
  RHFMultiCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFAutocomplete,
} from '@/components/ReactHookForm';

export const generateUniqueId = () => {
  const timestamp = Date?.now()?.toString(36);
  const randomString = Math?.random()?.toString(36)?.substring(2, 7);
  return timestamp + randomString;
};

export const componentMap: any = {
  RHFTEXTFIELD: RHFTextField,
  RHFRADIOGROUP: RHFRadioGroup,
  RHFMULTICHECKBOX: RHFMultiCheckbox,
  RHFDATEPICKER: RHFDatePicker,
  RHFDROPZONE: RHFDropZone,
  RHFAUTOCOMPLETE: RHFAutocomplete,
};

export const FIELDS_CONSTANTS: any = {
  RHFTEXTFIELD: 'RHFTEXTFIELD',
  RHFRADIOGROUP: 'RHFRADIOGROUP',
  RHFMULTICHECKBOX: 'RHFMULTICHECKBOX',
  RHFDATEPICKER: 'RHFDATEPICKER',
  RHFDROPZONE: 'RHFDROPZONE',
  RHFAUTOCOMPLETE: 'RHFAUTOCOMPLETE',
};

export const DYNAMIC_FIELDS = {
  PT_SERVICES: 'SERVICES',
  PT_MARKETING: 'MARKETING',
  PT_SALES: 'SALES',
  MT_VENDOR: 'VENDOR',
};

export const isValidMongoId = (id: string) => /^[0-9a-fA-F]{24}$/?.test(id);
