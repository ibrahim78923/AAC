import React from 'react';

import Link from 'next/link';

import { Button, MenuItem, Select, useTheme } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import DealCustomize from './DealCustomize';
import DelasTable from './DealsTable';
import DealHeader from './DealHeader';
import DealFilter from './DealFilter';
import ShareMyDine from './ShareMyDine';
import DeleteModal from './DealsModalBox';
import { menuItem } from './DealsTable/TableColumns.data';
import CreateView from './CreateView';
import useDealSaleSite from './useDealSaleSite';

import Layout from '@/layout';

import { RestoreIcon } from '@/assets/icons';
import { DealsTabs } from './DealsSaleSite.data';

const DealsSaleSite = () => {
  const theme = useTheme();
  const { search, setSearch, actions, handleActions } = useDealSaleSite();

  return (
    <Layout>
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
            <DealFilter />
          </>
        }
      >
        <DelasTable />
      </CommonTabs>
    </Layout>
  );
};

export default DealsSaleSite;
