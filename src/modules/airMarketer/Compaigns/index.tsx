import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography } from '@mui/material';
import ActionButton from './ActionButton';
import Manage from './Manage';
import useCompaigns from './useCompaigns';
import { FilterrIcon, PlusIcon } from '@/assets/icons';
import Tasks from './Tasks';
import ImportIcon from '@/assets/icons/shared/import-icon';
import Filters from './Filters';

const Compaigns = () => {
  const { theme, setTabVal, isOpenFilter, setIsOpenFilter, handleOpenFilter } =
    useCompaigns();
  return (
    <Box>
      <Box
        sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
      >
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: '0px 24px', display: { md: 'flex' } }}
        >
          <Typography variant="h4">Compaigns</Typography>

          <Box>
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ mr: 1, mt: 0.2 }}
              startIcon={<ImportIcon />}
            >
              Compare compaigns
            </Button>
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
            >
              Create compaigns
            </Button>
          </Box>
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
                <ActionButton />
                <Button
                  startIcon={<FilterrIcon />}
                  onClick={handleOpenFilter}
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
                  className="samll"
                  variant="outlined"
                  color="inherit"
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
            <Tasks />
          </CommonTabs>
        </Box>
      </Box>
      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
    </Box>
  );
};
export default Compaigns;
