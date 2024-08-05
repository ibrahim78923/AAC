import { Checkbox, Theme, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { styles } from './Tasks.styles';
import { DATE_FORMAT, DATE_MONTH_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { errorSnackbar } from '@/utils/api';
import {
  GENERIC_UPSERT_FORM_CONSTANT,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { TicketsTasksIsPortalOpenI } from './Tasks.interface';
import { Dispatch, SetStateAction } from 'react';

export const ticketsTasksListsColumnsDynamic: any = (
  selectedTasksList: any,
  setSelectedTasksLists: Dispatch<SetStateAction<any>>,
  totalTasks = [],
  setIsPortalOpen: Dispatch<SetStateAction<TicketsTasksIsPortalOpenI>>,
  theme: Theme,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedTasksList?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTasksLists([
                  ...selectedTasksList,
                  info?.row?.original,
                ])
              : setSelectedTasksLists(
                  selectedTasksList?.filter(
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
            totalTasks?.length
              ? selectedTasksList?.length === totalTasks?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTasksLists(totalTasks?.map((item: any) => item))
              : setSelectedTasksLists([]);
          }}
          color="primary"
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: 'TaskId',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: 'custom.bright', cursor: 'pointer' }}
          onClick={() => {
            setIsPortalOpen({
              isOpen: true,
              isView: true,
              data: info?.row?.original,
            });
          }}
        >
          #TSK-{info?.getValue()?.slice?.(-3)?.toUpperCase()}
        </Typography>
      ),
      header: 'Task ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row,
      id: 'startDate endDate ',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        `${dayjs(info?.getValue()?.startDate)?.format(
          DATE_MONTH_FORMAT?.API,
        )} - ${dayjs(info?.getValue()?.endDate)?.format(DATE_FORMAT?.UI)}`,
    },
    {
      accessorFn: (row: any) => row?.assignedUser,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const statusValue = info?.getValue();
        return (
          <Typography
            variant="body2"
            sx={styles?.tableStatusStyle(statusValue, theme)}
          >
            {info?.getValue()}
          </Typography>
        );
      },
    },
  ];
};

export const actionsForTicketTasksListsDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<TicketsTasksIsPortalOpenI>>,
  selectedTasksList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_TASK],
    handleClick: (closeMenu: any) => {
      if (selectedTasksList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one');
        closeMenu?.();
        return;
      }
      setIsPortalOpen({
        isOpen: true,
        isUpsert: true,
        isEdit: true,
        type: GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
      });
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_TASK],
    handleClick: (closeMenu: any) => {
      setIsPortalOpen({ isOpen: true, isDelete: true });
      closeMenu();
    },
  },
];
