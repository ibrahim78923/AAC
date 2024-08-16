import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import {
  RestoreReportListsIsPortalOpenI,
  RestoreReportListsTableRowI,
} from './RestoreReportsLists.interface';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const actionsForRestoreReportListsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<RestoreReportListsIsPortalOpenI>>,
  permissions: any,
) => [
  {
    id: 1,
    title: 'Restore',
    permissionKey: permissions,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
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
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
];

export const restoreReportColumnsDynamic = (
  selectedReportList: any,
  setSelectedReportList: Dispatch<SetStateAction<any>>,
  totalReports: any = [],
) => [
  {
    accessorFn: (row: RestoreReportListsTableRowI) => row?._id,
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
    accessorFn: (row: RestoreReportListsTableRowI) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Reports Name',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: RestoreReportListsTableRowI) => row?.deletedBy,
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
          src={generateImage(info?.row?.original?.avatar)}
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
    accessorFn: (row: RestoreReportListsTableRowI) => row?.deletedAt,
    id: 'deletedAt',
    isSortable: true,
    header: 'Time Deleted',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI)
        : '--',
  },
];
