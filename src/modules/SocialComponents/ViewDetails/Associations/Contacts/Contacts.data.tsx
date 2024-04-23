import { Avatar, Box, Typography } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { IMG_URL } from '@/config';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setContactRecord,
  theme,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setContactRecord: any;
  theme: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'contact_id',
      cell: (info: any) => <Box>{info?.row?.original?._id}</Box>,
      header: 'Contact ID',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.taskname,
      id: 'Name',
      isSortable: true,
      header: ' Name',
      cell: (info: any) => {
        const firstName = info?.cell?.row?.original?.firstName
          ? info?.cell?.row?.original?.firstName
          : '';
        const lastName = info?.cell?.row?.original?.lastName
          ? info?.cell?.row?.original?.lastName
          : '';
        const fullName = `${firstName} ${lastName}`;
        const imgAlt = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
        const imgUrl = info?.cell?.row?.original?.profilePicture?.url;
        const email = info?.cell?.row?.original?.email;
        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                textTransform: 'uppercase',
                fontSize: '14px',
                mr: '6px',
              }}
              alt={info?.getValue()}
              src={`${IMG_URL}${imgUrl}`}
            >
              {imgAlt}
            </Avatar>

            <Box>
              <Typography
                variant="body3"
                sx={{ color: theme?.palette?.blue?.dull_blue }}
              >
                {fullName} {lastName}
              </Typography>
              <br />
              <Typography variant="body3">{email}</Typography>
            </Box>
          </Box>
        );
      },
    },

    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phonenumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.jobTitle,
      id: 'jobtitle',
      isSortable: true,
      header: 'Job Title ',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View'), setContactRecord(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('Edit'), setContactRecord(info?.row?.original);
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenAlert(true), setContactRecord(info?.row?.original);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
