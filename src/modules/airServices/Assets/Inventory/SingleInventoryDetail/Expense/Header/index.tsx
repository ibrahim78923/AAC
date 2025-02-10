import { Box } from '@mui/material';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { useHeader } from './useHeader';
import { EXPENSE_PORTAL_ACTIONS } from '../Expense.data';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const Header = (props: any) => {
  const { selectedExpenseList } = props;
  const {
    openPortalComponent,
    isPortalOpen,
    expenseActionsDropdownList,
    setPortalAction,
  } = useHeader(props);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1.2,
        }}
      >
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_ASSETS_INVENTORY_EXPENSE_ACTION
          }
        >
          <SingleDropdownButton
            dropdownOptions={expenseActionsDropdownList}
            disabled={!selectedExpenseList?.length}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_NEW_EXPENSE,
          ]}
        >
          <AddNewItemButton
            name="Add New Expense"
            onClick={() =>
              setPortalAction?.(EXPENSE_PORTAL_ACTIONS?.ADD_EXPENSE)
            }
          />
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen && openPortalComponent?.[isPortalOpen?.action]}
    </>
  );
};
