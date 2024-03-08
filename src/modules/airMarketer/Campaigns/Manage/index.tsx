import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { columns, data } from './Manage.data';
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import ActionButton from '../ActionButton';
import {
  BookMarkDarkIcon,
  CustomizeIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import useCampaigns from '../useCampaigns';
import Filters from '../Filters';
import SaveNewViewDrawer from '../SaveNewViewDrawer';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import EditColumns from '../EditColumns';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';

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
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ md: 'row', xs: 'column' }}
        flexWrap="wrap"
        gap={1}
      >
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.SEARCH_FILTER]}
        >
          <Search label="Search Here" size="small" />
        </PermissionsGuard>

        <Stack
          display={{ md: 'flex' }}
          direction={{ sm: 'row' }}
          flexWrap="wrap"
          gap={1}
        >
          <ActionButton />
          <PermissionsGuard
            permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.SAVE_ALL_VIEWS]}
          >
            <Button
              onClick={() => router?.push(AIR_MARKETER?.ALL_VIEW)}
              startIcon={<BookMarkDarkIcon />}
              className="small"
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: { sm: '130px', xs: '100%' },
                height: '36px',
              }}
            >
              See All Views
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.EDIT_COLUMNS]}
          >
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ width: { xs: '100%', sm: '132px' } }}
              startIcon={<CustomizeIcon />}
              onClick={() => {
                setActionsModalDetails({
                  ...actionsModalDetails,
                  isEditColumns: true,
                });
              }}
            >
              Customize
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.SAVE_VIEW]}
          >
            <Button
              onClick={handleSaveView}
              startIcon={<BookMarkDarkIcon />}
              className="samll"
              variant="outlined"
              color="inherit"
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: { sm: '130px', xs: '100%' },
                height: '36px',
              }}
            >
              Save View
            </Button>
          </PermissionsGuard>
          <Tooltip title={'Refresh Filter'}>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              sx={{ width: { sm: '54px', xs: '100%' } }}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <PermissionsGuard
            permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.SEARCH_FILTER]}
          >
            <Button
              startIcon={<FilterrIcon />}
              onClick={handleOpenFilter}
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: { sm: '95px', xs: '100%' },
                height: '36px',
              }}
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Stack>
      </Box>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        sx={{
          flexWrap: 'wrap',
          paddingBottom: '15px',
          paddingTop: '28px',
          width: { sm: '100%' },
        }}
      >
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
      </ButtonGroup>

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

      {actionsModalDetails?.isEditColumns && (
        <EditColumns
          open={actionsModalDetails?.isEditColumns}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isEditColumns: false,
            })
          }
        />
      )}
    </>
  );
};

export default Manage;
