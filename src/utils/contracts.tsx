import {
  IconFieldCheckbox,
  IconFieldDate,
  IconFieldNumber,
  IconFieldText,
} from '@/assets/icons';
export const FIELD_TYPES = {
  TEXT: 'text',
  DATE: 'date',
  NUMBER: 'number',
  CHECKBOX: 'checkbox',
};

export const getFieldIcon = (type: string) => {
  switch (type) {
    case FIELD_TYPES.TEXT:
      return <IconFieldText />;
    case FIELD_TYPES.DATE:
      return <IconFieldDate />;
    case FIELD_TYPES.NUMBER:
      return <IconFieldNumber />;
    case FIELD_TYPES.CHECKBOX:
      return <IconFieldCheckbox />;
    default:
      return <IconFieldText />;
  }
};
