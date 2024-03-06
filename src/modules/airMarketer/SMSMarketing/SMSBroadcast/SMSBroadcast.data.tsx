import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Stack,
  Typography,
} from '@mui/material';

import Link from 'next/link';

import { styles } from '../SMSDashboard/ScheduledSMS/ScheduledSMS.style';

import LinearProgress from '@mui/material/LinearProgress';

import { AIR_MARKETER } from '@/routesConstants/paths';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

// export const broadcastData: any = [
//   {
//     Id: 1,
//     name: 'Test broad',
//     CreatedOn: '10/04/2023',
//     Successful: '100%',
//     Replied: '55%',
//     Status: 'Completed',
//   },
//   {
//     Id: 2,
//     name: 'Demo broadcast',
//     CreatedOn: '10/04/2023',
//     Successful: '100%',
//     Replied: '55%',
//     Status: 'Scheduled',
//   },
//   {
//     Id: 3,
//     name: 'Test Campaign sankalp',
//     CreatedOn: '10/04/2023',
//     Successful: '100%',
//     Replied: '55%',
//     Status: 'Draft',
//   },
//   {
//     Id: 4,
//     name: 'Test Campaign sankalp',
//     CreatedOn: '10/04/2023',
//     Successful: '100%',
//     Replied: '55%',
//     Status: 'Processing',
//   },
// ];

export const broadcastColumns: any = (columnsProps: any) => {
  const { statusTag, theme, data, checkedRows, setCheckedRows } = columnsProps;

  const handleSelectCompaniesById = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows?.filter((_id: any) => _id !== id));
    }
  };

  const handleSelectAllCompanies = (checked: boolean): void => {
    setCheckedRows(checked ? data?.map(({ _id }: any) => _id) : []);
  };
  // const handleCheckboxChange = (val: any, rowId: string) => {
  //   val?.target?.checked ? setSelectedId(rowId) : setSelectedId();
  // };

  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: ({ row: { original } }: any) => (
        <Checkbox
          checked={checkedRows?.includes(original?._id)}
          onChange={({ target }) => {
            handleSelectCompaniesById(target.checked, original?._id);
          }}
        />
      ),
      header: (
        <Checkbox
          onChange={({ target }) => {
            handleSelectAllCompanies(target.checked);
          }}
          checked={data?.length && checkedRows?.length === data?.length}
        />
      ),
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row?._id,
    //   id: 'Id',
    //   cell: (info: any) => (
    //     <Checkbox
    //       color="primary"
    //       name={info?.getValue()}
    //       defaultChecked={selectedId === info?.getValue()}
    //       onChange={(e: any) => handleCheckboxChange(e, info?.getValue())}
    //     />
    //   ),
    //   header: <Checkbox color="primary" name="Id" />,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => (
        <Link
          href={`/${AIR_MARKETER?.SMS_MARKETING_DETAILS}`}
          style={{
            color: theme?.palette?.custom?.bright,
            fontWeight: 500,
            fontSize: '12px',
          }}
        >
          {info?.getValue()}
        </Link>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdOn',
      isSortable: false,
      header: 'Created On',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.Successful,
      id: 'successful',
      isSortable: false,
      header: 'Successful',
      cell: (
        <Stack gap={1}>
          <Typography variant="body3" textAlign={'center'}>
            100%
          </Typography>
          <LinearProgress variant="determinate" value={100} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.Replied,
      id: 'replied',
      isSortable: false,
      header: 'Replied',
      cell: (
        <Stack gap={1}>
          <Typography variant="body3" textAlign={'center'}>
            60%
          </Typography>
          <LinearProgress variant="determinate" value={50} />
        </Stack>
      ),
    },
    {
      accessorFn: (row: any) => row?.Recipients,
      id: 'Recipients',
      isSortable: false,
      header: 'Recipients',
      cell: (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                background: theme?.palette?.primary?.main,
                height: '30px',
                width: '30px',
                fontSize: '12px',
              },
            }}
          >
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
          </AvatarGroup>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.Failed,
      id: 'failed',
      isSortable: false,
      header: 'Failed',
      cell: (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                background: theme?.palette?.primary?.main,
                height: '30px',
                width: '30px',
                fontSize: '12px',
              },
            }}
          >
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatarr"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
            <Avatar
              alt="recipient_avatar"
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            />
          </AvatarGroup>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: false,
      header: 'Status',

      cell: (info: any) => (
        <Box
          sx={styles?.cardHeader}
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <Box
            sx={{
              width: '10px',
              height: '10px',
              backgroundColor: `${statusTag(info?.getValue())}`,
              borderRadius: '50%',
            }}
          />
          <Typography fontSize="12px"> {info?.getValue()}</Typography>
        </Box>
      ),
    },
  ];
};
