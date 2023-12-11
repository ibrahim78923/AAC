import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';

import { columns, data } from './Manage.data';
import { Box, Button, Grid, useTheme } from '@mui/material';

import ActionButton from '../ActionButton';
import { FilterrIcon } from '@/assets/icons';
import useCampaigns from '../useCampaigns';
import Filters from '../Filters';
import SaveNewViewDrawer from '../SaveNewViewDrawer';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';

const Manage = () => {
  const theme = useTheme();
  const {
    handleOpenFilter,
    isOpenFilter,
    setIsOpenFilter,
    handleSaveView,
    actionsModalDetails,
    setActionsModalDetails,
  } = useCampaigns();
  const router = useRouter();
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
                onClick={() => handleOpenFilter()}
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
                onClick={handleSaveView}
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
                onClick={() => router.push(AIR_MARKETER?.ALL_VIEW)}
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
      <TanstackTable columns={columns} data={data} isPagination />

      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
      {actionsModalDetails?.isSaveView && (
        <SaveNewViewDrawer
          isOpenDrawer={actionsModalDetails?.isSaveView}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isSaveView: false,
            })
          }
        />
      )}
    </>
  );
};

export default Manage;
