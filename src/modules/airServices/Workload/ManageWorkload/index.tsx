import { Box, Button, Chip, Menu, MenuItem, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ManageWorkLoadOptions } from './ManageWorkload.data';
import { v4 as uuidv4 } from 'uuid';

export const ManageWorkload = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  return (
    <Fragment>
      <Button
        variant={'outlined'}
        color={'secondary'}
        aria-controls={open ? 'workload' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        Manage Workload
      </Button>

      <Menu
        id="workload"
        aria-labelledby="workload"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {ManageWorkLoadOptions?.map((item: any) => (
          <MenuItem
            key={uuidv4()}
            onClick={() => item?.handleClick?.()}
            sx={{
              '&.MuiMenuItem-root': {
                marginBottom: { md: 0.5 },
                marginX: { md: 0.5 },
                width: 170,
              },
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
              <Typography variant="body2" fontWeight={500}>
                {item?.title}
              </Typography>
              <Chip label={item?.count} color={'primary'} />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
