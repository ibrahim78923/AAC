import React from 'react';

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

import { documentTableData } from '@/mock/modules/SocialComponents/Documents';

import TanstackTable from '@/components/Table/TanstackTable';
import { columns, dataArray, toolTipData } from './Folder.data';
import useFolder from './useFolder';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './Folder.style';
import PreviewPdf from './PreviewPdf';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { enqueueSnackbar } from 'notistack';

const Folders = () => {
  const navigate = useRouter();
  const {
    value,
    setValue,
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
    modalHeading,
    setModalHeading,
    onSubmit,
    FolderAdd,
    cardBox,
    setCardBox,
    deleteUserFolders,
    setIsImage,
    isImage,
  } = useFolder();

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
            sx={{ width: '260px' }}
            searchBy={value}
            setSearchBy={(e: string) => {
              setValue(e);
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
        }}
        title="Move to folder"
        okText="ok"
        isOk={true}
        footer={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <Search
            label="Search here"
            sx={{ width: '100%' }}
            searchBy={value}
            setSearchBy={(e: string) => {
              setValue(e);
            }}
          />
          <Box sx={styles?.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              My PDF
            </Typography>
          </Box>
          <Box sx={styles?.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              Employee CV’s
            </Typography>
          </Box>
          <Box sx={styles?.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              AirApple Cart
            </Typography>
          </Box>
          <Box sx={styles?.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              AirApple Cart document testing
            </Typography>
          </Box>
          <Box sx={styles?.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              Test
            </Typography>
          </Box>
        </Box>
      </CommonDrawer>
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
                  navigate.push({
                    pathname: AIR_MARKETER?.COMMON_DOCUMENTS,
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
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
                      setIsOpenModal(true);
                    }}
                  >
                    Create Sub Folder
                  </MenuItem>
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
                    }}
                  >
                    Move to Folder
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElSide(null);
                      setModalHeading('Edit Name');
                      setIsOpenModal(true);
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
                background: `${theme?.palette?.grey[400]}`,
                borderRadius: '8px',
                padding: '8px',
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
              {documentSubData?.map((item: any) => {
                return (
                  <>
                    <Box
                      onClick={() => {
                        setCardBox(item?._id);
                        setIsEditOpenModal(item);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginY: '4px',
                        cursor: 'pointer',
                        background:
                          item?._id === cardBox
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
                <Button
                  variant="contained"
                  className="small"
                  onClick={() => {
                    setIsImage(true);
                  }}
                  sx={styles?.uploadDocumentsButton(theme)}
                >
                  Upload Documents
                </Button>
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
                  searchBy={value}
                  setSearchBy={(e: string) => {
                    setValue(e);
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
                      }}
                    >
                      Move to Folder
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setIsOpenDelete(true);
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
                    <FilterrIcon /> Any
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable
                  columns={columns}
                  data={documentTableData}
                  isPagination
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <CommonModal
        open={isOpenModal}
        handleCancel={() => setIsOpenModal(false)}
        handleSubmit={() => onSubmit()}
        title={`${modalHeading}`}
        okText={modalHeading === 'Edit Name' ? 'Update' : 'Create Folder'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
      >
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
          </Grid>
        </FormProvider>
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
      <PreviewPdf
        isPdfOpen={isPdfOpen}
        setIsPdfOpen={setIsPdfOpen}
        handlePdfOpen={handlePdfOpen}
        handlePdfClose={handlePdfClose}
      />
      <CommonModal
        open={isImage}
        handleCancel={() => setIsImage(false)}
        handleSubmit={() => {
          setIsImage(false);
          enqueueSnackbar('Document Upload Successfully', {
            variant: 'success',
          });
        }}
        title={'Upload Documents'}
        okText={'Upload'}
        cancelText="Cancel"
        footerFill={false}
        footer={true}
      >
        <FormProvider methods={FolderAdd}>
          <RHFDropZone name="logoUrl" />
        </FormProvider>
      </CommonModal>
    </>
  );
};

export default Folders;
