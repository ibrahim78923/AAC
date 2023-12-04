import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { Checkbox } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

export const SALES_WORKFLOW_ACTION_CONSTANTS = {
  FILTER_DATA: 'filter-data',
  DELETE: 'delete',
};

export const salesWorkflowActionDropdownDynamic = (
  setSalesWorkflowAction: any,
  selectedSalesWorkflowLists: any,
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
    title: 'Enable',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Disable',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setSalesWorkflowAction(SALES_WORKFLOW_ACTION_CONSTANTS?.DELETE);
      closeMenu?.();
    },
  },
];

export const salesWorkflowListsData: any = [
  {
    _id: 4,
    name: ` Quote`,
    type: 'Quote',
    lastActivity: 'Updated By Andrew',
    createdBy: 'John ',
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
  ];
};
