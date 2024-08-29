import { UseFormReturn } from 'react-hook-form';

export interface HeaderI {
  actionProps: {
    deleteExpenseProps: {
      isDeleteExpenseModalOpen: boolean;
      setIsDeleteExpenseModalOpen: React.Dispatch<
        React.SetStateAction<boolean>
      >;
      handleDelete: () => void;
      deleteLoading: boolean;
    };
    updateExpenseProps: {
      isDisabled: boolean;
    };
  };
  dropdownOptions: {
    id: number;
    title: string;
    permissionKey: string[];
    handleClick: (close: () => void) => void;
  }[];
  addExpenseProps: {
    addExpenseModalTitle: string;
    isAddExpenseModalOpen: boolean;
    setIsAddExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    methods: UseFormReturn<any>;
    onAddExpenseSubmit: (data: any) => Promise<void>;
    handleAddExpenseModal: (isOpen?: boolean) => void;
    isLoadingExpense: boolean;
  };
}
