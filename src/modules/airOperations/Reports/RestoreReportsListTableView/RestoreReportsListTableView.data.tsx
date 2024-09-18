import { uiDateFormat } from '@/utils/dateTime';
import { RestoreReportListsTableRowI } from '../RestoreReportsLists/RestoreReportsLists.interface';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { AIR_OPERATIONS } from '@/constants';
import { GENERIC_REPORT_MODULES } from '@/constants/strings';

const { SERVICES, SALES, MARKETING } = GENERIC_REPORT_MODULES;

const {
  SERVICES_REPORTS_RESTORE,
  MARKETING_REPORTS_RESTORE,
  SALES_REPORTS_RESTORE,
} = AIR_OPERATIONS;

export const REPORTS_BASE_MODULE: any = {
  [SERVICES_REPORTS_RESTORE]: SERVICES,
  [SALES_REPORTS_RESTORE]: SALES,
  [MARKETING_REPORTS_RESTORE]: MARKETING,
};

export const restoreReportListsColumnsDynamic = (
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
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
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
      !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
  },
];
