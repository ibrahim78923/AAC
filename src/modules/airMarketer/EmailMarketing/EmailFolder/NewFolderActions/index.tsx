import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { actionsOptions } from './NewFolderActions.data';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useNewFolderActions from './useNewFolderActions';

const NewFolderActions = () => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
  } = useNewFolderActions();

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

      {actionsModalDetails?.isDelete && (
        <AlertModals
          message="Are you sure you want to delete this folder  ?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={actionsModalDetails?.isDelete}
          handleClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isDelete: false,
            })
          }
          handleSubmit={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isDelete: false,
            })
          }
        />
      )}
      {actionsModalDetails?.isDuplicate && (
        <AlertModals
          message="Are you sure you want to duplicate this folder ?"
          type="Information"
          typeImage={<AlertModalDeleteIcon />}
          open={actionsModalDetails?.isDuplicate}
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
    </Box>
  );
};

export default NewFolderActions;
