import React, { useEffect } from 'react';
import { RHFRadioGroup } from '@/components/ReactHookForm';
import { Box, Menu, Theme } from '@mui/material';
import { isNullOrEmpty } from '@/utils';

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

export default function DataFieldCheckbox({
  index,
  data,
  handleUpdateDynamicField,
}: any) {
  const [selectedValue, setSelectedValue] = React.useState(
    data?.[data?.name] || 'Select value',
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isNullOrEmpty(selectedValue) && selectedValue !== data?.[data?.name]) {
      handleUpdateDynamicField(index, {
        value: selectedValue,
      });
    }
  }, [selectedValue]);

  return (
    <Box>
      <Box sx={styles.label} onClick={handleClick}>
        {selectedValue ?? 'Select value'}
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
          onChange={(e) => {
            setSelectedValue(e?.target?.value);
            setAnchorEl(null);
          }}
          // value={selectedDate}
          // onChange={handleDateChange}
        />
      </Menu>
    </Box>
  );
}
