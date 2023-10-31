import { Box } from '@mui/material';
import { AddExpense } from '../AddExpense';
import { DeleteExpense } from '../DeleteExpense';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

const Header = ({ dropdownOptions, addExpenseProps, actionProps }: any) => {
  const { updateExpenseProps, deleteExpenseProps } = actionProps;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1.2,
      }}
    >
      <SingleDropdownButton
        dropdownOptions={dropdownOptions}
        disabled={updateExpenseProps?.isDisabled}
      />

      <AddExpense addExpenseProps={addExpenseProps} />
      {deleteExpenseProps?.isDeleteExpenseModalOpen && (
        <DeleteExpense deleteExpenseProps={deleteExpenseProps} />
      )}
    </Box>
  );
};

export default Header;
