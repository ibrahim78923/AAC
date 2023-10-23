import * as React from 'react';

import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import useMenuOptions from './useMenuOptions';

import { useRouter } from 'next/router';

import { SUPER_ADMIN } from '@/constants';

const MenuItems = ({ setIsOpenDrawer, setIsShowViewBillingDetails }: any) => {
  const { handleClickActions, handleCloseMenuOptions, anchorEl, openDropDown } =
    useMenuOptions();
  const router = useRouter();
  const theme = useTheme();
  return (
    <div>
      <Button
        onClick={handleClickActions}
        sx={{
          border: `1px solid ${theme.palette.custom.dark}`,
          color: theme.palette.custom.main,
          width: '105px',
        }}
      >
        <ArrowDropDown />
        Actions
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
        <MenuItem
          onClick={() =>
            router.push(`${SUPER_ADMIN?.BILLING_INVOICES}/generate-invoice`)
          }
        >
          Generate Invoice
        </MenuItem>

        <MenuItem
          onClick={() => {
            setIsShowViewBillingDetails(true);
          }}
        >
          View Billing Detail
        </MenuItem>

        <MenuItem
          onClick={() => {
            setIsOpenDrawer(true);
          }}
        >
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuItems;
