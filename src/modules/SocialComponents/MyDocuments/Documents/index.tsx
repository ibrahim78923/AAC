import React, { createElement } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import {
  AnyRoundIcon,
  FolderIcon,
  SingleUserBlackIcon,
  TeamUserIcon,
  TwoUserBlackIcon,
  FilterrIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import { UserRoundImage } from '@/assets/images';

import useDocuments from './useDocuments';

import { FormProvider } from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';

import { styles } from './Documents.style';
import { dataArray } from './Documents.data';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { SOCIAL_FEATURES } from '@/routesConstants/paths';
import { componentMap } from '@/utils/dynamic-forms';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS } from '@/constants/permission-keys';

const Documents = () => {
  const navigate = useRouter();
  const {
    searchValue,
    setSearchValue,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenModal,
    setIsOpenModal,
    theme,
    isOpenFolderDrawer,
    setIsOpenFolderDrawer,
    setSelectedFolder,
    selectedFolder,
    setActionType,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    handleClick,
    handleClose,
    FolderAdd,
    documentData,
    handleCheckboxChange,
    allSelectedFoldersIds,
    modalHeading,
    setModalHeading,
    deleteUserFolders,
    selectedItemId,
    handleBoxClick,
    MoveToFolder,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,
  } = useDocuments();

  return (
    <>
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
            sx={{ width: '100%' }}
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
              className="medium"
              sx={styles?.filterUserButton}
            >
              <SingleUserBlackIcon /> Me
            </Button>
            <Button
              variant="outlined"
              className="medium"
              sx={styles?.filterUserButton}
            >
              <TwoUserBlackIcon /> My Team
            </Button>
            <Button
              variant="contained"
              className="medium"
              sx={styles?.filterUserAnyButton(theme)}
            >
              <AnyRoundIcon /> Any
            </Button>
          </Box>
          <Box sx={{ paddingTop: '1rem' }}>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              Teams
            </Typography>
            <Box sx={styles?.teamRow}>
              <TeamUserIcon />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.blue.dull_blue}`,
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
        }}
        title="Move to folder"
        okText="Move"
        submitHandler={MoveToFolder}
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            sx={{ width: '100%' }}
            searchBy={searchValue}
            setSearchBy={setSearchValue}
          />
          {documentData?.map((item: any) => {
            return allSelectedFoldersIds?.find(
              (val: any) => val == item?._id,
            ) ? null : (
              <>
                <Box
                  key={item?._id}
                  sx={styles?.folderRow}
                  onClick={() => handleBoxClick(item?._id)}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FolderIcon />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 400,
                        color: `${theme?.palette?.slateBlue?.main}`,
                      }}
                    >
                      {item?.name}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'end' }}>
                    {item?._id === selectedItemId && (
                      <CheckCircleIcon
                        color="primary"
                        sx={{ fontSize: '20px' }}
                      />
                    )}
                  </Box>
                </Box>
              </>
            );
          })}
        </Box>
      </CommonDrawer>
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
                setIsOpenModal(true);
                setActionType('create-sub-folder');
                FolderAdd?.setValue('name', '');
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
              disabled={allSelectedFoldersIds?.length > 0 ? false : true}
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
                <MenuItem onClick={handleClose}>Download</MenuItem>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_DOCUMENTS_PERMISSIONS?.LIST_MOVE_TO_FOLDER,
                ]}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsOpenFolderDrawer(true);
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
                    setModalHeading('Edit Name');
                    setIsOpenModal(true);
                    setActionType('move-folder');
                    FolderAdd?.setValue('name', selectedFolder?.name);
                  }}
                  disabled={allSelectedFoldersIds?.length > 1}
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
                  <Button variant="outlined" color="inherit" className="small">
                    <RefreshTasksIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Button
                onClick={() => {
                  setIsOpenDrawer(true);
                }}
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
          {documentData?.map((item: any) => {
            return (
              <>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <Box
                    sx={{
                      border: `1.16px solid ${theme?.palette?.custom?.pale_gray}`,
                      borderRadius: '11.56px',
                      padding: '0.6rem',
                      '&:hover': {
                        boxShadow: ' 0px 0px 5px 3px #A0E5DB40',
                        border: 'unset',
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
                          checked={allSelectedFoldersIds?.includes(item?._id)}
                          onChange={() => {
                            handleCheckboxChange(item?._id);
                            setSelectedFolder(item);
                          }}
                        />
                      </Box>
                    </Box>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate.push({
                            pathname: SOCIAL_FEATURES?.FOLDER_DETAILS,
                            query: {
                              folder: item?._id,
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
              </>
            );
          })}
        </PermissionsGuard>
      </Grid>
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
      <AlertModals
        message={'Are you sure you want to delete this folder?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={deleteUserFolders}
      />
    </>
  );
};

export default Documents;
