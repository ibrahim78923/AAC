import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CheckedFavoriteIcon,
  UnCheckedFavoriteIcon,
} from '@/assets/icons';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import {
  DYNAMIC_REPORTS_TYPES_MAPPED,
  MANAGE_REPORTS_ACCESS_TYPES_MAPPED,
} from '@/constants/api-mapped';
import { CustomChips } from '@/components/CustomChips';

export const actionsForReportListsDynamic = (
  setIsPortalOpen: any,
  selectedReportList: any,
  editReportPath: any,
  permission: any,
) => [
  {
    id: 1,
    title: 'Customize',
    permissionKey: [permission?.CUSTOMIZE],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      editReportPath?.(selectedReportList[ARRAY_INDEX?.ZERO]?._id);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Rename',
    permissionKey: [permission?.RENAME],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isRename: true,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Clone',
    permissionKey: [permission?.CLONE],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isClone: true,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 4,
    title: 'Export',
    permissionKey: [permission?.EXPORT_RECORD],
    handleClick: (closeMenu: any) => {
      setIsPortalOpen?.({
        isExport: true,
        isOpen: true,
      });
      closeMenu();
    },
  },
  {
    id: 5,
    title: 'Email This Report',
    permissionKey: [permission?.EMAIL_THIS_REPORT],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isEmail: true });
      closeMenu();
    },
  },
  {
    id: 6,
    title: 'Change Owner',
    permissionKey: [permission?.CHANGE_OWNER],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isOpen: true,
        isChangeOwner: true,
      });
      closeMenu();
    },
  },
  {
    id: 7,
    title: 'Add to Dashboard',
    permissionKey: [permission?.ADD_TO_DASHBOARD],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isOpen: true,
        isAddedToDashboard: true,
      });
      closeMenu();
    },
  },
  {
    id: 8,
    title: 'Delete',
    permissionKey: [permission?.DELETE],
    handleClick: (closeMenu: any) => {
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
  {
    id: 9,
    title: 'Manage Access',
    permissionKey: [permission?.MANAGE_ACCESS],
    handleClick: (closeMenu: any) => {
      if (selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({ isOpen: true, isAccessManage: true });
      closeMenu();
    },
  },
];

export const reportListsColumnsDynamic = (
  selectedReportList?: any,
  setSelectedReportList?: any,
  totalReports = [],
  addReportToFavorite?: any,
  addReportToFavoriteListStatus?: any,
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
    accessorFn: (row: any) => row?.owner,
    id: 'owner',
    isSortable: true,
    header: 'Report Owner',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        {addReportToFavoriteListStatus?.isLoading &&
        addReportToFavoriteListStatus?.originalArgs?.queryParams?.id ===
          info?.row?.original?._id ? (
          <CircularProgress size={20} />
        ) : (
          <Checkbox
            icon={<UnCheckedFavoriteIcon />}
            checkedIcon={<CheckedFavoriteIcon />}
            checked={info?.row?.original?.isFavorite}
            onChange={(e: any) =>
              addReportToFavorite(e, info?.row?.original?._id)
            }
            disabled={addReportToFavoriteListStatus?.isLoading}
            color="primary"
            name={info?.row?.original?._id}
          />
        )}
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Avatar
            sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
            src={generateImage(info?.getValue()?.avatar?.url)}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(
                info?.getValue()?.firstName,
                info?.getValue()?.lastName,
              )}
            </Typography>
          </Avatar>
          {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Report Name',
    cell: (info: any) => (
      <Typography component="span" variant="body2" color="custom.bright">
        {truncateText(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.dashboardDetails,
    id: 'dashboardDetails',
    isSortable: true,
    header: 'Dashboard Name',
    cell: (info: any) =>
      !!info?.getValue()?.length ? (
        <CustomChips
          data={info
            ?.getValue()
            ?.map((item: any) => ({ label: item?.name, _id: item?._id }))}
        />
      ) : (
        <Chip
          size="small"
          label="---"
          variant="filled"
          color={'primary'}
          sx={{ mx: 0.5, my: 0.5 }}
        />
      ),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) =>
      DYNAMIC_REPORTS_TYPES_MAPPED?.[info?.getValue()] ?? '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: any) => row?.accessLevel,
    id: 'accessLevel',
    isSortable: true,
    header: 'Assigned',
    cell: (info: any) =>
      MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[info?.getValue()?.type],
  },
  {
    accessorFn: (row: any) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Updated Date',
    cell: (info: any) =>
      !!info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '--',
  },
];
