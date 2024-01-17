import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { actionsOptions } from './ActionButton.data';

import { AlertModals } from '@/components/AlertModals';

import useAllView from '../useAllView';
import CloneModal from '../CloneModal';
import RenameModal from '../RenameModal';
import ManageSharingModal from '../ManageSharingModal';

import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const ActionButton = () => {
  const {
    isAllViewActionsModal,
    setIsAllViewActionsModal,
    handleClick,
    selectedValue,
    handleSelectedOptionValue,
  } = useAllView();
  const handleCloseModal = (key: any) => {
    setIsAllViewActionsModal({
      ...isAllViewActionsModal,
      [key]: false,
    });
  };
  return (
    <Box>
      <Button
        onClick={handleClick}
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          width: { sm: '112px', xs: '100%' },
        }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleSelectedOptionValue}
      >
        {actionsOptions?.map((option) => {
          return (
            <MenuItem
              key={uuidv4()}
              onClick={() => {
                handleSelectedOptionValue(option);
              }}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>

      {isAllViewActionsModal?.isDelete && (
        <AlertModals
          message="Are you sure you want to delete"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isAllViewActionsModal?.isDelete}
          handleClose={() => handleCloseModal('isDelete')}
          handleSubmit={() => handleCloseModal('isDelete')}
        />
      )}
      {isAllViewActionsModal?.isClone && (
        <CloneModal
          isAllViewActionsModal={isAllViewActionsModal?.isClone}
          handleCloseModal={() =>
            setIsAllViewActionsModal({
              ...isAllViewActionsModal,
              isClone: false,
            })
          }
        />
      )}
      {isAllViewActionsModal?.isRename && (
        <RenameModal
          isAllViewActionsModal={isAllViewActionsModal?.isRename}
          handleCloseModal={() =>
            setIsAllViewActionsModal({
              ...isAllViewActionsModal,
              isRename: false,
            })
          }
        />
      )}
      {isAllViewActionsModal?.isManage && (
        <ManageSharingModal
          isAllViewActionsModal={isAllViewActionsModal?.isManage}
          setIsAllViewActionsModal={setIsAllViewActionsModal}
          handleCloseModal={() =>
            setIsAllViewActionsModal({
              ...isAllViewActionsModal,
              isManage: false,
            })
          }
        />
      )}
    </Box>
  );
};

export default ActionButton;
