import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns, data } from './Manage.data';
import { Box, Button, Grid, useTheme } from '@mui/material';
import ActionButton from '../ActionButton';
import { FilterrIcon } from '@/assets/icons';
import useCompaigns from '../useCompaigns';
import Filters from '../Filters';
import Search from '@/components/Search';

const Manage = () => {
  const theme = useTheme();
  const { handleOpenFilter, isOpenFilter, setIsOpenFilter } = useCompaigns();
  return (
    <>
      <Box sx={{ paddingTop: '10px' }}>
        <Grid container>
          <Grid item md={12} lg={5}>
            <Search label="Search Here" width="260px" />
          </Grid>

          <Grid
            item
            lg={7}
            md={12}
            sm={12}
            sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'end' } }}
          >
            <Box sx={{ display: { lg: 'flex' }, marginTop: '8px' }}>
              <ActionButton />
              <Button
                startIcon={<FilterrIcon />}
                onClick={handleOpenFilter}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '95px',
                  height: '36px',
                  marginLeft: '8px',
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
                  marginLeft: '8px',
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
                  marginLeft: '8px',
                }}
              >
                See All Views
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ paddingBottom: '15px', paddingTop: '28px' }}>
        <Button variant="outlined" color="inherit" className="small">
          All Campaigns
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Starting this quarter
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Recently created
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Matt Anderson first view
        </Button>
      </Box>
      <TanstackTable columns={columns} data={data} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
    </>
  );
};

export default Manage;
