import React, { createElement } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import { FolderBlackIcon, FilterrIcon, RefreshTasksIcon } from '@/assets/icons';

import TanstackTable from '@/components/Table/TanstackTable';
import { uploadDocumentData, filterData } from './Folder.data';
import useFolder from './useFolder';
import { v4 as uuidv4 } from 'uuid';

import { styles } from './Folder.style';
import PreviewPdf from './PreviewPdf';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { DOCUMENTS_TYPE, Quick_Links_Routes } from '@/constants';
import { componentMap } from '@/utils/dynamic-forms';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS } from '@/constants/permission-keys';
import { createFolderData, MODAL_HEADING } from '../Documents/Documents.data';
import NoData from '@/components/NoData';
import RenderFolder from '../components/RenderFolder';
import { downloadFiles } from '@/utils/file';
import { successSnackbar } from '@/lib/snackbar';

const Folders = () => {
  const {
    theme,
    router,
    anchorElSide,
    openSide,
    handleCloseSide,
    handleClickSide,
    orgId,
    orgUsersData,
    orgTeamsData,
    // folderId,
    // parentFolderName,
    singleFolderData,
    fetchingGetFolder,
    loadingGetFolder,
    selectedFolderId,
    selectedFolder,
    handleClickSelectFolder,

    isOpenDelete,
    setIsOpenDelete,
    loadingDelete,
    deleteUserFolders,

    isOpenUploadDocModal,
    handleOpenUploadDocModal,
    handleCloseUploadDocModal,
    loadingUploadDocument,
    handleUploadDocumentSubmit,
    methodsUploadDocument,
    watchVisibleTo,

    setPage,
    setPageLimit,
    getColumns,
    setSearchValue,
    selectedRow,
    selectedRowData,
    getFilesData,
    loadingFiles,
    fetchingFiles,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    modalHeading,
    isOpenCreateFolderModal,
    handleOpenCreateFolderModal,
    handleCloseCreateFolderModal,
    loadingUpdate,
    loadingCreateFolder,
    methodsFolder,
    watchCreateVisibleTo,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,

    anchorEl,
    open,
    handleClick,
    handleClose,

    methodsShareLinkForm,
    isOpenGenerateLinkModal,
    handleOpenCreateLinkModal,
    handleCloseCreateLinkModal,
    handleCreateLinkSubmit,
    loadingShareFile,

    isOpenSendEmailModal,
    setIsOpenSendEmailModal,

    isOpenDeleteFileModal,
    setIsOpenDeleteFileModal,
    loadingDeleteFiles,
    handleDeleteFiles,

    isOpenMoveDocumentDrawer,
    handleOpenMoveDocumentDrawer,
    handleCloseMoveDocumentDrawer,
    fetchingGetMoveFolders,
    loadingGetMoveFolders,
    setSearchMoveFolder,
    moveFoldersData,
    selectedMoveToFolderId,
    handleListItemClick,
    loadingUpdateFile,
    handleSubmitMoveDocument,

    isOpenPreviewModal,
    handleOpenPreviewModal,
    handleClosePreviewModal,
    selectedFilesUrl,
  } = useFolder();

  const uploadDocumentFormFields = uploadDocumentData(
    watchVisibleTo,
    orgUsersData,
    orgId,
    orgTeamsData,
  );

  const createFolderFormData = createFolderData(
    watchCreateVisibleTo,
    orgUsersData,
    orgId,
    modalHeading,
    orgTeamsData,
  );

  const renderFolder = (folder: any) => (
    <>
      <ListItemButton
        selected={selectedFolderId === folder?._id}
        onClick={(event) => handleClickSelectFolder(event, folder)}
        sx={{
          p: '8px 10px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: `${theme?.palette?.grey[100]}`,
          },
          '&.Mui-selected': {
            backgroundColor: `${theme?.palette?.grey[400]}`,
          },
        }}
      >
        <ListItemIcon sx={{ mr: '10px' }}>
          <FolderBlackIcon />
        </ListItemIcon>
        <ListItemText
          primary={folder?.name}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '16px',
              fontWeight: '400',
              color: `${theme?.palette?.grey[600]}`,
            },
          }}
        />
      </ListItemButton>

      {folder?.nestedFolders?.length > 0 && (
        <List component="div" disablePadding sx={{ pl: '16px' }}>
          {folder?.nestedFolders?.map((nestedItem: any) => (
            <React.Fragment key={nestedItem?._id}>
              {renderFolder(nestedItem)}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
              padding: '1rem',
              borderRadius: '8px, 0px, 0px, 8px',
            }}
          >
            <Box sx={{ paddingBottom: '0.5rem' }}>
              <ArrowBackIcon
                onClick={() => {
                  router.push({
                    pathname: Quick_Links_Routes?.DOCUMENT,
                  });
                }}
                sx={{
                  color: `${theme?.palette?.custom?.light}`,
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: `${theme?.palette?.grey[800]}` }}
              >
                Folders
              </Typography>
              <Box sx={styles?.actionFilterBox}>
                <Button
                  sx={styles?.actionButton(theme)}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickSide}
                  className="small"
                >
                  Actions
                  <ArrowDropDownIcon
                    sx={{ color: `${theme?.palette?.custom?.main}` }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorElSide}
                  open={openSide}
                  onClose={handleCloseSide}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <PermissionsGuard
                    permissions={[
                      SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS?.CREATE_SUB_FOLDER,
                    ]}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseSide();
                        handleOpenCreateFolderModal(MODAL_HEADING?.create);
                      }}
                      disabled={selectedFolder?.level === 1}
                    >
                      Create Sub Folder
                    </MenuItem>
                  </PermissionsGuard>
                  <MenuItem
                    onClick={() => {
                      handleCloseSide();
                    }}
                  >
                    Download
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseSide();
                      handleOpenMoveDocumentDrawer(DOCUMENTS_TYPE?.FOLDER);
                    }}
                  >
                    Move to Folder
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseSide();
                      handleOpenCreateFolderModal(MODAL_HEADING?.update);
                    }}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseSide();
                      setIsOpenDelete(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Divider
              sx={{
                marginY: '18px',
                borderColor: theme?.palette?.custom?.pale_gray,
              }}
            />
            {loadingGetFolder || fetchingGetFolder ? (
              Array(6)
                .fill(null)
                .map(() => (
                  <Box sx={{ mt: '12px' }} key={uuidv4()}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={'100%'}
                      height={40}
                      sx={styles?.skeleton}
                    />
                  </Box>
                ))
            ) : (
              <List component="nav" sx={{ padding: '0' }}>
                <ListItemButton
                  selected={selectedFolderId === singleFolderData?._id}
                  onClick={(event) =>
                    handleClickSelectFolder(event, singleFolderData)
                  }
                  sx={{
                    p: '8px 10px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: `${theme?.palette?.grey[100]}`,
                    },
                    '&.Mui-selected': {
                      backgroundColor: `${theme?.palette?.grey[400]}`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ mr: '10px' }}>
                    <FolderBlackIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={singleFolderData?.name}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '16px',
                        fontWeight: '400',
                        color: `${theme?.palette?.grey[600]}`,
                      },
                    }}
                  />
                </ListItemButton>
                <List component="nav" sx={{ pl: '16px' }}>
                  {singleFolderData?.nestedFolders?.map((item: any) => (
                    <React.Fragment key={item?._id}>
                      {renderFolder(item)}
                    </React.Fragment>
                  ))}
                </List>
              </List>
            )}
          </Box>
        </Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
              borderRadius: '8px, 0px, 0px, 8px',
              padding: '1rem',
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="h5" sx={styles?.documentTitle(theme)}>
                  Documents
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={styles?.actionButtonBox}
              >
                {/* <PermissionsGuard
                  permissions={[
                    SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS?.CREATE_SUB_FOLDER,
                  ]}
                >
                  <Button
                    variant="outlined"
                    className="small"
                    onClick={() =>
                      handleOpenCreateFolderModal(MODAL_HEADING?.create)
                    }
                    sx={styles?.createFolderButton(theme)}
                  >
                    <AddCircle /> Create Folder
                  </Button>
                </PermissionsGuard> */}

                <PermissionsGuard
                  permissions={[
                    SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS?.UPLOAD_DOCUMENT,
                  ]}
                >
                  <Button
                    variant="contained"
                    className="small"
                    onClick={handleOpenUploadDocModal}
                    sx={styles?.uploadDocumentsButton(theme)}
                  >
                    Upload Documents
                  </Button>
                </PermissionsGuard>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles?.filterBar}>
                  <Box sx={styles?.searchBar}>
                    <Search
                      label="Search here"
                      width="100%"
                      size="small"
                      setSearchBy={(e: string) => {
                        setSearchValue(e);
                      }}
                    />
                  </Box>

                  <Box sx={styles?.actionFilterBox}>
                    <Button
                      sx={styles?.actionButton(theme)}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className="small"
                      disabled={selectedRow?.length === 0}
                    >
                      Actions
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
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleOpenCreateLinkModal();
                        }}
                        disabled={selectedRow?.length > 1}
                      >
                        Create Link
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleOpenPreviewModal();
                        }}
                        disabled={selectedRow?.length > 1}
                      >
                        Preview
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          downloadFiles(selectedFilesUrl);
                        }}
                      >
                        Download
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleOpenMoveDocumentDrawer(DOCUMENTS_TYPE?.FILE);
                        }}
                        disabled={selectedRow?.length > 1}
                      >
                        Move to Folder
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setIsOpenDeleteFileModal(true);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
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
                      <FilterrIcon /> Filters
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable
                  columns={getColumns}
                  data={getFilesData?.data?.files}
                  currentPage={getFilesData?.data?.meta?.page}
                  count={getFilesData?.data?.meta?.pages}
                  pageLimit={getFilesData?.data?.meta?.limit}
                  totalRecords={getFilesData?.data?.meta?.total}
                  setPage={setPage}
                  setPageLimit={setPageLimit}
                  onPageChange={(page: any) => setPage(page)}
                  isLoading={loadingFiles || fetchingFiles}
                  isPagination
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Filters */}
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

      {/* Move to Folder */}
      <CommonDrawer
        isDrawerOpen={isOpenMoveDocumentDrawer}
        onClose={handleCloseMoveDocumentDrawer}
        submitHandler={handleSubmitMoveDocument}
        title="Move to folder"
        okText="ok"
        isOk={true}
        footer={true}
        isLoading={loadingUpdateFile || loadingUpdate}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            setSearchBy={setSearchMoveFolder}
            size="small"
            sx={{ width: '100%' }}
          />
          <List component="nav" sx={{ padding: '12px 0' }}>
            {fetchingGetMoveFolders || loadingGetMoveFolders ? (
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

      {/* Create/Update Folder */}
      <CommonModal
        open={isOpenCreateFolderModal}
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

      {/* Create Link Modal */}
      <CommonModal
        open={isOpenGenerateLinkModal}
        handleCancel={handleCloseCreateLinkModal}
        handleSubmit={handleCreateLinkSubmit}
        title={'Create Link'}
        okText={'Share'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
        isLoading={loadingShareFile}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: `${theme?.palette?.grey[600]}`,
            paddingBottom: '0.5rem',
          }}
        >
          Create a link to share this document with others and track their
          views.
        </Typography>

        <FormProvider methods={methodsShareLinkForm}>
          <Grid container mt={2}>
            <Grid item xs={12}>
              <RHFTextField
                name={'recipients'}
                label={'Who are you sending this to?'}
                placeholder={'Enter recipient email address'}
                required
                size={'small'}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </CommonModal>

      {/* Send Email Modal */}
      <CommonModal
        open={isOpenSendEmailModal}
        handleCancel={() => setIsOpenSendEmailModal(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Create Link'}
        okText={'Share'}
        cancelText="Cancel"
        footerFill={false}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: `${theme?.palette?.grey[600]}`,
            paddingBottom: '0.5rem',
          }}
        >
          You have created a link for adnanlatif2000@gmail.com. You can view
          document using this link.
        </Typography>
        <TextField
          type="text"
          placeholder="https://eu1.hubs.ly/H0361Lq0"
          fullWidth
        />

        <Typography
          variant="body2"
          sx={{
            color: `${theme?.palette?.slateBlue?.main}`,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          OR
        </Typography>
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            onClick={() => {
              setIsOpenSendEmailModal(false);
              successSnackbar('Email sent Successfully');
            }}
            variant="contained"
            className="small"
          >
            Send Via Email
          </Button>
        </Box>
      </CommonModal>

      <AlertModals
        message={'Are you sure you want to delete this folder?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={deleteUserFolders}
        loading={loadingDelete}
      />

      <AlertModals
        message={'Are you sure you want to delete this file?'}
        type={'delete'}
        open={isOpenDeleteFileModal}
        handleClose={() => setIsOpenDeleteFileModal(false)}
        handleSubmitBtn={handleDeleteFiles}
        loading={loadingDeleteFiles}
      />

      <PreviewPdf
        isPdfOpen={isOpenPreviewModal}
        handlePdfClose={handleClosePreviewModal}
        selectedFile={selectedRowData}
      />

      {/* Upload Documents */}
      <CommonModal
        open={isOpenUploadDocModal}
        handleCancel={handleCloseUploadDocModal}
        handleSubmit={handleUploadDocumentSubmit}
        title={'Upload Documents'}
        okText={'Upload'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
        isLoading={loadingUploadDocument}
      >
        <FormProvider methods={methodsUploadDocument}>
          <Grid container spacing={4}>
            {uploadDocumentFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                ></item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonModal>
    </>
  );
};

export default Folders;
