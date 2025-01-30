import { uiDateFormat } from '@/lib/date-time';
import { getImageByType } from '@/utils/avatarUtils';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { Avatar } from '@mui/material';
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
      <Avatar
        src={getImageByType(value?.fileType, value?.fileUrl)}
        alt="file-preview"
        sx={{ width: 45, height: 45 }}
        variant={'rounded'}
      />
    );
  if (isValidDate(value)) return <>{uiDateFormat(value)}</>;
  return <>{value?.toString()}</>;
};
