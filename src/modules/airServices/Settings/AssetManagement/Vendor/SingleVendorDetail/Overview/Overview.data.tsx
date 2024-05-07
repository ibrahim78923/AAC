import { Box } from '@mui/material';

export const overviewDataArray = (data: any) => {
  return {
    'Contact Name': data?.contactName ?? '-',
    Phone: data?.phone ?? '-',
    Mobile: data?.mobile ?? '-',
    Email: data?.email ?? '-',

    Description: data?.description ? (
      <Box dangerouslySetInnerHTML={{ __html: data?.description }} />
    ) : (
      '-'
    ),
    Address: data?.address ?? '-',
    Country: data?.country ?? '-',
    State: data?.state ?? '-',
    City: data?.city ?? '-',
    'Zip Code': data?.zipCode ?? '-',
  };
};
