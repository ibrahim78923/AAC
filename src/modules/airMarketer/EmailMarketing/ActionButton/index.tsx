import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { actionsOptions } from './ActionButton.data';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useEmailMarketing from '../useEmailMarketing';

const ActionButton = () => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
    isDelete,
    setIsDelete,
  } = useEmailMarketing();

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

      {isDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete SMS Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() => setIsDelete(false)}
          handleSubmit={() => setIsDelete(false)}
        />
      )}
      {actionsModalDetails?.isDuplicate && (
        <AlertModals
          message="Are you sure you want to duplicate this item?"
          type="Information"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isDuplicate: false,
            })
          }
          handleSubmit={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isDuplicate: false,
            })
          }
        />
      )}
      {actionsModalDetails?.isArchive && (
        <AlertModals
          message="Are you sure you want to archive this item?"
          type="Information"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isArchive: false,
            })
          }
          handleSubmit={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isArchive: false,
            })
          }
        />
      )}
    </Box>
  );
};

export default ActionButton;
