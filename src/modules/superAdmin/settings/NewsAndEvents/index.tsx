import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import NewsAndEventsModal from './NewsAndEventsModal';
import { FormProvider } from '@/components/ReactHookForm';
import {
  MODAL_TITLE,
  columns,
  newsAndEventsDateFiltersDataArray,
} from './NewsAndEvents.data';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import { styles } from './NewsAndEvents.style';
import useNewsAndEvents from './useNewsAndEvents';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS } from '@/constants/permission-keys';

const NewsAndEvents = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleClick,
    handleClose,
    selectedRow,
    setSelectedRow,
    methodsAddNewsEvents,
    titleAddModal,
    isNewsAndEventAddModal,
    handleOpenAddModal,
    handleCloseAddModal,
    handleAddNewsEventsSubmit,
    loadingUpdate,
    loadingAdd,
    NewsEventsData,
    isLoading,
    setPageLimit,
    setPage,
    setSearchValue,
    methodsNewsAndEventsFilters,
    handleSubmit,
    setIsNewsAndEventsFilterDrawerOpen,
    isNewsAndEventsFilterDrawerOpen,
    onSubmit,
    handleRefresh,
    theme,
    handleDelete,
    loadingDelete,
    isNewsAndEventsDeleteModal,
    setisNewsAndEventsDeleteModal,
    handleUpdateStatus,
  } = useNewsAndEvents();

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '19px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            News And Events
          </Typography>
        </Box>
        <Box sx={styles?.filterBar}>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Search_and_Filter,
            ]}
          >
            <Box sx={styles?.search}>
              <Search
                label={'Search here'}
                setSearchBy={setSearchValue}
                width="100%"
              />
            </Box>
          </PermissionsGuard>

          <Box sx={styles?.filterButtons}>
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleClick}
              disabled={selectedRow?.length === 0}
              sx={styles?.actionBtn}
              className="small"
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
            >
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Edit,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleOpenAddModal(MODAL_TITLE?.UPDATE);
                    handleClose();
                  }}
                  disabled={selectedRow?.length > 1}
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>

              <MenuItem
                onClick={() => {
                  handleUpdateStatus('active');
                  handleClose();
                }}
                disabled={selectedRow?.length > 1}
              >
                Active
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleUpdateStatus('inactive');
                  handleClose();
                }}
                disabled={selectedRow?.length > 1}
              >
                Inactive
              </MenuItem>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Delete,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    setisNewsAndEventsDeleteModal(true);
                    handleClose();
                  }}
                >
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Refresh_Record,
              ]}
            >
              <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                <Button
                  sx={styles?.refreshButton(theme)}
                  className="small"
                  onClick={handleRefresh}
                >
                  <RefreshSharedIcon />
                </Button>
              </Tooltip>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Search_and_Filter,
              ]}
            >
              <Button
                sx={styles?.filterButton(theme)}
                className="small"
                onClick={() => setIsNewsAndEventsFilterDrawerOpen(true)}
              >
                <FilterSharedIcon /> &nbsp; Filter
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.Add,
              ]}
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: '500',
                  width: '90px',
                  '@media (max-width:581px)': {
                    width: '100%',
                  },
                }}
                className="small"
                onClick={() => handleOpenAddModal(MODAL_TITLE?.ADD)}
              >
                <PlusShared /> &nbsp; Add
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_SETTINGS_NEWS_AND_EVENTS_PERMISSIONS?.News_and_Events_List,
        ]}
      >
        <Box>
          <TanstackTable
            columns={columns(selectedRow, setSelectedRow, theme)}
            data={NewsEventsData?.data?.newsandevents}
            isLoading={isLoading}
            currentPage={NewsEventsData?.data?.meta?.page}
            count={NewsEventsData?.data?.meta?.pages}
            pageLimit={NewsEventsData?.data?.meta?.limit}
            totalRecords={NewsEventsData?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Box>
      </PermissionsGuard>

      <CommonDrawer
        isDrawerOpen={isNewsAndEventsFilterDrawerOpen}
        onClose={() => {
          setIsNewsAndEventsFilterDrawerOpen(false);
        }}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormProvider
            methods={methodsNewsAndEventsFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {newsAndEventsDateFiltersDataArray?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </>
      </CommonDrawer>

      <NewsAndEventsModal
        title={titleAddModal}
        isNewsAndEventAddModal={isNewsAndEventAddModal}
        handleOnClode={handleCloseAddModal}
        methods={methodsAddNewsEvents}
        handleOnSubmit={handleAddNewsEventsSubmit}
        isLoading={loadingAdd || loadingUpdate}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isNewsAndEventsDeleteModal}
        handleClose={() => setisNewsAndEventsDeleteModal(false)}
        handleSubmitBtn={handleDelete}
        loading={loadingDelete}
      />
    </Box>
  );
};

export default NewsAndEvents;
