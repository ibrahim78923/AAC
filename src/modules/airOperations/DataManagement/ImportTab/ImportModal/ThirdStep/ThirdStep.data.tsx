import { AvailableIcon } from '@/assets/icons';
import { Box, TextField, Typography } from '@mui/material';

export const stepsData: any = {
  id: 6767,
  Tickets: [
    { id: 8699, value: 'name', label: 'Name' },
    { id: 5689, value: 'dealValue', label: 'Deal value' },
    { id: 5788, value: 'accountName', label: 'Account name' },
    { id: 7899, value: 'dealValue', label: 'Deal value' },
  ],
  Inventory: [
    { id: 5674, value: 'displayName', label: 'Display name' },
    { id: 5884, value: 'assetType', label: 'Asset Type' },
    { id: 3674, value: 'impact', label: 'Impact' },
    { id: 4777, value: 'description', label: 'Description' },
    { id: 5674, value: 'assetLifeExpiry', label: 'Expiry date' },
    { id: 5884, value: 'locationId', label: 'Location' },
    { id: 3674, value: 'departmentId', label: 'Department' },
    { id: 4777, value: 'assignedOn', label: 'Assigned on' },
    { id: 5674, value: 'usedBy', label: 'Used By' },
    { id: 5884, value: 'attachment', label: 'Attachment' },
  ],
  Catalog: [
    { id: 5376, value: 'assetType', label: 'Asset Type' },
    { id: 8608, value: 'displayName', label: 'Display Name' },
    { id: 3567, value: 'accountName', label: 'Account name' },
    { id: 4560, value: 'dealValue', label: 'Deal value' },
  ],
};

export const stepsColumn: any = (importLog: any, handleChange: any) => [
  {
    accessorFn: (row: any) => row?.column,
    id: 'column',
    header: 'File Column',
    cell: (info: any) => (
      <Box>
        <Typography variant="body2" color={'blue.dull_blue'} fontWeight={500}>
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.crmFields,
    id: 'crmFields',
    header: 'Crm Fields',
    cell: (info: any) => (
      <TextField
        size="small"
        name="crmFields"
        select
        fullWidth
        SelectProps={{ native: true }}
        onChange={(e) =>
          handleChange(info?.row?.original?.column, e.target.value)
        }
        required
      >
        <>
          {stepsData[importLog]?.map((option: any) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </>
      </TextField>
    ),
  },
  {
    accessorFn: (row: any) => row?.mapped,
    id: 'mapped',
    header: 'Mapped',
    cell: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AvailableIcon />
      </Box>
    ),
  },
];
