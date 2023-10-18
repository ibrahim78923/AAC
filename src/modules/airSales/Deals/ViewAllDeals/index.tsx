import React from 'react';

import Search from '@/components/Search';

import DealDrawer from '../DealDrawer';

import useViewAllDeals from './useViewAllDeals';

import { columnsData } from './ViewAllDeals.data';

import { MenuIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const ViewAllDeals = () => {
  const { search, setSearch, theme, ColumnsWrapper } = useViewAllDeals();
  return (
    <>
      <DealDrawer
        btnProps={{
          title: 'Deals',
          variant: 'text',
          disableRipple: true,
          sx: {
            color: theme.palette.grey[800],
            fontSize: '24px',
            fontWeight: '600',
            '&:hover': { background: 'none' },
            height: '40px',
          },
          startIcon: <MenuIcon />,
        }}
        drawerProps={{
          title: 'All Views',
          okText: 'Save',
          submitHandler: () => {},
        }}
      >
        <Search
          label="Search Here"
          searchBy={search}
          setSearchBy={setSearch}
          fullWidth
          autoComplete="off"
        />
        {columnsData.map((column) => (
          <ColumnsWrapper
            key={uuidv4()}
            title={column.title}
            checkboxProps={{
              onChange: () => {},
            }}
          />
        ))}
      </DealDrawer>
    </>
  );
};

export default ViewAllDeals;
