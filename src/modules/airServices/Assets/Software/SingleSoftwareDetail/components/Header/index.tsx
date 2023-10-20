import { Grid, Typography, Button, MenuItem, Menu } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import { headerStyle } from './Header.styles';
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
      <Grid
        container
        spacing={2}
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        maxWidth={'100%'}
      >
        <Grid
          item
          sx={{
            display: 'flex',
          }}
        >
          <ViewDetailBackArrowIcon />
          <Typography variant="h5" component="span">
            Software
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <SoftwareEdit
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
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
          <Button
            sx={headerStyle?.actionBtn}
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
              delete
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}
