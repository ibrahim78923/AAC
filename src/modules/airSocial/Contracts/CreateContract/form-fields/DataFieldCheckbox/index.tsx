import React from 'react';
import { RHFRadioGroup } from '@/components/ReactHookForm';
import { Box, Menu, Theme } from '@mui/material';

const styles = {
  label: (theme: Theme) => ({
    fontSize: 11,
    lineHeight: '13px',
    color: theme?.palette?.custom?.light,
    cursor: 'pointer',
  }),
  menu: {
    '& .MuiMenu-paper': {
      '& .MuiList-root': {
        padding: '6px 20px',
        minWidth: '160px',

        '& .MuiFormControlLabel-root': {
          mr: 0,
        },
      },
    },
  },
};

export default function DataFieldCheckbox({ index, data }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={styles.label} onClick={handleClick}>
        Select
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        component={'nav'}
        sx={styles.menu}
      >
        <RHFRadioGroup
          name={`dynamicFields.${index}.${data?.name}`}
          row={false}
          options={data?.options}
          // value={selectedDate}
          // onChange={handleDateChange}
        />
      </Menu>
    </Box>
  );
}
