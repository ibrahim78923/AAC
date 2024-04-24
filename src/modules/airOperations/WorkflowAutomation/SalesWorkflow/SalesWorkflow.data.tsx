import { Checkbox } from '@mui/material';
import { REQUESTORS_STATUS, WORKFLOW_TYPE } from '@/constants/strings';
import { AntSwitch } from '@/components/AntSwitch';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { fullName } from '@/utils/avatarUtils';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { capitalizeFirstLetter, warningSnackbar } from '@/utils/api';

export const salesWorkflowActionDropdownDynamic = (
  selectedSalesWorkflowLists: any,
  setDeleteWorkflow: any,
  handleEditWorkflow: any,
  handleClone: any,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedSalesWorkflowLists?.length > 1) {
        warningSnackbar('Please select only one workflow');
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
      if (selectedSalesWorkflowLists?.length > 1) {
        warningSnackbar('Please select only one workflow to proceed.');
        closeMenu?.();
        return;
      }
      handleClone?.();
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
  handleChangeStatus: any,
  switchLoading: any,
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
      cell: (info: any) => {
        const capitalizedType = info?.getValue()
          ? capitalizeFirstLetter(info?.getValue())
          : '';

        return capitalizedType;
      },
    },
    {
      accessorFn: (row: any) => row?.activity,
      id: 'activity',
      isSortable: true,
      header: 'Last Activity',
      cell: (info: any) => {
        const type = info?.getValue()?.type;
        const capitalizedType = type ? capitalizeFirstLetter(type) : '';
        return fullName(
          capitalizedType + ' by',
          fullName(
            info?.getValue()?.user?.firstName,
            info?.getValue()?.user?.lastName,
          ),
        );
      },
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
            <AntSwitch
              disabled={
                info?.row?.original?.activity?.type === WORKFLOW_TYPE?.SAVED
              }
              checked={getValues}
              isLoading={switchLoading?.[info?.row?.original?._id]}
              onClick={() => handleChangeStatus?.(info?.row?.original)}
            />
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
