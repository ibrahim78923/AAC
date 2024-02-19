import { Typography, Button, MenuItem, Menu, Box } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHeader } from './useHeader';
import React from 'react';
import { AlertModals } from '@/components/AlertModals';
import { UpsertSoftware } from '../../UpsertSoftware';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export default function Header() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleClick,
    handleClose,
    open,
    anchorEl,
    deleteSoftware,
    isLoading,
  } = useHeader();
  const router = useRouter();

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
          <ArrowBackIcon
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.ASSETS_SOFTWARE,
              })
            }
          />
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
          loading={isLoading}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={deleteSoftware}
          message="Are you sure  want to delete this Software ?"
        />
      )}
      <UpsertSoftware isDrawerOpen={isDrawerOpen} onClose={setIsDrawerOpen} />
    </>
  );
}
