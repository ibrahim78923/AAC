import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { columns } from './Manage.data';
import { Box, Button, ButtonGroup, Stack, Tooltip } from '@mui/material';
import ActionButton from '../ActionButton';
import {
  BookMarkDarkIcon,
  CustomizeIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import SaveNewViewDrawer from '../SaveNewViewDrawer';
import EditColumns from '../EditColumns';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';
import CampaingFilters from '../Filters';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useEffect } from 'react';
import useCustomize from '../EditColumns/useCustomize';
import useManage from './useManage';

const Manage = ({ selectedRows, setSelectedRows }: any) => {
  const {
    setActionsModalDetails,
    saveViewCampaignsData,
    setIsActionsDisabled,
    actionsModalDetails,
    setSearchCampaigns,
    handleResetFilters,
    setcheckedColumns,
    handleOpenFilter,
    setIsOpenFilter,
    searchCampaigns,
    handleSaveView,
    campaignsData,
    filterLoading,
    setPageLimit,
    isOpenFilter,
    setFilters,
    setRowId,
    filters,
    setPage,
    theme,
  } = useManage();

  const { activeColumns } = useCustomize({});

  const getQuotesColumns = columns(
    selectedRows,
    setSelectedRows,
    setIsActionsDisabled,
    setRowId,
    activeColumns,
  );

  useEffect(() => {
    setcheckedColumns(getQuotesColumns?.map((column: any) => column?.id));
  }, []);

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
          <Search
            label="Search Here"
            size="small"
            setSearchBy={setSearchCampaigns}
            searchBy={searchCampaigns}
          />
        </PermissionsGuard>

        <Stack
          display={{ md: 'flex' }}
          direction={{ sm: 'row' }}
          flexWrap="wrap"
          gap={1}
        >
          <ActionButton
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
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
              onClick={handleResetFilters}
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
        <Button
          variant="outlined"
          color="inherit"
          className="small"
          onClick={() =>
            setFilters({
              ...filters,
              campaignStatus: '',
              startDate: '',
              endDate: '',
            })
          }
        >
          All Campaigns
        </Button>
        {saveViewCampaignsData?.data?.views?.map((item: any) => (
          <Box key={item?._id}>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              key={item?.name}
              onClick={() =>
                setFilters({
                  ...filters,
                  campaignStatus: item?.campaignStatus,
                  startDate: dayjs(item?.startDate)?.format(DATE_FORMAT?.API),
                  endDate: dayjs(item?.endDate)?.format(DATE_FORMAT?.API),
                })
              }
            >
              {item?.name}
            </Button>
          </Box>
        ))}
      </ButtonGroup>

      <TanstackTable
        columns={getQuotesColumns}
        data={campaignsData?.data?.campaigns}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={campaignsData?.data?.meta?.pages}
        pageLimit={campaignsData?.data?.meta?.limit}
        totalRecords={campaignsData?.data?.meta?.total}
        isLoading={filterLoading}
        currentPage={campaignsData?.data?.meta?.page}
      />

      {actionsModalDetails?.isSaveView && (
        <SaveNewViewDrawer
          isOpenDrawer={actionsModalDetails?.isSaveView}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isSaveView: false,
            })
          }
          setSelectedRows={setSelectedRows}
        />
      )}

      {isOpenFilter && (
        <CampaingFilters
          isOpenDrawer={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          // handeApplyFilter={handeApplyFilter}
          filterLoading={filterLoading}
          filters={filters}
          setFilters={setFilters}
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
