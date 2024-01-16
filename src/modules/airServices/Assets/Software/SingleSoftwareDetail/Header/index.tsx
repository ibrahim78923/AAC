import { Button, MenuItem, Menu, Box } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';
import { UpsertSoftware } from '../../UpsertSoftware';
import { PageTitledHeader } from '@/components/PageTitledHeader';

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
    methods,
    submitForm,
    handleCloseDrawer,
    handleMoveBack,
  } = useHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PageTitledHeader
          title="Software"
          canMovedBack
          moveBack={handleMoveBack}
        />
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
          handleSubmitBtn={() => {
            setDeleteModalOpen(false);
            enqueueSnackbar('Software deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to delete this Software ?"
        />
      )}
      <UpsertSoftware
        isDrawerOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        submitForm={submitForm}
        methods={methods}
        title="Edit Software"
      />
    </>
  );
}
