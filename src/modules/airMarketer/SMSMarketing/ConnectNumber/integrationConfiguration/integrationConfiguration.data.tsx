import { Box, Theme } from '@mui/material';
import { DeleteIcon, EditBlackIcon } from '@/assets/icons';

export const columns = (theme: Theme) => {
  return [
    {
      accessorFn: (row: any) => row?.configurationName,
      id: 'configurationName',
      cell: (info: any) => info.getValue(),
      header: 'Configuration Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.number,
      id: 'number',
      isSortable: false,
      header: 'Number',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: false,
      header: 'Action',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
          >
            <EditBlackIcon />
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];
};

export const integrationConfigurationData = [
  {
    configurationName: 'Twilio',
    number: '+1234567890',
  },
  {
    configurationName: 'AirFP',
    number: '+1234567890',
  },
];
