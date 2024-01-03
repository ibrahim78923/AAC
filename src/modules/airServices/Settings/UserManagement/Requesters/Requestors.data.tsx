import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { RequestorsListI } from './Requestors.interface';
import { AnnouncementAvatarImage } from '@/assets/images';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';

export const requestorsDropdown = (
  setDeleteModal: any,
  setWarningModal: any,
) => [
  {
    title: 'Delete',
    handleClick: (close: any) => {
      setDeleteModal(true);
      close(null);
    },
  },
  {
    title: 'Convert to Agent',
    handleClick: (close: any) => {
      setWarningModal(true);
      close(null);
    },
  },
];

export const requestorListData: RequestorsListI[] = [
  {
    id: 1,
    name: `Enee Well`,
    email: `eneeewell@gmail.com`,
    activationStatus: REQUESTORS_STATUS?.ACTIVE,
    jobTitle: 'Senior HR Executive',
    icon: AnnouncementAvatarImage,
  },
  {
    id: 2,
    name: `Nilson Mandela`,
    email: 'nilsonmadela@gmail.com',
    activationStatus: REQUESTORS_STATUS?.INACTIVE,
    jobTitle: 'Junior Admin',
    icon: AnnouncementAvatarImage,
  },
  {
    id: 3,
    name: `Nilson Mandela`,
    email: 'nilsonmadela@gmail.com',
    activationStatus: REQUESTORS_STATUS?.INACTIVE,
    jobTitle: 'IT Support',
    icon: AnnouncementAvatarImage,
  },
];
export const requestorsList: any = (
  selectedRequestorsList: any,
  setSelectedRequestorsList: any,
  theme: any,
  router: any,
) => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedRequestorsList?.find(
            (item: any) => item?.id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestorsList([
                ...selectedRequestorsList,
                requestorListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedRequestorsList(
                selectedRequestorsList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedRequestorsList?.length === requestorListData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedRequestorsList([...requestorListData])
            : setSelectedRequestorsList([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Name',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src}
          alt={info?.row?.original?.icon?.name}
        />{' '}
        <Typography
          sx={{
            color: 'blue.main',
            cursor: 'pointer',
          }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.SINGLE_REQUESTERS_DETAILS,
              query: { id: info?.row?.original?.id },
            })
          }
        >
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => {
      return (
        <Typography
          style={{
            textTransform: 'lowercase',
            cursor: 'pointer',
            textDecoration:
              info?.row?.original?.activationStatus ===
              REQUESTORS_STATUS?.INACTIVE
                ? 'underline'
                : 'none',
          }}
          onClick={() =>
            info?.row?.original?.activationStatus ===
              REQUESTORS_STATUS?.INACTIVE &&
            router?.push(`mailto:${info?.getValue()}`)
          }
        >
          {info?.getValue()}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.activationStatus,
    id: 'activationStatus',
    isSortable: true,
    header: 'Activation Status',
    cell: (info: any) => {
      const activationStatus = info?.getValue();
      const color =
        activationStatus === REQUESTORS_STATUS?.ACTIVE
          ? theme?.palette?.success?.main
          : activationStatus === REQUESTORS_STATUS?.INACTIVE
            ? theme?.palette?.warning?.main
            : '';

      return (
        <Typography
          sx={{
            color: color,
            width: 'fit-content',
          }}
        >
          {activationStatus}
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.jobTitle,
    id: 'jobTitle',
    isSortable: true,
    header: 'Job Title',
    cell: (info: any) => info?.getValue(),
  },
];
