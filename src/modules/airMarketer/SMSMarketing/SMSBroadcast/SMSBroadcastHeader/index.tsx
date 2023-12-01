import {
  Box,
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

import Search from '@/components/Search';

import { AlertModals } from '@/components/AlertModals';

import useSMSBroadcast from '../useSMSBroadcast';

import { ArrowDropDown } from '@mui/icons-material';

import {
  AlertModalDeleteIcon,
  ArrowSquareLeft,
  ArrowSquareRight,
  PrimaryCalendarIcon,
} from '@/assets/icons';

import dayjs from 'dayjs';

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
    isDatePicker,
    setIsDatePicker,
  } = useSMSBroadcast();

  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: 'space-between', my: 1, alignItems: 'center' }}
    >
      <Grid item xs={12} lg={6}>
        <Stack direction="row" gap={1}>
          <PrimaryCalendarIcon />
          {`${dayjs().format('MMMM DD')} - ${dayjs().format('MMMM DD')}`}
          <Stack
            sx={{ cursor: 'pointer' }}
            direction="row"
            onClick={() => {
              setIsDatePicker(!isDatePicker);
            }}
          >
            <ArrowSquareLeft />
            <ArrowSquareRight />
          </Stack>
        </Stack>
        {isDatePicker && <Box>Date Picker</Box>}
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'right',
          alignItems: 'right',
          display: 'flex',
          gap: '10px',
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
