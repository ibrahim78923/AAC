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
  FilterSharedIcon,
  FolderBlackIcon,
  FolderIcon,
  SingleUserBlackIcon,
  TeamUserIcon,
  TwoUserBlackIcon,
} from '@/assets/icons';
import { UserRoundImage } from '@/assets/images';

import {
  documentTableData,
  folderArr,
} from '@/mock/modules/SocialComponents/Documents';

import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { columns, toolTipData } from './Folder.data';
import useFolder from './useFolder';

import { v4 as uuidv4 } from 'uuid';

import { style } from './Folder.style';

const Folders = (props: any) => {
  const { toggle } = props;
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
    isEditOpenModal,
    setIsEditOpenModal,
    isOpenDelete,
    setIsOpenDelete,
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
  } = useFolder();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        title="Filters"
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
              className="large"
              sx={style.filterUserButton}
            >
              <SingleUserBlackIcon /> Me
            </Button>
            <Button
              variant="outlined"
              className="large"
              sx={style.filterUserButton}
            >
              <TwoUserBlackIcon /> My Team
            </Button>
            <Button
              onClick={() => setIsOpenDrawer(true)}
              variant="contained"
              className="large"
              sx={style.filterUserAnyButton(theme)}
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
            <Box sx={style.teamRow}>
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
            <Box sx={style.teamRow}>
              <TeamUserIcon />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.slateBlue.main}`,
                }}
              >
                Johan Doe
              </Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: '1rem' }}>
            <Typography
              variant="h5"
              sx={{ color: `${theme?.palette?.slateBlue.main}` }}
            >
              Users
            </Typography>
            <Box sx={style.teamRow}>
              <Image src={UserRoundImage} alt="No Image" />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: `${theme?.palette?.slateBlue.main}`,
                    fontWeight: 500,
                  }}
                >
                  AirApple Cart team
                </Typography>
                <Typography
                  variant="body3"
                  sx={{
                    color: `${theme?.palette?.custom.main}`,
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
              color: `${theme?.palette?.slateBlue.main}`,
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
          <Box sx={style.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue.main}`,
              }}
            >
              My PDF
            </Typography>
          </Box>
          <Box sx={style.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue.main}`,
              }}
            >
              Employee CV’s
            </Typography>
          </Box>
          <Box sx={style.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue.main}`,
              }}
            >
              AirApple Cart
            </Typography>
          </Box>
          <Box sx={style.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue.main}`,
              }}
            >
              AirApple Cart document testing
            </Typography>
          </Box>
          <Box sx={style.folderRow}>
            <FolderIcon />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: `${theme?.palette?.slateBlue.main}`,
              }}
            >
              Test
            </Typography>
          </Box>
        </Box>
      </CommonDrawer>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom.pale_gray}`,
              padding: '1rem',
              borderRadius: '8px, 0px, 0px, 8px',
            }}
          >
            <Box sx={{ paddingBottom: '0.5rem' }}>
              <ArrowBackIcon
                onClick={() => toggle()}
                sx={{
                  color: `${theme?.palette?.custom.light}`,
                  fontSize: '30px',
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
              <Box sx={style.actionFilterBox}>
                <Button
                  sx={style.actionButton(theme)}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickSide}
                >
                  Action
                  <ArrowDropDownIcon
                    sx={{ color: `${theme?.palette?.custom.main}` }}
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
                  <MenuItem onClick={() => setIsOpenModal(true)}>
                    Create Folder
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpenFolderDrawer(true)}>
                    Download
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpenFolderDrawer(true)}>
                    Move to Folder
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpenDelete(true)}>
                    Rename
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpenDelete(true)}>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Divider
              sx={{
                marginY: '10px',
                border: `1px solid ${theme?.palette?.custom.pale_gray}`,
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
                Default
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
              {folderArr.map((item) => {
                return (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingY: '10PX',
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
                        {item.name}
                      </Typography>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item lg={9}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom.pale_gray}`,
              borderRadius: '8px, 0px, 0px, 8px',
              padding: '1rem',
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="h5" sx={style.documentTitle(theme)}>
                  Documents
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={style.actionButtonBox}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                  sx={style.createFolderButton(theme)}
                >
                  <AddCircle /> Create Folder
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    // setIsOpenModal(true);
                  }}
                  sx={style.uploadDocumentsButton(theme)}
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
                sx={style.documentTitle(theme)}
              >
                <Search
                  label="Search here"
                  width="100%"
                  searchBy={value}
                  setSearchBy={(e: string) => {
                    setValue(e);
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box sx={style.actionFilterBox}>
                  <Button
                    sx={style.actionButton(theme)}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Action
                    <ArrowDropDownIcon
                      sx={{ color: `${theme?.palette?.custom.main}` }}
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
                    <MenuItem onClick={() => setIsLinkOpen(true)}>
                      Create Link
                    </MenuItem>
                    <MenuItem onClick={() => setIsOpenFolderDrawer(true)}>
                      Preview
                    </MenuItem>
                    <MenuItem onClick={() => setIsEditOpenModal(true)}>
                      Download
                    </MenuItem>
                    <MenuItem onClick={() => setIsOpenFolderDrawer(true)}>
                      Move to Folder
                    </MenuItem>
                    <MenuItem onClick={() => setIsOpenDelete(true)}>
                      Delete
                    </MenuItem>
                  </Menu>
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                    }}
                    variant="outlined"
                    sx={style.fiterButton(theme)}
                  >
                    <FilterSharedIcon /> Any
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable columns={columns} data={documentTableData} />
                <CustomPagination
                  count={1}
                  rowsPerPageOptions={[1, 2]}
                  entriePages={1}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <CommonModal
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Create new folder'}
        okText={'Create Folder'}
        footerFill={undefined}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: `${theme?.palette?.grey[600]}`,
            paddingBottom: '5px',
          }}
        >
          Folder Name
        </Typography>
        <TextField type="text" placeholder="Enter Name" fullWidth />
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            variant="outlined"
            className="large"
            onClick={() => setIsOpenModal(false)}
          >
            Cancel
          </Button>
          <Button variant="contained">Create Folder</Button>
        </Box>
      </CommonModal>
      <CommonModal
        open={isEditOpenModal}
        handleClose={() => setIsEditOpenModal(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Edit Name'}
        okText={'Save'}
        footerFill={undefined}
      >
        <TextField type="text" placeholder="Enter Name" fullWidth />
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            variant="outlined"
            className="large"
            onClick={() => setIsEditOpenModal(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" className="large">
            Save
          </Button>
        </Box>
      </CommonModal>
      <CommonModal
        open={isLinkOpen}
        handleClose={() => setIsLinkOpen(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Create Link'}
        okText={'Share'}
        footerFill={undefined}
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
            sx={{ fontWeight: 400, color: `${theme?.palette?.slateBlue.main}` }}
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
            className="large"
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
        handleClose={() => setIsCreateLinkOpen(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Create Link'}
        okText={'Share'}
        footerFill={undefined}
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
        <TextField type="text" placeholder="Enter Name" fullWidth />

        <Typography> Or </Typography>
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button
            onClick={() => setIsCreateLinkOpen(false)}
            variant="contained"
            className="large"
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
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default Folders;
