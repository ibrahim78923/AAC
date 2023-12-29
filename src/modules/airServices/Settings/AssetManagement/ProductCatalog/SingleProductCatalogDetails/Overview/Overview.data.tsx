import { Box } from '@mui/material';

export const OverviewData = (data: any) => [
  { 'Asset Type': data?.assetTypeName ?? '-' },
  { Status: data?.status?.replaceAll?.('_', ' ') ?? '-' },
  { Manufacture: data?.manufacturer },
  { 'Mode of Procurement': data?.modeOfProcurement ?? '-' },
  {
    Description: data?.description ? (
      <Box dangerouslySetInnerHTML={{ __html: data?.description }} />
    ) : (
      '-'
    ),
  },
];
