import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { EXPENSE_PORTAL_ACTIONS } from '../Expense.data';

export const expenseActionsDropdownListDynamic = (
  setPortalAction: (value: string) => void,
  selectedExpenseList: any,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EDIT_EXPENSE],
    disabled: selectedExpenseList?.length > 1,
    handleClick: (close: () => void) => {
      setPortalAction(EXPENSE_PORTAL_ACTIONS?.EDIT_EXPENSE);
      close?.();
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.DELETE_EXPENSE],
    handleClick: (close: () => void) => {
      setPortalAction?.(EXPENSE_PORTAL_ACTIONS?.DELETE_EXPENSE);
      close?.();
    },
  },
];
