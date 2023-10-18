import React from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Search from '@/components/Search';
import CommonModal from '@/components/CommonModal';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import {
  AnyRoundIcon,
  FilterSharedIcon,
  FolderIcon,
  SingleUserBlackIcon,
  TeamUserIcon,
  TwoUserBlackIcon,
} from '@/assets/icons';
import { UserRoundImage } from '@/assets/images';

import useMyDocuments from './useMyDocuments';

import { documentFolderArr } from '@/mock/modules/SocialComponents/Documents';

import { style } from './MyDocuments.style';

const MyDocuments = () => {
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
    anchorEl,
    open,
    handleClick,
    handleClose,
  } = useMyDocuments();

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
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Typography variant="h5" sx={style.documentTitle(theme)}>
            Documents
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12} sx={style.actionButtonBox}>
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpenModal(true);
            }}
            sx={style.createFolderButton(theme)}
          >
            <AddCircle /> Create Folder
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12} sx={style.documentTitle(theme)}>
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
              <MenuItem onClick={handleClose}>Download</MenuItem>
              <MenuItem onClick={() => setIsOpenFolderDrawer(true)}>
                Move To Folder
              </MenuItem>
              <MenuItem onClick={() => setIsEditOpenModal(true)}>
                Rename
              </MenuItem>
              <MenuItem onClick={() => setIsOpenDelete(true)}>Delete</MenuItem>
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
        {documentFolderArr?.map((item: any) => {
          return (
            <>
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    border: `1.16px solid ${theme?.palette?.custom.pale_gray}`,
                    borderRadius: '11.56px',
                    padding: '0.6rem',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={style.folderBackground(theme)}>
                      <FolderIcon />
                    </Box>
                    <Box>
                      <Checkbox />
                    </Box>
                  </Box>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: `${theme?.palette?.grey[600]}`,
                      }}
                    >
                      {item.folderName}
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
                        sx={{
                          color: `${theme?.palette?.custom.main}`,
                          fontWeight: 500,
                        }}
                      >
                        {item.createdBy}
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
                        sx={{
                          color: `${theme?.palette?.custom.main}`,
                          fontWeight: 500,
                        }}
                      >
                        {item.createdAt}
                      </Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </>
          );
        })}
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
            color: `${theme?.palette?.grey[400]}`,
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

export default MyDocuments;
