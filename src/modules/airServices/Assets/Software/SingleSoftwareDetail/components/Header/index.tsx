import { Typography, Button, MenuItem, Menu, Box } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import { ActionButtonIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import React from 'react';
import { SoftwareEdit } from './SoftwareEdit/SoftwareEdit';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';

export default function Header() {
  const { isDrawerOpen, setIsDrawerOpen, deleteModalOpen, setDeleteModalOpen } =
    useHeader();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ViewDetailBackArrowIcon />
          <Typography variant="h5" component="span">
            Software
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<ActionButtonIcon />}
            onClick={handleClick}
          >
            Action
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
                setIsDrawerOpen(true), handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteModalOpen(true), handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {deleteModalOpen && (
        <AlertModals
          type="delete"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmit={() => {
            setDeleteModalOpen(false);
            enqueueSnackbar('Software deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to delete this Software ?"
        />
      )}
      <SoftwareEdit
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
}
