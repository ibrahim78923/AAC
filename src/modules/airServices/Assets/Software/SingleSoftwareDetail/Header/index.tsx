import { Button, MenuItem, Menu, Box, Skeleton } from '@mui/material';
import { ActionButtonIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useHeader } from './useHeader';
import { UpsertSoftware } from '../../UpsertSoftware';
import { DeleteSoftware } from '../../DeleteSoftware';
import { ARRAY_INDEX } from '@/constants/strings';

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
    moveBackArrow,
    data,
    isLoading,
    isFetching,
  } = useHeader();

  if (isLoading || isFetching) return <Skeleton height={50} />;

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
          title={data?.data?.[ARRAY_INDEX?.ZERO]?.name}
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
        <DeleteSoftware
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
      {isDrawerOpen && (
        <UpsertSoftware
          isAddDrawerOpen={isDrawerOpen}
          setIsAddDrawerOpen={setIsDrawerOpen}
          data={data?.data?.[ARRAY_INDEX?.ZERO]}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
}
