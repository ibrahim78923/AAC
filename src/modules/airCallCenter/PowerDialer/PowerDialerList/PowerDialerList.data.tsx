import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box, Typography } from '@mui/material';
import Eye from '@/assets/icons/shared/eye';
import AssignToPopover from './AssignToPopover';
import { ArrowDownIcon } from '@/assets/icons';
import Link from 'next/link';
import { AIR_CALL_CENTER } from '@/routesConstants/paths';
import { DeletePowerDialer } from './DeletePowerDialer';

export const powerDialerListTableData = [
  {
    id: 1,
    powerDialer: `Sales`,
    assignTo: 'Olivia Rhye',
    cardRecipientName: 'Saqib Shah',
    customer: '10 Customers',
    status: `IN progress`,
  },
];
export const userList = (buttonName: any, setButtonName: any) => [
  {
    accessorFn: (row: any) => row?.powerDialer,
    id: 'powerDialer',
    isSortable: true,
    header: 'Power Dialer List',
    cell: (info: any) => (
      <Link href={`${AIR_CALL_CENTER?.POWER_DAILER}/${info?.getValue()}`}>
        {info?.getValue()}
      </Link>
    ),
  },
  {
    accessorFn: (row: any) => row?.assignTo,
    id: 'assignTo',
    header: 'Assign To',
    isSortable: true,
    cell: (info: any) => (
      <AssignToPopover title={info?.row?.original?.assignTo} />
    ),
  },
  {
    accessorFn: (row: any) => row?.customer,
    id: 'customer',
    isSortable: true,
    header: 'Customer',
    cell: (info: any) => (
      <>
        {info?.getValue()}
        <Typography variant="body3" color="primary.main">
          3/10 view all
        </Typography>
      </>
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: () => (
      <SingleDropdownButton
        disabled={buttonName === statuses[1]}
        endIcon={
          buttonName === statuses[1] ? (
            <></>
          ) : (
            <ArrowDownIcon color="#fff" size={18} />
          )
        }
        dropdownOptions={statusDropDown(setButtonName)}
        btnVariant
        sx={{
          p: 0.5,
          borderRadius: 50,
          height: 22,
          minWidth: 100,
          bgcolor: statusColors[buttonName],
          color: 'common.white',
          fontSize: 12,
          fontWeight: 400,
          '&:hover': {
            bgcolor: statusColors[buttonName],
            color: 'common.white',
          },
          '&.Mui-disabled': {
            color: 'common.white',
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        dropdownName={buttonName}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.action,
    id: 'action',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box>
        <Link
          href={`${AIR_CALL_CENTER?.POWER_DAILER}/${info?.row?.original?.powerDialer}`}
        >
          <Eye color="#1F305D" />
        </Link>
        <DeletePowerDialer />
      </Box>
    ),
  },
];

export const statuses: any = ['IN progress', 'Completed', 'Pending'];
export const statusDropDown = (setButtonName: any) =>
  statuses?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      setButtonName(item);
      close();
    },
  }));
export const statusColors: any = {
  'IN progress': 'warning.main',
  Completed: 'success.main',
  Pending: 'error.main',
};
