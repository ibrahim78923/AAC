import { Checkbox } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS, REQUESTORS_STATUS } from '@/constants/strings';
import { AntSwitch } from '@/components/AntSwitch';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { fullName } from '@/utils/avatarUtils';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

export const salesWorkflowActionDropdownDynamic = (
  selectedSalesWorkflowLists: any,
  setDeleteWorkflow: any,
  handleEditWorkflow: any,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedSalesWorkflowLists?.length > 1) {
        enqueueSnackbar('Please select only one workflow', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      handleEditWorkflow();
      closeMenu?.();
    },
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.EDIT_WORKFLOW,
    ],
  },
  {
    id: 2,
    title: 'Clone',
    handleClick: (closeMenu: any) => {
      enqueueSnackbar('Workflow clone successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeMenu?.();
    },
    permissionKey: [AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.CLONE],
  },
  {
    id: 3,
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteWorkflow(true);
      closeMenu?.();
    },
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.DELETE,
    ],
  },
];

export const salesWorkflowListsColumnDynamic: any = (
  activeCheck: any,
  setActiveCheck: any,
  tableData: any,
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
            !!activeCheck?.find((item: any) => item?._id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  tableData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
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
            tableData?.length
              ? activeCheck?.length === tableData?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...tableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
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
      accessorFn: (row: any) => row?.activity,
      id: 'activity',
      isSortable: true,
      header: 'Last Activity',
      cell: (info: any) =>
        fullName(
          info?.getValue()?.type ? info?.getValue()?.type + ' ' + 'by' : null,
          info?.getValue()?.user?.firstName + info?.getValue()?.user?.lastName,
        ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const getValues =
          info?.getValue() === REQUESTORS_STATUS?.ACTIVE ? true : false;
        return (
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.ACTIVE_INACTIVE_WORKFLOW,
            ]}
          >
            <AntSwitch checked={getValues} />
          </PermissionsGuard>
        );
      },
    },
    {
      accessorFn: (row: any) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
  ];
};

export const tabsData = ['Deals', 'Quotes', 'Tasks'];
