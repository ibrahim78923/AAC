import React, { useState } from 'react';
import DelasTable from './DealsTable';
import Layout from '@/layout';
import DealHeader from './DealHeader';
import DealFilter from './DealFilter';
import DealCustomize from './DealCustomize';
import CommonTabs from '@/components/Tabs';
import { Button, MenuItem, Select } from '@mui/material';
import ShareMyDine from './ShareMyDine';
import DeleteModal from './DeleteModal';
import { menuItem } from './Deals.data';
import CreateView from './CreateView';
import Link from 'next/link';
import { RestoreIcon } from '@/assets/icons';

const SalesDeals = () => {
  const DealsTabs = ['All Deals', 'My Deals'];
  const [search, setSearch] = useState('');
  const [actions, setActions] = useState('actions');

  const handleActions = (e: any) => {
    setActions(e.target.value);
  };

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
                color: '#6B7280',
              }}
            >
              <MenuItem value={'actions'} sx={{}} selected disabled>
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
            <Link href={'/deals/restore'}>
              <Button
                variant="outlined"
                sx={{ height: '30px', color: '#6B7280' }}
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

export default SalesDeals;
