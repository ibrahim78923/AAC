import { UseFormWatch } from 'react-hook-form';
import { WorkflowModuleTitleI } from './TestWorkflowDrawer.interface';

const moduleTitle: WorkflowModuleTitleI = {
  DEALS: 'Deals',
  QUOTES: 'Quotes',
  SALES_TASKS: 'Tasks',
};
export const workflowModule: WorkflowModuleTitleI = {
  DEALS: 'deals',
  QUOTES: 'quotes',
  SALES_TASKS: 'taskmanagements',
};
type ModuleKey = keyof typeof moduleTitle;
export const workflowColumns = (watch: UseFormWatch<any>) => {
  const moduleSelectedOption: ModuleKey = watch('module');
  const titleData = moduleTitle[moduleSelectedOption];
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
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
