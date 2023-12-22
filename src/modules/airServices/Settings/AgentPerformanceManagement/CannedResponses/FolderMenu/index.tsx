import { LockedIcon } from '@/assets/icons';
import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { DeleteFolderModal } from '../DeleteFolderModal';
import { useFolderMenu } from './useFolderMenu';

export const FolderMenu = (props: any) => {
  const {
    response,
    setOpenCreateNewFolderModal,
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
  } = useFolderMenu(props);
  return (
    <>
      <Box display="flex" justifyContent="end">
        <IconButton
          disabled={!response?.isDeletedAble}
          onClick={handleActionClick}
        >
          {!response?.isDeletedAble ? (
            <LockedIcon />
          ) : (
            <MoreHoriz sx={{ color: 'secondary.lighter' }} fontSize="medium" />
          )}
        </IconButton>
        <Menu
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ '& .MuiPaper-root': { boxShadow: 2 } }}
          transformOrigin={{ vertical: 10, horizontal: 80 }}
        >
          <MenuItem
            sx={{ pr: 5 }}
            onClick={() => {
              setOpenCreateNewFolderModal({
                open: true,
                editData: response,
              });
              handleActionClose();
            }}
          >
            Edit
          </MenuItem>
          <DeleteFolderModal
            id={response?._id}
            handleActionClose={handleActionClose}
          />
        </Menu>
      </Box>
    </>
  );
};
