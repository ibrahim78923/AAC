import { CallTakeIcon, DownIcon } from '@/assets/icons';
import { UserDefault, UserProfileVectorImage } from '@/assets/images';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_CALL_METRICS_PERMISSION } from '@/constants/permission-keys';

export const columnsCallInQueue = ({ setStartPowerDialerModal }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'customerName',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src={info?.row?.original?.customerDetails?.profileAvatar}
            alt="user-image"
          />
          <Box sx={{ width: '90px' }}>
            <Typography variant="body3">
              {info?.row?.original?.customerDetails?.name}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Customer Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.queue,
      id: 'queue',
      cell: (info: any) => info?.getValue(),
      header: 'Queue',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.waitingTime,
      id: 'waitingTime',
      cell: (info: any) => info?.getValue(),
      header: 'Waiting Time',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'assignedTo',
      cell: (info: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Image
            src={info?.row?.original?.assignedDetails?.profileAvatar}
            width={40}
            height={40}
            alt="user-image"
          />
          <Box sx={{ width: '100px' }}>
            <Typography variant="body3">
              {info?.row?.original?.assignedDetails?.name}
            </Typography>
          </Box>
          <MenuTableOpen setStartPowerDialerModal={setStartPowerDialerModal} />
        </Box>
      ),
      header: 'Assigned To',
      isSortable: true,
    },
  ];
};
const Queue = {
  UK_SUPPORT: 'UK Support',
  CALL_BACK: 'Call Back',
  FIRST_CALL: 'First Call',
  GLOBAL: 'Global',
};
export const allCallsData = [
  {
    id: '01',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Eleanor Pena',
    },
    queue: Queue.UK_SUPPORT,
    waitingTime: ':02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Elven Leonhart',
    },
  },
  {
    id: '02',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Courtney ',
    },
    queue: Queue.UK_SUPPORT,
    waitingTime: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Devon Lane',
    },
  },

  {
    id: '03',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Jerome Bell',
    },
    queue: Queue.UK_SUPPORT,
    waitingTime: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'jenny willson',
    },
  },
  {
    id: '04',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
    },
    queue: Queue.UK_SUPPORT,
    waitingTime: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Floyd Miles',
    },
  },
  {
    id: '05',
    customerDetails: {
      profileAvatar: UserProfileVectorImage,
      name: 'Annette Black',
    },
    queue: Queue.UK_SUPPORT,
    waitingTime: '02:30',
    assignedDetails: {
      profileAvatar: UserDefault,
      name: 'Floyd Miles',
    },
  },
];

const allAgentCallsData = [
  {
    id: '01',
    status: 'Available',
    callTime: 'Last Call',
    callerData: [
      {
        id: '01',
        nameOfCaller: 'Eleanor Pena',
        time: '8 min ago',
      },
      {
        id: '02',
        nameOfCaller: 'Courtney ',
        time: '8 min ago',
      },
    ],
  },
  {
    id: '02',
    status: 'Available',
    callTime: 'Last Call',
    callerData: [
      {
        id: '01',
        nameOfCaller: 'Eleanor Pena',
        time: '8 min ago',
      },
      {
        id: '02',
        nameOfCaller: 'Courtney ',
        time: '8 min ago',
      },
    ],
  },
];

const MenuTableOpen = ({ setStartPowerDialerModal }: any) => {
  const [anchorTable, setAnchorTable] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: any) => {
    setAnchorTable(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorTable(null);
  };
  const actionTableMenuOpen = Boolean(anchorTable);
  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <DownIcon />
      </IconButton>

      <Menu
        sx={{
          '& .MuiMenu-list': {
            pb: 0,
            pt: 0,
          },
        }}
        anchorEl={anchorTable}
        open={actionTableMenuOpen}
        onClose={handleCloseMenu}
        id="basic-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: '300px',
          },
        }}
      >
        <Box
          onClick={handleCloseMenu}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <Typography variant="body1">All Agents</Typography>
          <SearchIcon />
        </Box>
        <Divider />

        {allAgentCallsData?.map((data: any) => (
          <>
            <Box
              key={data?.id}
              onClick={handleCloseMenu}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: '0.5rem',
                }}
              >
                <Typography variant="body1">{data?.status}</Typography>
                <Typography variant="body1">{data?.callTime}</Typography>
              </Box>
              <Box>
                {data?.callerData?.map((caller: any) => (
                  <>
                    <Box
                      key={caller?.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Typography variant="body1">
                        {caller?.nameOfCaller}
                      </Typography>
                      <Typography variant="body1">{caller?.time}</Typography>
                    </Box>
                  </>
                ))}
              </Box>
            </Box>
            <Divider />
          </>
        ))}

        <PermissionsGuard
          permissions={[
            AIR_CALL_CENTER_CALL_METRICS_PERMISSION?.CALLS_IN_QUEUE_TAKE_THE_CALL,
          ]}
        >
          <Button
            variant="contained"
            sx={{ width: '300px', gap: '0.5rem' }}
            onClick={() => {
              setStartPowerDialerModal(true);
            }}
          >
            <CallTakeIcon />
            Take the Call
          </Button>
        </PermissionsGuard>
      </Menu>
    </>
  );
};
