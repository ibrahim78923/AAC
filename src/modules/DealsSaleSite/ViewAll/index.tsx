import React, { useState } from 'react';
import DealDrawer from '../DealDrawer';
import { DragIcon, MenuIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { Box, Checkbox } from '@mui/material';
import Search from '@/components/Search';
import { columnsData } from './ViewAllDeals.data';

const ViewAllDeals = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <DealDrawer
        btnProps={{
          title: 'Deals',
          variant: 'text',
          disableRipple: true,
          sx: {
            color: '#1F2937',
            fontSize: '24px',
            fontWeight: '600',
            '&:hover': { background: 'none' },
            height: '40px',
          },
          startIcon: <MenuIcon />,
        }}
        drawerProps={{
          title: 'Customize Columns',
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
const ColumnsWrapper = ({ ...rest }) => {
  const { title, checkboxProps } = rest;
  return (
    <Box
      my={'16px'}
      sx={{
        padding: '0px 16px',
        borderRadius: '8px',
        border: '1.5px solid #E5E7EB',
        color: '#9CA3AF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
