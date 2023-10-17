import React from 'react';

import { Box, Checkbox, useTheme } from '@mui/material';

import Search from '@/components/Search';

import DealDrawer from '../DealDrawer';
import UseViewAll from './useViewAll';
import { columnsData } from '../../../../mock/modules/airSales/Deals/ViewAll';

import { DragIcon, MenuIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { styles } from './viewAll.style';

const ViewAll = () => {
  const theme = useTheme();
  const { search, setSearch } = UseViewAll();
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

export default ViewAll;

const ColumnsWrapper = ({ ...rest }) => {
  const theme = useTheme();

  const { title, checkboxProps } = rest;
  return (
    <Box my={'16px'} sx={styles.viewBox(theme)}>
      <Box sx={styles.viewChildBox}>
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
