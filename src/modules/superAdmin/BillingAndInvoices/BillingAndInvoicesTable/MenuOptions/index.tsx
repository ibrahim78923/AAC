import * as React from 'react';

import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';

import Fade from '@mui/material/Fade';

import useMenuOptions from './useMenuOptions';
import { ArrowDropDown } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { SUPER_ADMIN } from '@/constants';

const MenuItems = ({ setIsOpenDrawer, setIsShowViewBillingDetails }: any) => {
  const { handleClickActions, handleCloseMenuOptions, anchorEl, openDropDown } =
    useMenuOptions();
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={handleClickActions}
        sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
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
