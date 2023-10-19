import { Grid, Typography, Button, MenuItem, Menu } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import { headerStyle } from './Header.styles';
import { ActionButtonIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import React from 'react';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';

import Link from 'next/link';
export default function Header() {
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
  } = useHeader();
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
            MicroSoft Office License
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          {deleteModalOpen && (
            <AlertModals
              type="delete"
              open={deleteModalOpen}
              handleClose={() => setDeleteModalOpen(false)}
              handleSubmit={() => {
                setDeleteModalOpen(false);
                enqueueSnackbar('Contract deleted Successfully', {
                  variant: 'success',
                });
              }}
              message="Are you sure  want to delete this Contract ?"
            />
          )}
          {terminateModalOpen && (
            <AlertModals
              type="delete"
              open={terminateModalOpen}
              handleClose={() => setTerminateModalOpen(false)}
              handleSubmit={() => {
                setTerminateModalOpen(false);
                enqueueSnackbar('Contract Terminate Successfully', {
                  variant: 'success',
                });
              }}
              message="Are you sure  want to Terminate this Contract ?"
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
            <Link href="/air-services/assets/contracts/editContracts">
              <MenuItem>Edit</MenuItem>
            </Link>

            <MenuItem
              onClick={() => {
                setDeleteModalOpen(true), handleClose();
              }}
            >
              delete
            </MenuItem>
            <Link href="/air-services/assets/contracts/renewContracts">
              <MenuItem>Renew</MenuItem>
            </Link>
            <Link href="/air-services/assets/contracts/extendContracts">
              <MenuItem>Extend</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                setTerminateModalOpen(true), handleClose();
              }}
            >
              Terminate
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}
