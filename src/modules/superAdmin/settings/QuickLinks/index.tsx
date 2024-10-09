import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { isNullOrEmpty } from '@/utils';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModals } from '@/components/AlertModals';
import { columns, quickLinksFilterFiltersDataArray } from './QuickLinks.data';
import {
  ArrowLeftIcon,
  DownIcon,
  FilterSharedIcon,
  RefreshSharedIcon,
} from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { styles } from './QuickLinks.style';
import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS } from '@/constants/permission-keys';
import useQuickLinks from './useQuickLinks';
import QuickLinkSwitch from './QuickLinkSwitch';
import Loader from '@/components/Loader';

const QuickLinks = () => {
  const theme = useTheme();
  const {
    loagingGetQuickLinks,
    dataGetQuickLinks,

    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,

    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    loadingDelete,
    handleDeleteQuickLink,
    isLinkDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,

    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    selectProductOptions,
    handleSwitchChange,
    mergedProducts,
    loadingUpdateQuickLink,
    convertFormat,
  } = useQuickLinks();

  const getQuickLinksTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  const [isManageQuickLinks, setIsManageQuickLinks] = useState<boolean>(false);

  return (
    <>
      {!isManageQuickLinks ? (
        <Box
          sx={{
            borderRadius: '15px',
            border: '1px solid #EAECF0',
          }}
        >
          <Box sx={styles?.pageHeader}>
            <Box sx={styles?.heading}>
              <Typography variant="h3" sx={{ fontWeight: '600' }}>
                Quick Links
              </Typography>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Manage_Links,
                ]}
              >
                <Button
                  variant="contained"
                  sx={{ height: '36px', fontWeight: '500' }}
                  onClick={() => setIsManageQuickLinks(true)}
                >
                  <PlusShared /> &nbsp; Manage
                </Button>
              </PermissionsGuard>
            </Box>
            <Box sx={styles?.filterBar}>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Search_and_Filter,
                ]}
              >
                <Box sx={styles?.search}>
                  <Search
                    setSearchBy={setSearchValue}
                    label="Search Here"
                    size="small"
                    width={'100%'}
                  />
                </Box>
              </PermissionsGuard>

              <Box sx={styles?.filterButtons}>
                <Button
                  id="basic-button"
                  aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={actionMenuOpen ? 'true' : undefined}
                  onClick={handleActionsMenuClick}
                  sx={styles?.actionBtn}
                  className="small"
                  disabled={isActionsDisabled}
                >
                  Actions &nbsp; <DownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={actionMenuOpen}
                  onClose={handleActionsMenuClose}
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
                      SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Delete_Link,
                    ]}
                  >
                    <MenuItem
                      style={{ fontSize: '14px' }}
                      onClick={handleOpenModalDelete}
                    >
                      Delete
                    </MenuItem>
                  </PermissionsGuard>
                </Menu>
                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Refresh_Record,
                  ]}
                >
                  <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                    <Button
                      sx={styles?.refreshButton}
                      className="small"
                      onClick={handleRefresh}
                    >
                      <RefreshSharedIcon />
                    </Button>
                  </Tooltip>
                </PermissionsGuard>

                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Search_and_Filter,
                  ]}
                >
                  <Button
                    sx={styles?.filterButton}
                    className="small"
                    onClick={handleOpenFilters}
                  >
                    <FilterSharedIcon /> &nbsp; Filter
                  </Button>
                </PermissionsGuard>
              </Box>
            </Box>
          </Box>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_QUICK_LINKS_PERMISSIONS?.Links_List,
            ]}
          >
            <Box>
              <TanstackTable
                columns={getQuickLinksTableColumns}
                data={dataGetQuickLinks?.data?.quicklinks}
                isLoading={loagingGetQuickLinks}
                currentPage={dataGetQuickLinks?.data?.meta?.page}
                count={dataGetQuickLinks?.data?.meta?.pages}
                pageLimit={dataGetQuickLinks?.data?.meta?.limit}
                totalRecords={dataGetQuickLinks?.data?.meta?.total}
                setPage={setPage}
                setPageLimit={setPageLimit}
                onPageChange={(page: any) => setPage(page)}
                isPagination
              />
            </Box>
          </PermissionsGuard>

          <CommonDrawer
            isDrawerOpen={openFilters}
            onClose={handleCloseFilters}
            title="Filters"
            okText="Apply"
            isOk={true}
            footer={true}
            submitHandler={handleFiltersSubmit}
          >
            <>
              <FormProvider methods={methodsFilter}>
                <Grid container spacing={'22px'}>
                  {quickLinksFilterFiltersDataArray(
                    selectProductOptions(),
                  )?.map((item: any) => (
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
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
            }}
            onClick={() => setIsManageQuickLinks(false)}
          >
            <ArrowLeftIcon />
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              Quick Links
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ marginTop: '40px' }}>
            {!isNullOrEmpty(mergedProducts) &&
              mergedProducts?.map((product: any) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={uuidv4()}>
                  <Box sx={styles?.quickLinksCard(theme)}>
                    <Box sx={styles?.quickLinksCardHead(theme)}>
                      <Typography variant="h6">
                        {convertFormat(product?.productName)}
                      </Typography>
                    </Box>
                    {product?.data?.map((link: any) => (
                      <QuickLinkSwitch
                        key={uuidv4()}
                        title={link?.name}
                        name={link?._id}
                        id={link?._id}
                        isActive={link?.isActive}
                        onChange={handleSwitchChange}
                      />
                    ))}
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Loader isLoading={loadingUpdateQuickLink} />
        </Box>
      )}
      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isLinkDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteQuickLink}
        loading={loadingDelete}
      />
    </>
  );
};

export default QuickLinks;
