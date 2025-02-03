import { AttachFileCard } from '@/components/Avatars/AttachFileCard';
import { uiDateFormat } from '@/lib/date-time';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { isValidElement } from 'react';

export const DynamicFormDataDisplay = (props: any) => {
  const { value } = props;

  if (isValidElement(value)) return <>{value}</>;
  if (
    typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
    value !== null &&
    DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value
  )
    return <>{value?.label}</>;
  if (
    typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
    value !== null &&
    DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value
  )
    return (
      <AttachFileCard
        size={{ width: 45, height: 45 }}
        hasStyling={false}
        canDelete={false}
        data={{ ...value, orignalName: '  ', fileSize: '' }}
      />
    );
  if (isValidDate(value)) return <>{uiDateFormat(value)}</>;
  return <>{value?.toString()}</>;
};
