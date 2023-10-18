import React from 'react';

import Link from 'next/link';

import { Button, MenuItem, Select } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import DealCustomize from './DealCustomize';
import DelasTable from './DealsTable';
import DealHeader from './DealHeader';
import DealFilterDrawer from './DealFilterDrawer';
import ShareMyDine from './ShareMyDine';
import DeleteModal from './DealsModalBox';
import CreateView from './CreateView';

import useDealSaleSite from './useDealSaleSite';

import { DealsTabs } from './DealsSaleSite.data';
import { menuItem } from './DealsTable/DealsTable.data';

import { RestoreIcon } from '@/assets/icons';

const Deals = () => {
  const { search, setSearch, actions, handleActions, theme } =
    useDealSaleSite();

  return (
    <>
      <DealHeader />
      <CommonTabs
        tabsArray={DealsTabs}
        isHeader={true}
        searchBarProps={{
          label: 'Search Here',
          setSearchBy: setSearch,
          searchBy: search,
          width: '260px',
        }}
        headerChildren={
          <>
            <CreateView />
            <Select
              value={actions}
              onChange={handleActions}
              sx={{
                width: '140px',
                height: 30,
                fontSize: 14,
                color: theme.palette.custom['main'],
              }}
            >
              <MenuItem value={'actions'} selected disabled>
                Actions
              </MenuItem>
              {menuItem.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
              <MenuItem value={'actions'}>
                <Link href={'/air-sales/deals/view-details'}>View Details</Link>
              </MenuItem>
            </Select>
            {actions === 'Preview' && <ShareMyDine />}
            {actions === 'Delete' && <DeleteModal />}
            <Link href={'/air-sales/deals/restore'}>
              <Button
                variant="outlined"
                sx={{ height: '30px', color: theme.palette.custom['main'] }}
              >
                <RestoreIcon /> &nbsp; Restore
              </Button>
            </Link>
            <DealCustomize />
            <DealFilterDrawer />
          </>
        }
      >
        <DelasTable />
      </CommonTabs>
    </>
  );
};

export default Deals;
