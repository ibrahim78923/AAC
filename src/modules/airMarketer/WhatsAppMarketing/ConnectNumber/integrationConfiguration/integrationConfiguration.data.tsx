import { Box, Theme } from '@mui/material';
import { DeleteIcon } from '@/assets/icons';

export const columns = (
  theme: Theme,
  setIsDeleteModalOpen: any,
  setActiveId: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Number',
      cell: (info: any) => formatPhoneNumber(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: false,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              cursor: 'pointer',
              background: theme?.palette?.grey?.[400],
              padding: '5px',
              borderRadius: '50%',
            }}
            onClick={() => {
              setActiveId(info?.row?.original?._id);
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];
};

function formatPhoneNumber(phoneNumber: string): string {
  const phoneRegex = /^(\+1)(\d{3})(\d{3})(\d{4})$/;
  return phoneNumber?.replace(phoneRegex, '$1 ($2) $3-$4');
}

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
