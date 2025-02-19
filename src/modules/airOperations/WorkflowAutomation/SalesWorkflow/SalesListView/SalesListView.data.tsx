import { Dispatch, SetStateAction } from 'react';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { fullName } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';
import { WorkflowI } from '@/types/modules/AirOperations/WorkflowAutomation';
import { TruncateText } from '@/components/TruncateText';
import { WorkflowStatus } from './WorkflowStatus';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { tableCheckbox } from '@/utils/table-checkbox';

export const salesWorkflowActionDropdownDynamic = (
  selectedSalesWorkflowLists: WorkflowI[],
  setDeleteWorkflow: Dispatch<SetStateAction<boolean>>,
  handleEditWorkflow: () => void,
  handleClone: () => void,
) => [
  {
    id: 1,
    title: 'Edit',
    handleClick: (closeMenu: () => void) => {
      handleEditWorkflow();
      closeMenu?.();
    },
    disabled: selectedSalesWorkflowLists?.length > SELECTED_ARRAY_LENGTH?.ONE,
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.EDIT_WORKFLOW,
    ],
  },
  {
    id: 2,
    title: 'Clone',
    handleClick: (closeMenu: () => void) => {
      handleClone?.();
      closeMenu?.();
    },
    disabled: selectedSalesWorkflowLists?.length > SELECTED_ARRAY_LENGTH?.ONE,
    permissionKey: [AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.CLONE],
  },
  {
    id: 3,
    title: 'Delete',
    handleClick: (closeMenu: () => void) => {
      setDeleteWorkflow(true);
      closeMenu?.();
    },
    permissionKey: [
      AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.DELETE,
    ],
  },
];

export const salesWorkflowListsColumnDynamic = (
  activeCheck: WorkflowI[],
  setActiveCheck: Dispatch<SetStateAction<any[]>>,
  tableData: WorkflowI[],
) => {
  return [
    tableCheckbox({
      selectedList: activeCheck,
      setSelectedList: setActiveCheck,
      tableData,
    }),
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Workflow Name',
      cell: (info: any) => <TruncateText text={info?.getValue()} />,
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
        return <WorkflowStatus rowData={info?.row?.original} />;
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
