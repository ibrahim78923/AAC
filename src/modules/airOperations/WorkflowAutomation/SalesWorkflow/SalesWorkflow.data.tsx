import { Checkbox } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { AntSwitch } from '@/components/AntSwitch';

export const salesWorkflowActionDropdownDynamic = (
  selectedSalesWorkflowLists: any,
  setDeleteWorkflow: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedSalesWorkflowLists?.length > 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      closeMenu?.();
    },
  },
  {
    title: 'Clone',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteWorkflow(true);
      closeMenu?.();
    },
  },
];

export const salesWorkflowListsData: any = [
  {
    _id: 1,
    name: 'Start Quote',
    type: 'Quote',
    lastActivity: 'Updated By Andrew',
    createdBy: 'Devon Lane ',
    status: true,
  },
  {
    _id: 2,
    name: 'Complete Deal',
    type: 'Deal',
    lastActivity: 'Update by Shaw',
    createdBy: 'Esther Howard',
    status: false,
  },
  {
    _id: 3,
    name: 'Update Task',
    type: 'Meeting',
    lastActivity: 'Paused by mcLester',
    createdBy: 'Annette Black',
    status: true,
  },
  {
    _id: 4,
    name: 'Change Deal Stage',
    type: 'Task',
    lastActivity: 'Paused by mcLester',
    createdBy: 'Jenny Wilson',
    status: false,
  },
  {
    _id: 5,
    name: 'Mark Task Complete',
    type: 'Deal',
    lastActivity: 'Paused by mcLester',
    createdBy: 'Ronald Richards',
    status: true,
  },
  {
    _id: 6,
    name: 'Update Task',
    type: 'Quote',
    lastActivity: 'Paused by mcLester',
    createdBy: 'Courtney Henry',
    status: true,
  },
];
export const salesWorkflowListsColumnDynamic: any = (
  selectedSalesWorkflowLists: any,
  setSelectedSalesWorkflowLists: any,
  salesWorkflowLists: any = salesWorkflowListsData,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          checked={
            !!selectedSalesWorkflowLists?.find(
              (item: any) => item === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedSalesWorkflowLists([
                  ...selectedSalesWorkflowLists,
                  info?.getValue(),
                ])
              : setSelectedSalesWorkflowLists(
                  selectedSalesWorkflowLists?.filter(
                    (item: any) => item !== info?.getValue(),
                  ),
                );
          }}
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          color="primary"
          name={info?.getValue()}
        />
      ),
      header: (
        <Checkbox
          checked={
            salesWorkflowLists?.length
              ? selectedSalesWorkflowLists?.length ===
                salesWorkflowLists?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedSalesWorkflowLists(
                  salesWorkflowLists?.map((ticket: any) => ticket?._id),
                )
              : setSelectedSalesWorkflowLists([]);
          }}
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          color="primary"
          name="_id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Workflow Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.lastActivity,
      id: 'lastActivity',
      isSortable: true,
      header: 'Last Activity',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => <AntSwitch values={info?.getValue()} />,
    },
  ];
};
