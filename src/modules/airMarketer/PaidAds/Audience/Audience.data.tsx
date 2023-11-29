import { LinkedIn, Pause } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { style } from '../Manage/Manage.style';
import InfoIcon from '@mui/icons-material/Info';

//table data
export const audienceTableColumns: any = (statusBtnValue: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      header: 'Name',
      isSortable: true,
      cell: (info: any) => (
        <Stack direction="row" gap={2} alignItems="center">
          <LinkedIn sx={{ height: '32px', width: '32px', fill: '#0a66c2' }} />
          <Box>
            <Typography>Azeem Aslam</Typography>
            <Box display="flex" gap={0.5} alignItems="center">
              <Box
                sx={style?.statusBtn}
                bgcolor={statusBtnValue(info?.getValue())}
                display="flex"
                gap={0.5}
                alignItems="center"
              >
                {info.getValue() === 'active' ? (
                  <Box className="dot" />
                ) : (
                  <Pause className="pauseIcon" />
                )}
                <Typography fontSize="10px">{info?.getValue()}</Typography>
              </Box>
              {info.getValue() === 'active' && (
                <Typography variant="body2">
                  -Last synced May 20,2023 | 11:54Pm
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.accountName,
      id: 'accountName',
      header: 'Account Name',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      header: 'Type',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.source,
      id: 'source',
      header: 'Source',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.size,
      id: 'size',
      header: 'Size',
      isSortable: true,
      cell: (info: any) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {info?.getValue()}
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="body2">Too Small</Typography>
            <InfoIcon sx={{ height: '20px', width: '20px' }} />
          </Box>
        </Box>
      ),
    },
  ];
};

export const audienceTableData = [
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Contact List',
    source: "Mat's Ad Account",
    size: 'Below 300',
  },
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Website traffic',
    source: "Mat's Ad Account",
    size: 'Below 300',
  },
  {
    name: 'pending',
    accountName: "Mat's Ad Account",
    type: 'Contact List',
    source: "Mat's Ad Account",
    size: 'Below 300',
  },
  {
    name: 'active',
    accountName: "Mat's Ad Account",
    type: 'Contact List',
    source: "Mat's Ad Account",
    size: 'Below 300',
  },
  {
    name: 'pending',
    accountName: "Mat's Ad Account",
    type: 'Website traffic',
    source: "Mat's Ad Account",
    size: 'Below 300',
  },
];
