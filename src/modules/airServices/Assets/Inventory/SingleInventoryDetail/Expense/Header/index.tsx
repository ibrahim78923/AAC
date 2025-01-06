import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { PlusSharedColorIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import { EXPENSE_PORTAL_ACTIONS } from '../Expense.data';

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
          <Button
            variant="contained"
            className={'small'}
            startIcon={<PlusSharedColorIcon />}
            onClick={() =>
              setPortalAction?.(EXPENSE_PORTAL_ACTIONS?.ADD_EXPENSE)
            }
          >
            Add New Expense
          </Button>
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen && openPortalComponent?.[isPortalOpen?.action]}
    </>
  );
};
