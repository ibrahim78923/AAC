import { AvailableIcon } from '@/assets/icons';
import { Box, Typography } from '@mui/material';
import CrmField from './CrmField';

export const stepsColumn: any = [
  {
    accessorFn: (row: any) => row?.fileColumn,
    id: 'fileColumn',
    header: 'file Column',
    cell: (info: any) => (
      <Box>
        <Typography variant="body2" color={'blue.dull_blue'} fontWeight={500}>
          {info?.getValue()?.title}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.crmFields,
    id: 'crmFields',
    header: 'crm Fields',
    cell: (info: any) => <CrmField options={info?.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.mapped,
    id: 'mapped',
    header: 'mapped',
    cell: () => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <AvailableIcon />
      </Box>
    ),
  },
];

export const stepData: any = [
  {
    id: 1,
    fileColumn: { title: 'Deal name', desc: 'sample deal 1' },
    crmFields: {
      mandatoryFields: [
        { value: 'name', label: 'Name' },
        { value: 'dealValue', label: 'Deal value' },
      ],
      optionalFields: [
        { value: 'accountName', label: 'Account name' },
        { value: 'dealValue', label: 'Deal value' },
      ],
    },
    mapped: 'Service',
  },
];
