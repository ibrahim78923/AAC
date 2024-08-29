import { UseFormWatch } from 'react-hook-form';
import { WorkflowModuleTitleI } from './TestWorkflowDrawer.interface';

const moduleTitle: WorkflowModuleTitleI = {
  TICKETS: 'Tickets',
  ASSETS: 'Assets',
  TICKETS_TASKS: 'Tasks',
};
export const workflowModule: WorkflowModuleTitleI = {
  TICKETS: 'tickets',
  ASSETS: 'inventories',
  TICKETS_TASKS: 'tasks',
};
export const moduleKey: WorkflowModuleTitleI = {
  TICKETS: 'ticketIdNumber',
  ASSETS: 'displayName',
  TICKETS_TASKS: 'title',
};
type ModuleKey = keyof typeof moduleTitle;
export const workflowColumns = (watch: UseFormWatch<any>) => {
  const moduleSelectedOption: ModuleKey = watch('module');
  const titleData = moduleTitle[moduleSelectedOption];
  const keyData = moduleKey[moduleSelectedOption];
  return [
    {
      accessorFn: (row: any) => row?.[keyData],
      id: keyData?.toString() as string,
      isSortable: true,
      header: `${titleData} Name`,
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Action',
      cell: () => 'Will Execute',
    },
  ];
};
