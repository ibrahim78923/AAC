import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography } from '@mui/material';
import ActionButton from './ActionButton';
import Manage from './Manage';
import useCompaigns from './useCompaigns';
import { FilterrIcon, PlusIcon } from '@/assets/icons';

const Compaigns = () => {
  const { theme, tabVal, setTabVal, checkedRows } = useCompaigns();
  return (
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Typography variant="h4">Compaigns</Typography>

        <Button variant="contained" startIcon={<PlusIcon />}>
          {tabVal === 0 ? 'Manage' : tabVal === 1 ? 'Calendar' : 'Tasks'}
        </Button>
      </Box>

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
          tabsArray={['Manage', 'Calendar', 'Tasks']}
          headerChildren={
            <>
              <ActionButton checkedRows={checkedRows} tabVal={tabVal} />
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
          <Manage />
          <Manage />

          <Manage />
        </CommonTabs>
      </Box>
    </Box>
  );
};
export default Compaigns;
