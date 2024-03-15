import { Button, MenuItem, Menu, Box, Skeleton } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AlertModals } from '@/components/AlertModals';
import { useHeader } from './useHeader';
import { UpsertSoftware } from '../../UpsertSoftware';

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
    moveBackArrow,
    submitHandler,
    userQuery,
    onClose,
    methods,
    editLoading,
    softwareFetching,
    softwareLoading,
    softwareData,
  } = useHeader();
  if (softwareFetching || softwareLoading) return <Skeleton height={50} />;
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
          canMovedBack
          moveBack={moveBackArrow}
          title={softwareData?.name}
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
          loading={isLoading}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={deleteSoftware}
          message="Are you sure  want to delete this Software ?"
        />
      )}
      {isDrawerOpen && (
        <UpsertSoftware
          isDrawerOpen={isDrawerOpen}
          onClose={onClose}
          methods={methods}
          submitHandler={submitHandler}
          isLoading={editLoading}
          userQuery={userQuery}
          title="Edit Software"
          okText="Update"
        />
      )}
    </>
  );
}
