import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Popover,
} from '@mui/material';

import usePostBox from '../usePostBox';
import { customizeData } from './Cutomize.data';

import { SettingsIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const Customize = () => {
  const { open, handleClose, handleClick, anchorEl } = usePostBox();

  return (
    <div>
      <Button
        sx={{ gap: 1, height: '30px' }}
        variant="outlined"
        onClick={handleClick}
        startIcon={<SettingsIcon />}
      >
        Customize
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {customizeData?.map((data) => (
          <Box sx={{ ml: 1 }} key={uuidv4()}>
            <FormControlLabel control={<Checkbox />} label={data?.label} />
          </Box>
        ))}
      </Popover>
    </div>
  );
};

export default Customize;
