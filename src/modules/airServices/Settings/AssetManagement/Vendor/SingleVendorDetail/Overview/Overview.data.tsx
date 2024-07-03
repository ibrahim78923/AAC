import { Box } from '@mui/material';

export const FIELDS_TYPES = {
  OBJECT: 'object',
  LABEL: 'label',
  PATH: 'path',
};

export const overviewDataArray = (data: any) => {
  const predefinedFields = {
    'Contact Name': data?.contactName ?? '-',
    Phone: data?.phone ?? '-',
    Mobile: data?.mobile ?? '-',
    Email: data?.email ?? '-',
    Description: data?.description ? (
      <Box
        component={'span'}
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />
    ) : (
      '-'
    ),
    Address: data?.address ?? '-',
    Country: data?.country ?? '-',
    State: data?.state ?? '-',
    City: data?.city ?? '-',
    'Zip Code': data?.zipCode ?? '-',
  };

  const customFields =
    data?.customFields && typeof data?.customFields === FIELDS_TYPES?.OBJECT
      ? Object?.keys(data?.customFields)?.reduce((acc: any, key: any) => {
          acc[key] = data?.customFields[key] ?? '-';
          return acc;
        }, {})
      : {};

  return { ...predefinedFields, ...customFields };
};
