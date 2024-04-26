import { Box } from '@mui/material';
import { AddExpense } from '../AddExpense';
import { DeleteExpense } from '../DeleteExpense';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

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
      <PermissionsGuard
        permissions={Permissions?.AIR_SERVICES_ASSETS_INVENTORY_EXPENSE_ACTION}
      >
        <SingleDropdownButton
          dropdownOptions={dropdownOptions}
          disabled={updateExpenseProps?.isDisabled}
        />
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_NEW_EXPENSE,
        ]}
      >
        <AddExpense addExpenseProps={addExpenseProps} />
        {deleteExpenseProps?.isDeleteExpenseModalOpen && (
          <DeleteExpense deleteExpenseProps={deleteExpenseProps} />
        )}
      </PermissionsGuard>
    </Box>
  );
};

export default Header;
