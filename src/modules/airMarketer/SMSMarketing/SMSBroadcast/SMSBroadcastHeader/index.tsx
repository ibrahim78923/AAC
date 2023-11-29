import {
  Box,
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';

import Search from '@/components/Search';

import { AlertModals } from '@/components/AlertModals';

import useSMSBroadcast from '../useSMSBroadcast';

import { ArrowDropDown } from '@mui/icons-material';

import { AlertModalDeleteIcon } from '@/assets/icons';

const SMSBroadcastHeader = (props: any) => {
  const {
    theme,
    handleClick,
    handleClose,
    selectedValue,
    isDelete,
    setIsDelete,
    handleDelete,
    handleEdit,
  } = useSMSBroadcast();

  return (
    <Grid container sx={{ justifyContent: 'space-between', my: 1 }}>
      <Grid item lg={6}>
        {/* date calander here */}
      </Grid>
      <Grid
        item
        lg={6}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          gap: '10px',
          alignItems: 'right',
        }}
      >
        <Search size="small" placeholder="Search Here" />

        <FormControl size="small">
          <Select
            sx={{ height: '36px' }}
            defaultValue={'status'}
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={'status'} disabled>
              Status
            </MenuItem>
            <MenuItem value={'completed'}>Completed</MenuItem>
            <MenuItem value={'scheduled'}>Scheduled</MenuItem>
            <MenuItem value={'draft'}>Draft</MenuItem>
            <MenuItem value={'processing'}>Processing</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Button
            className="small"
            disabled={props?.selectedId ? false : true}
            onClick={handleClick}
            // disabled={checkedRows === undefined ? true : false}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              width: '112px',
              height: '40px',
            }}
          >
            Actions
            <ArrowDropDown />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={selectedValue}
            open={Boolean(selectedValue)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      </Grid>
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
    </Grid>
  );
};

export default SMSBroadcastHeader;
