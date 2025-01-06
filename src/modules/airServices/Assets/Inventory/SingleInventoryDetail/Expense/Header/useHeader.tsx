import { useState } from 'react';
import { EXPENSE_PORTAL_ACTIONS } from '../Expense.data';
import { UpsertExpense } from '../UpsertExpense';
import { DeleteExpense } from '../DeleteExpense';
import { expenseActionsDropdownListDynamic } from './Header.data';

export const useHeader = (props: any) => {
  const { selectedExpenseList, setSelectedExpenseList } = props;

  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const openPortalComponent = {
    [EXPENSE_PORTAL_ACTIONS?.ADD_EXPENSE]: (
      <UpsertExpense
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
        selectedExpenseList={selectedExpenseList}
        setSelectedExpenseList={setSelectedExpenseList}
      />
    ),
    [EXPENSE_PORTAL_ACTIONS?.EDIT_EXPENSE]: (
      <UpsertExpense
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
        selectedExpenseList={selectedExpenseList}
        setSelectedExpenseList={setSelectedExpenseList}
      />
    ),
    [EXPENSE_PORTAL_ACTIONS?.DELETE_EXPENSE]: (
      <DeleteExpense
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
        selectedExpenseList={selectedExpenseList}
        setSelectedExpenseList={setSelectedExpenseList}
      />
    ),
  };

  const setPortalAction = (action: any) => {
    setIsPortalOpen({
      isOpen: true,
      action,
    });
  };

  const expenseActionsDropdownList = expenseActionsDropdownListDynamic?.(
    setPortalAction,
    selectedExpenseList,
  );

  return {
    expenseActionsDropdownList,
    openPortalComponent,
    isPortalOpen,
    setPortalAction,
  };
};
