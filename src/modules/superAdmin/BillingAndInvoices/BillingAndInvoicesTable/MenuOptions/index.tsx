import * as React from 'react';

import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import useMenuOptions from './useMenuOptions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS } from '@/constants/permission-keys';
import { REQUESTORS_STATUS } from '@/constants/strings';
import { MenuItemsPropsI } from './menuItems.interface';

const MenuItems = ({
  setIsOpenDrawer,
  setIsShowViewBillingDetails,
  isChecked,
  setIsEditModal,
  setIsUnassignPlan,
  planStatus,
}: MenuItemsPropsI) => {
  const {
    handleClickActions,
    handleCloseMenuOptions,
    anchorEl,
    openDropDown,
    setAnchorEl,
  } = useMenuOptions();
  const theme = useTheme();
  return (
    <>
      <Button
        onClick={handleClickActions}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
          width: '105px',
          height: '36px',
          '@media (max-width:400px)': {
            width: '100% !important',
          },
        }}
        disabled={!isChecked}
      >
        Actions
        <ArrowDropDown />
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openDropDown}
        onClose={handleCloseMenuOptions}
        TransitionComponent={Fade}
      >
        <PermissionsGuard
          permissions={[
            SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.BILLING_EDIT_PLAN,
          ]}
        >
          {planStatus === REQUESTORS_STATUS?.ACTIVE && (
            <MenuItem
              onClick={() => {
                setIsOpenDrawer(true);
                setIsEditModal(true);
                setAnchorEl(null);
              }}
            >
              Edit Assign Plan
            </MenuItem>
          )}
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            SUPER_ADMIN_BILLING_INVOICES_PERMISSIONS?.VIEW_BILLING_DETAILS,
          ]}
        >
          <MenuItem
            onClick={() => {
              setIsShowViewBillingDetails(true);
              setAnchorEl(null);
            }}
          >
            View Billing History
          </MenuItem>
        </PermissionsGuard>
        {planStatus === REQUESTORS_STATUS?.ACTIVE && (
          <MenuItem
            onClick={() => {
              setIsUnassignPlan(true);
              setAnchorEl(null);
            }}
          >
            Unassign plan
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MenuItems;
