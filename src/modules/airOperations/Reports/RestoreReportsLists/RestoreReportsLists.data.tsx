import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const actionsForRestoreReportListsDynamic = (
  setIsPortalOpen: any,
  selectedReportList: any,
  permissions: any,
) => [
  {
    id: 1,
    title: 'Restore',
    permissionKey: permissions,
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isRestore: true,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: permissions,
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
];

export const data = [
  {
    _id: '1222',
    isFavorite: false,
    user: {
      name: 'ali',
      avatar: {
        url: 'qwe',
      },
    },
    name: 'Deal',
    dashboard: 'Deal',
    type: 'Systematic Report',
    createdAt: '10/4/2023',
    assigned: 'Everyone',
    updatedAt: '10/5/2023',
  },
];

export const restoreReportColumnsDynamic = (
  selectedReportList?: any,
  setSelectedReportList?: any,
  totalReports: any = [],
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedReportList?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedReportList([
                ...selectedReportList,
                info?.row?.original,
              ])
            : setSelectedReportList(
                selectedReportList?.filter(
                  (item: any) => item?._id !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          totalReports?.length
            ? selectedReportList?.length === totalReports?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedReportList(totalReports?.map((item: any) => item))
            : setSelectedReportList([]);
        }}
        color="primary"
        name="id"
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Reports Name',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.deletedBy,
    id: 'user',
    isSortable: true,
    header: 'Deleted By',
    cell: (info: any) => (
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar
          sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
          src={generateImage(info?.row?.original?.avatar?.url)}
        >
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(info?.getValue())}
          </Typography>
        </Avatar>
        {fullName(info?.getValue())}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.deletedAt,
    id: 'deletedAt',
    isSortable: true,
    header: 'Time Deleted',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI)
        : '--',
  },
];
