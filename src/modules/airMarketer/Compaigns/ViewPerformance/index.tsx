import React from 'react';
import ViewCompaignDetails from './ViewCompaignDetails';
import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography } from '@mui/material';
import { BackArrowIcon } from '@/assets/icons';
import { FilterrIcon, PlusIcon } from '@/assets/icons';
import useCompaigns from '../useCompaigns';
import Performance from './Tabs/Performace';
import Tasks from './Tabs/Tasks';

const ViewPerforance = () => {
  const { theme, setTabVal } = useCompaigns();
  return (
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box mt={0.7} mr={2}>
            <BackArrowIcon />
          </Box>
          <Typography variant="h4">Compaigns</Typography>
        </Box>

        <Box>
          <Button variant="contained" startIcon={<PlusIcon />}>
            View Assets
          </Button>
        </Box>
      </Box>
      <ViewCompaignDetails />
      <Box sx={{ padding: '0px 24px' }}>
        <CommonTabs
          getTabVal={(val: number) => setTabVal(val)}
          searchBarProps={{
            label: 'Search Here',
            setSearchBy: 'setFilterValues',
            searchBy: ' filterValues?.search',
            width: '260px',
          }}
          isHeader={true}
          tabsArray={['Performance', 'Assets', 'Tasks']}
          headerChildren={
            <>
              <Button
                startIcon={<FilterrIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '95px',
                  height: '36px',
                }}
              >
                Filter
              </Button>
              <Button
                startIcon={<FilterrIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '130px',
                  height: '36px',
                }}
              >
                Save View
              </Button>
              <Button
                startIcon={<FilterrIcon />}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '130px',
                  height: '36px',
                }}
              >
                See All Views
              </Button>
            </>
          }
        >
          <Performance />
          <Performance />
          <Tasks />
        </CommonTabs>
      </Box>
    </Box>
  );
};
export default ViewPerforance;
