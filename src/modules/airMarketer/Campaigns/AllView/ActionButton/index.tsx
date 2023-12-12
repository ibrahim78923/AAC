import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { actionsOptions } from './ActionButton.data';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useAllView from '../useAllView';
import CloneModal from '../CloneModal';
import RenameModal from '../RenameModal';
import ManageSharingModal from '../ManageSharingModal';

const ActionButton = () => {
  const {
    isAllViewActionsModal,
    setIsAllViewActionsModal,
    handleClick,
    selectedValue,
    handleSelectedOptionValue,
  } = useAllView();

  return (
    <Box>
      <Button
        onClick={handleClick}
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          width: '112px',
          height: '36px',
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
          message="Are you sure you want to delete this broadcast?"
          type="Delete SMS Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={isAllViewActionsModal?.isDelete}
          handleClose={() =>
            setIsAllViewActionsModal({
              ...isAllViewActionsModal,
              isClone: false,
            })
          }
          handleSubmit={() =>
            setIsAllViewActionsModal({
              ...isAllViewActionsModal,
              isClone: false,
            })
          }
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
