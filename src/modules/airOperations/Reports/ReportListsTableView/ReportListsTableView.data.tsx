import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { Box, Checkbox } from '@mui/material';
import { MANAGE_REPORTS_ACCESS_TYPES_MAPPED } from '@/constants/api-mapped';
import { Dispatch, SetStateAction } from 'react';
import { ReportListsTableRowI } from '../ReportLists/ReportLists.interface';
import { FavoriteReport } from '../FavoriteReport';
import { UserInfo } from '@/components/UserInfo';
import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';
import { CustomArrayTooltipData } from '@/components/CustomArrayTooltipData';

export const reportListsColumnsDynamic = (
  selectedReportList: any,
  setSelectedReportList: Dispatch<SetStateAction<any>>,
  totalReports = [],
) => [
  {
    accessorFn: (row: ReportListsTableRowI) => row?._id,
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
    accessorFn: (row: ReportListsTableRowI) => row?.owner,
    id: 'owner',
    isSortable: true,
    header: 'Report Owner',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <FavoriteReport
          reportId={info?.row?.original?._id}
          isFavorite={info?.row?.original?.isFavorite}
        />
        <UserInfo
          name={fullName(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          nameInitial={fullNameInitial(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          avatarSrc={info?.getValue()?.avatar?.url}
          email={info?.getValue()?.email}
        />
      </Box>
    ),
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Report Name',
    cell: (info: any) => (
      <TruncateText
        text={info?.getValue()}
        boxProps={{ color: 'primary.main' }}
      />
    ),
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.dashboardDetails,
    id: 'dashboardDetails',
    isSortable: true,
    header: 'Dashboard Name',
    cell: (info: any) => (
      <CustomArrayTooltipData
        data={info?.getValue()?.map((item: any, index: number) => ({
          label: item?.name,
          _id: index + 1,
        }))}
      />
    ),
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => (
      <Box sx={{ textTransform: 'capitalize' }}>
        {info?.getValue()?.toLowerCase()} Report
      </Box>
    ),
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created Date',
    cell: (info: any) =>
      !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.accessLevel,
    id: 'accessLevel',
    isSortable: true,
    header: 'Assigned',
    cell: (info: any) =>
      MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[info?.getValue()?.type],
  },
  {
    accessorFn: (row: ReportListsTableRowI) => row?.updatedAt,
    id: 'updatedAt',
    isSortable: true,
    header: 'Last Updated Date',
    cell: (info: any) =>
      !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
  },
];
