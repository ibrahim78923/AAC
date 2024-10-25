import React, { createElement } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  List,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import { FolderIcon, FilterrIcon, RefreshTasksIcon } from '@/assets/icons';

import useDocuments from './useDocuments';

import { FormProvider } from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';

import { styles } from './Documents.style';
import { createFolderData, MODAL_HEADING, filterData } from './Documents.data';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { SOCIAL_FEATURES } from '@/routesConstants/paths';
import { componentMap } from '@/utils/dynamic-forms';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import RenderFolder from '../components/RenderFolder';

const Documents = () => {
  const navigate = useRouter();
  const {
    theme,
    open,
    anchorEl,
    handleClick,
    handleClose,
    getFoldersData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    selectedFolders,
    handleCheckboxChange,
    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    isOpenModal,
    handleOpenCreateFolderModal,
    handleCloseCreateFolderModal,
    methodsFolder,
    watchVisibleTo,
    orgUsersData,
    orgTeamsData,
    orgId,
    modalHeading,
    isOpenDelete,
    setIsOpenDelete,
    deleteUserFolders,
    loadingDelete,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,
    loadingCreateFolder,
    loadingUpdate,
    isOpenMoveFolderDrawer,
    handleOpenMoveFolderDrawer,
    handleCloseMoveFolderDrawer,
    setSearchMoveFolder,
    moveFoldersData,
    fetchingGetAllFolders,
    loadingGetAllFolders,
    selectedMoveToFolderId,
    handleListItemClick,
    handleSubmitMoveToFolder,
    handleDownloadFolder,
    isLoadingDownload,
  } = useDocuments();

  const createFolderFormData = createFolderData(
    watchVisibleTo,
    orgUsersData,
    orgId,
    modalHeading,
    orgTeamsData,
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Typography variant="h5" sx={styles?.documentTitle(theme)}>
            Documents
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12} sx={styles?.actionButtonBox}>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.CREATE_FOLDER,
            ]}
          >
            <Button
              variant="outlined"
              className="small"
              onClick={() => {
                handleOpenCreateFolderModal(MODAL_HEADING?.create);
              }}
              sx={styles?.createFolderButton(theme)}
            >
              <AddCircle /> Create Folder
            </Button>
          </PermissionsGuard>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          sx={styles?.documentTitle(theme)}
        >
          <Search
            label="Search here"
            width="260px"
            setSearchBy={setSearchValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box sx={styles?.actionFilterBox}>
            <Button
              sx={styles?.actionButton(theme)}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="small"
              disabled={selectedFolders.length === 0}
            >
              Action
              <ArrowDropDownIcon
                sx={{ color: `${theme?.palette?.custom?.main}` }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.DOWNLOAD_LIST,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleDownloadFolder(selectedFolders[0]?._id);
                  }}
                  disabled={selectedFolders?.length > 1}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Download
                  {isLoadingDownload && <CircularProgress size="16px" />}
                </MenuItem>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.LIST_MOVE_TO_FOLDER,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleOpenMoveFolderDrawer();
                  }}
                >
                  Move To Folder
                </MenuItem>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.RENAME_FOLDER,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleOpenCreateFolderModal(MODAL_HEADING?.update);
                  }}
                  disabled={selectedFolders?.length > 1}
                >
                  Rename
                </MenuItem>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.DELETE_FOLDER,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsOpenDelete(true);
                  }}
                >
                  Delete
                </MenuItem>
              </PermissionsGuard>
            </Menu>

            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.APPLY_FILTER,
              ]}
            >
              <Box>
                <Tooltip title={'Refresh Filter'}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="small"
                    onClick={handleRefresh}
                  >
                    <RefreshTasksIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Button
                onClick={handleOpenFilters}
                variant="outlined"
                sx={styles?.fiterButton(theme)}
                className="small"
              >
                <FilterrIcon /> Filter
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>

        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.VIEW_FOLDERS]}
        >
          {(isLoading || isFetching) &&
            Array(8)
              .fill(null)
              .map(() => (
                <Grid item lg={3} md={3} sm={6} xs={12} key={uuidv4()}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={'100%'}
                    height={150}
                    sx={styles?.skeleton}
                  />
                </Grid>
              ))}
          {isError && (
            <Grid item xs={12}>
              <ApiErrorState />
            </Grid>
          )}
          {!(isLoading || isFetching) &&
            isSuccess &&
            getFoldersData &&
            (getFoldersData?.data?.length === 0 ? (
              <Grid item xs={12}>
                <NoData />
              </Grid>
            ) : (
              getFoldersData?.data?.map((item: any) => (
                <Grid item lg={3} md={3} sm={6} xs={12} key={item?._id}>
                  <Box
                    sx={{
                      border: `1.16px solid ${theme?.palette?.custom?.pale_gray}`,
                      borderRadius: '11.56px',
                      padding: '0.6rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: ' 0px 0px 5px 3px #A0E5DB40',
                        borderColor: 'transparent',
                      },
                    }}
                    key={uuidv4()}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '10px',
                      }}
                    >
                      <Box sx={styles?.folderBackground(theme)}>
                        <FolderIcon />
                      </Box>
                      <Box sx={{ zIndex: 999, cursor: 'unset' }}>
                        <Checkbox
                          checked={selectedFolders.some(
                            (selected: any) => selected._id === item._id,
                          )}
                          onChange={() => {
                            handleCheckboxChange(item);
                          }}
                        />
                      </Box>
                    </Box>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate.push({
                            pathname: `${SOCIAL_FEATURES?.DOCUMENTS}/${item?._id}`,
                            query: {
                              name: item?.name,
                            },
                          });
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            color: `${theme?.palette?.grey[600]}`,
                          }}
                        >
                          {item?.name}
                        </Typography>
                        <Typography
                          variant="body3"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: `${theme?.palette?.grey[900]}`,
                            fontWeight: 400,
                          }}
                        >
                          Created By:
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.custom?.main}`,
                              fontWeight: 500,
                            }}
                          >
                            {item?.createdBy?.firstName}
                            {item?.createdBy?.lastName}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body3"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            color: `${theme?.palette?.grey[900]}`,
                            fontWeight: 400,
                          }}
                        >
                          Created Date:
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.custom?.main}`,
                              fontWeight: 500,
                            }}
                          >
                            {dayjs(item?.createdAt).format(DATE_FORMAT.API)}
                          </Typography>
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              ))
            ))}
        </PermissionsGuard>
      </Grid>

      {/* Filter Drawer */}
      <CommonDrawer
        isDrawerOpen={openFilters}
        onClose={handleCloseFilters}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleFiltersSubmit}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methodsFilter}>
            <Grid container spacing={2}>
              {filterData?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      {/* Move Folder Drawer */}
      <CommonDrawer
        isDrawerOpen={isOpenMoveFolderDrawer}
        onClose={handleCloseMoveFolderDrawer}
        title="Move to folder"
        okText="Move"
        submitHandler={handleSubmitMoveToFolder}
        isOk={true}
        footer={true}
        isLoading={loadingUpdate}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            setSearchBy={setSearchMoveFolder}
            size="small"
            sx={{ width: '100%' }}
          />

          <List component="nav" sx={{ padding: '12px 0' }}>
            {loadingGetAllFolders || fetchingGetAllFolders ? (
              Array(6)
                .fill(null)
                .map(() => (
                  <Box sx={{ mt: '12px' }} key={uuidv4()}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={52}
                      sx={styles?.skeleton}
                    />
                  </Box>
                ))
            ) : moveFoldersData?.length === 0 ? (
              <NoData />
            ) : (
              moveFoldersData?.map((item: any) => (
                <React.Fragment key={item?._id}>
                  <RenderFolder
                    folder={item}
                    selectedMoveToFolderId={selectedMoveToFolderId}
                    handleClickListItem={handleListItemClick}
                  />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </CommonDrawer>

      {/* Create Folder Modal */}
      <CommonModal
        open={isOpenModal}
        handleCancel={handleCloseCreateFolderModal}
        handleSubmit={handleCreateFolderSubmit}
        title={modalHeading}
        okText={
          modalHeading === MODAL_HEADING?.update ? 'Update' : 'Create Folder'
        }
        cancelText="Cancel"
        footerFill={false}
        footer={true}
        isLoading={loadingCreateFolder || loadingUpdate}
      >
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methodsFolder}>
            <Grid container spacing={2}>
              {createFolderFormData?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
              {form?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  key={item?.id}
                  sx={{ paddingTop: '10px !important' }}
                >
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        )}
      </CommonModal>

      {/* Delete Folder Modal */}
      <AlertModals
        message={'Are you sure you want to delete this folder?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={deleteUserFolders}
        loading={loadingDelete}
      />
    </>
  );
};

export default Documents;
