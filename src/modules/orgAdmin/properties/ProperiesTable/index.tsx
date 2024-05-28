import Search from '@/components/Search';
import { Box, Button, Grid, Tooltip } from '@mui/material';
import usePropertiesTable from './usePropertiesTable';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  propertiesTableData,
  propertiesTableColumns,
} from './PropertiesTable.data';
import PropertyActionButton from './PropertyActionButton';
import { AddWhiteBgIcon, FilterrIcon, RefreshTasksIcon } from '@/assets/icons';
import PropertyFilter from './PropertyFilter';
import CreatePropertyDrawer from '../CreatePropertyDrawer';

const PropertiesTable = () => {
  const {
    theme,
    searchBy,
    setSearchBy,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    createPropertyModal,
    setCreatePropertyModal,
  } = usePropertiesTable();

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ px: 2, mb: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Search
            placeholder="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="end"
          gap={2}
          alignItems="center"
        >
          <PropertyActionButton />
          <Button
            onClick={() => {
              setIsFilterDrawerOpen(true);
            }}
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
          <Tooltip title={'Refresh Filter'}>
            <Button variant="outlined" color="inherit" className="small">
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => setCreatePropertyModal(true)}
          >
            Create Property
          </Button>
        </Grid>
      </Grid>
      <TanstackTable
        columns={propertiesTableColumns}
        data={propertiesTableData}
        isPagination
      />

      {isFilterDrawerOpen && (
        <PropertyFilter
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
        />
      )}

      {createPropertyModal && (
        <CreatePropertyDrawer
          open={createPropertyModal}
          onClose={() => setCreatePropertyModal(false)}
        />
      )}
    </Box>
  );
};

export default PropertiesTable;
