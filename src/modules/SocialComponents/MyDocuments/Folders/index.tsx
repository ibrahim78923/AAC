import React, { createElement, useEffect } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';

import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import {
  AnyRoundIcon,
  FolderBlackIcon,
  FolderIcon,
  SingleUserBlackIcon,
  TeamUserIcon,
  TwoUserBlackIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import { UserRoundImage } from '@/assets/images';

import TanstackTable from '@/components/Table/TanstackTable';
import { dataArray, dataArrayImage, toolTipData } from './Folder.data';
import useFolder from './useFolder';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Folder.style';
import PreviewPdf from './PreviewPdf';
import { FormProvider } from '@/components/ReactHookForm';
import { enqueueSnackbar } from 'notistack';
import { Quick_Links_Routes } from '@/constants';
import { componentMap } from '@/utils/dynamic-forms';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS } from '@/constants/permission-keys';

const Folders = () => {
  const {
    router,
    // isFetchingSubfolders,
    // isLoadingSubfolders,
    dataSubfolders,
    searchValue,
    setSearchValue,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenModal,
    setIsOpenModal,
    theme,
    isOpenFolderDrawer,
    setIsOpenFolderDrawer,
    setIsEditOpenModal,
    isOpenDelete,
    setIsOpenDelete,
    setAnchorEl,
    open,
    openSide,
    handleCloseSide,
    handleClick,
    handleClickSide,
    handleClose,
    anchorEl,
    anchorElSide,
    isLinkOpen,
    setIsLinkOpen,
    isCreateLinkOpen,
    setIsCreateLinkOpen,
    isPdfOpen,
    setIsPdfOpen,
    handlePdfOpen,
    handlePdfClose,
    setAnchorElSide,
    documentSubData,
    parentFolderName,
    parentFolderId,
    modalHeading,
    setModalHeading,
    FolderAdd,
    cardBox,
    setCardBox,
    setSelectedFolder,
    deleteUserFolders,
    isOpenUploadDocModal,
    handleOpenUploadDocModal,
    handleCloseUploadDocModal,
    methodsUploadDocument,
    handleUploadDocumentSubmit,
    getRowValues,
    selectedTableRows,
    deleteUserFiles,
    isOpenFile,
    setIsOpenFile,
    selectedFolder,
    setActionType,
    setSlectedFolderForMovingData,
    selectedFile,
    setSelectedFile,
    onSubmitFile,
    setSelectedTableRows,
    filesData,
    setPageLimit,
    setPage,
    setMoveChildFolder,
    moveChildFolder,
    documentParentsData,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,
  } = useFolder();

  useEffect(() => {
    if (selectedTableRows?.length === 1) {
      setSelectedFile(
        filesData?.data?.files?.find(
          (img: any) => img?._id === selectedTableRows.at(0),
        ),
      );
    }
  }, [selectedTableRows]);

  const filteredData = searchValue
    ? documentSubData?.filter((item: any) => {
        return item?.name?.toLowerCase().includes(searchValue.toLowerCase());
      })
    : documentSubData;
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
                  Action
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
                        setAnchorElSide(null);
                        setIsOpenModal(true);
                        setActionType('create-sub-folder');
                        FolderAdd?.setValue('name', '');
                      }}
                    >
                      Create Sub Folder
                    </MenuItem>
                  </PermissionsGuard>
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
                      setIsOpenFolderDrawer(true);
                    }}
                  >
                    Download
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
                      setIsOpenFolderDrawer(true);
                      setMoveChildFolder(true);
                    }}
                  >
                    Move to Folder
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
                      setModalHeading('Edit Name');
                      setIsOpenModal(true);
                      setActionType('move-folder');
                      FolderAdd?.setValue('name', selectedFolder?.name);
                    }}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
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
                marginY: '10px',
                border: `1px solid ${theme?.palette?.custom?.pale_gray}`,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                background: cardBox?.includes(parentFolderId)
                  ? `${theme?.palette?.grey[400]}`
                  : `${theme?.palette?.common?.white}`,
                borderRadius: '8px',
                padding: '8px',
              }}
              onClick={() => {
                setCardBox([parentFolderId]);

                setSelectedFolder({
                  _id: parentFolderId,
                  name: parentFolderName,
                });
                setSelectedFile(null);
                setSelectedTableRows([]);
              }}
            >
              <FolderBlackIcon />
              <Typography
                variant="h6"
                sx={{ fontWeight: 400, color: `${theme?.palette?.grey[600]}` }}
              >
                {parentFolderName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'start',
                justifyContent: 'space-evenly',
                paddingTop: '10px',
              }}
            >
              {dataSubfolders?.data?.map((item: any) => {
                return (
                  <>
                    <Box
                      onClick={() => {
                        setCardBox([item?._id]);
                        setSelectedFolder(item);
                        setSelectedFile(null);
                        setSelectedTableRows([]);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginY: '4px',
                        cursor: 'pointer',
                        background: cardBox?.includes(item?._id)
                          ? `${theme?.palette?.grey[400]}`
                          : `${theme?.palette?.common?.white}`,
                        borderRadius: '8px',
                        padding: '8px',
                      }}
                      key={uuidv4()}
                    >
                      <FolderBlackIcon />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 400,
                          color: `${theme?.palette?.grey[600]}`,
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </>
                );
              })}
            </Box>
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
                <PermissionsGuard
                  permissions={[
                    SOCIAL_COMPONENTS_DOCUMENTS_VIEW_FOLDER_PERMISSIONS?.CREATE_SUB_FOLDER,
                  ]}
                >
                  <Button
                    variant="outlined"
                    className="small"
                    onClick={() => {
                      setIsOpenModal(true);
                    }}
                    sx={styles?.createFolderButton(theme)}
                  >
                    <AddCircle /> Create Folder
                  </Button>
                </PermissionsGuard>

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
                  size="small"
                  searchBy={searchValue}
                  setSearchBy={(e: string) => {
                    setSearchValue(e);
                  }}
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
                    disabled={selectedTableRows?.length === 0}
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
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsLinkOpen(true);
                      }}
                    >
                      Create Link
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsPdfOpen(true);
                      }}
                    >
                      Preview
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsEditOpenModal(true);
                      }}
                    >
                      Download
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsOpenFolderDrawer(true);
                        setSearchValue('');
                        setSlectedFolderForMovingData(null);
                        setMoveChildFolder(false);
                      }}
                    >
                      Move to Folder
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsOpenFile(true);
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
                      >
                        <RefreshTasksIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Button
                    onClick={() => {
                      setAnchorEl(null);
                      setIsOpenDrawer(true);
                    }}
                    variant="outlined"
                    sx={styles?.fiterButton(theme)}
                    className="small"
                  >
                    <FilterrIcon /> Filters
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable
                  columns={getRowValues}
                  data={filesData?.data?.files ?? []}
                  currentPage={filesData?.data?.meta?.page}
                  count={filesData?.data?.meta?.pages}
                  pageLimit={filesData?.data?.meta?.limit}
                  totalRecords={filesData?.data?.meta?.total}
                  setPage={setPage}
                  setPageLimit={setPageLimit}
                  onPageChange={(page: any) => setPage(page)}
                  isPagination
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            sx={{ width: '260px' }}
            searchBy={searchValue}
            setSearchBy={(e: string) => {
              setSearchValue(e);
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1.5rem',
            }}
          >
            <Button
              variant="outlined"
              className="small"
              sx={styles?.filterUserButton}
            >
              <SingleUserBlackIcon /> Me
            </Button>
            <Button
              variant="outlined"
              className="small"
              sx={styles?.filterUserButton}
            >
              <TwoUserBlackIcon /> My Team
            </Button>
            <Button
              onClick={() => setIsOpenDrawer(true)}
              variant="contained"
              className="small"
              sx={styles?.filterUserAnyButton(theme)}
            >
              <AnyRoundIcon /> Any
            </Button>
          </Box>
          <Box sx={{ paddingTop: '1rem' }}>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
            >
              Teams
            </Typography>
            <Box sx={styles?.teamRow}>
              <TeamUserIcon />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.blue?.dull_blue}`,
                }}
              >
                AirApple Cart team
              </Typography>
            </Box>
            <Box sx={styles?.teamRow}>
              <TeamUserIcon />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue?.main}`,
                }}
              >
                Johan Doe
              </Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: '1rem' }}>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
            >
              Users
            </Typography>
            <Box sx={styles?.teamRow}>
              <Image src={UserRoundImage} alt="No Image" />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: `${theme?.palette?.slateBlue?.main}`,
                    fontWeight: 500,
                  }}
                >
                  AirApple Cart team
                </Typography>
                <Typography
                  variant="body3"
                  sx={{
                    color: `${theme?.palette?.custom?.main}`,
                    fontWeight: 500,
                  }}
                >
                  1 document
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: `${theme?.palette?.slateBlue?.main}`,
              paddingTop: '1rem',
            }}
          >
            Manage Users and Teams
          </Typography>
        </Box>
      </CommonDrawer>
      <CommonDrawer
        isDrawerOpen={isOpenFolderDrawer}
        onClose={() => {
          setIsOpenFolderDrawer(false);
          setSearchValue('');
          setSlectedFolderForMovingData(null);
        }}
        submitHandler={() => onSubmitFile()}
        title="Move to folder"
        okText="ok"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            sx={{ width: '100%' }}
            searchBy={searchValue}
            setSearchBy={(e: string) => {
              setSearchValue(e);
            }}
          />
          {moveChildFolder
            ? documentParentsData?.data?.folders?.map((item: any) => (
                <Box
                  sx={styles?.folderRow(theme, cardBox, item?._id)}
                  onClick={() => {
                    setCardBox([item?._id + 'drawer']);
                    setSlectedFolderForMovingData(item);
                  }}
                  key={uuidv4()}
                >
                  <FolderIcon />
                  <Typography variant="body2">{item?.name}</Typography>
                </Box>
              ))
            : filteredData?.map((item: any) => (
                <Box
                  sx={styles?.folderRow(theme, cardBox, item?._id)}
                  onClick={() => {
                    setCardBox([item?._id + 'drawer']);
                    setSlectedFolderForMovingData(item);
                  }}
                  key={uuidv4()}
                >
                  <FolderIcon />
                  <Typography variant="body2">{item?.name}</Typography>
                </Box>
              ))}
        </Box>
      </CommonDrawer>

      <CommonModal
        open={isOpenModal}
        handleCancel={() => {
          setIsOpenModal(false);
          setActionType('');
          setModalHeading('');
        }}
        handleSubmit={handleCreateFolderSubmit}
        title={modalHeading?.length > 0 ? modalHeading : 'Create Folder'}
        okText={modalHeading === 'Edit Name' ? 'Update' : 'Create Folder'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
      >
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={FolderAdd}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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

      <CommonModal
        open={isLinkOpen}
        handleCancel={() => setIsLinkOpen(false)}
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
          Create a link to share this document with others and track their
          views.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: `${theme?.palette?.grey[600]}`,
            paddingBottom: '0.3rem',
          }}
        >
          Who are you sending this to? *.
        </Typography>
        <TextField type="text" placeholder="Enter Name" fullWidth />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            paddingTop: '10px',
          }}
        >
          <Checkbox />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: `${theme?.palette?.slateBlue?.main}`,
            }}
          >
            Require email address to view document
          </Typography>
          <Tooltip placement="top" arrow title={toolTipData}>
            <InfoIcon
              sx={{ color: `${theme?.palette?.grey[500]}`, fontSize: '14px' }}
            />
          </Tooltip>
        </Box>
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            variant="contained"
            className="small"
            onClick={() => {
              setIsLinkOpen(false);
              setIsCreateLinkOpen(true);
            }}
          >
            Share
          </Button>
        </Box>
      </CommonModal>

      <CommonModal
        open={isCreateLinkOpen}
        handleCancel={() => setIsCreateLinkOpen(false)}
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
              setIsCreateLinkOpen(false);
              enqueueSnackbar('Email sent Successfully', {
                variant: 'success',
              });
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
      />
      <AlertModals
        message={'Are you sure you want to delete this file?'}
        type={'delete'}
        open={isOpenFile}
        handleClose={() => setIsOpenFile(false)}
        handleSubmitBtn={deleteUserFiles}
      />
      <PreviewPdf
        isPdfOpen={isPdfOpen}
        setIsPdfOpen={setIsPdfOpen}
        handlePdfOpen={handlePdfOpen}
        handlePdfClose={handlePdfClose}
        selectedFile={selectedFile}
      />

      <CommonModal
        open={isOpenUploadDocModal}
        handleCancel={handleCloseUploadDocModal}
        handleSubmit={handleUploadDocumentSubmit}
        title={'Upload Documents'}
        okText={'Upload'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
      >
        <FormProvider methods={methodsUploadDocument}>
          <Grid container spacing={4}>
            {dataArrayImage?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
