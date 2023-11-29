import { SwitchBtn } from '@/components/SwitchButton';
import { LinkedIn, Pause } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { style } from '../Manage/Manage.style';

//table data
export const eventsTableColumns: any = (statusBtnValue: any) => {
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
          </Box>
          <SwitchBtn />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.eventTrigger,
      id: 'eventTrigger',
      header: 'Event Trigger',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row?.eventAccount,
      id: 'eventAccount',
      header: 'Event Account',
      isSortable: true,
      cell: (info: any) => info.getValue(),
    },
  ];
};

export const eventsTableData = [
  {
    name: 'active',
    eventTrigger: "Mat's Ad Account",
    eventAccount: 'Engagement Ad',
  },
  {
    name: 'active',
    eventTrigger: "Mat's Ad Account",
    eventAccount: 'Engagement Ad',
  },
  {
    name: 'pending',
    eventTrigger: "Mat's Ad Account",
    eventAccount: 'Engagement Ad',
  },
  {
    name: 'active',
    eventTrigger: "Mat's Ad Account",
    eventAccount: 'Engagement Ad',
  },
  {
    name: 'pending',
    eventTrigger: "Mat's Ad Account",
    eventAccount: 'Engagement Ad',
  },
];
