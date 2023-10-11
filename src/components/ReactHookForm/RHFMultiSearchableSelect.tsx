import React, { useState } from 'react';

import { Box, InputAdornment, TextField, Menu } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import { ArrowDownIcon } from '@/assets/icons';

export default function RHFSearchableSelect({ name, options, ...other }: any) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const handleOptionSelect = (value: string, field: any) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      field.onChange([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((val) => val !== value));
      field.onChange(selectedValues.filter((val) => val !== value));
    }
  };

  const filteredOptions = options.filter((option: any) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={selectedValues}
            onClick={handleClick}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <ArrowDownIcon />
                </InputAdornment>
              ),
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                width: anchorEl ? anchorEl.clientWidth : 'auto',
              },
            }}
          >
            <>
              <TextField
                fullWidth
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ height: '44px', marginBottom: '20px' }}
              />
              {filteredOptions.map((option: any) => (
                <Box
                  key={option.value}
                  onClick={() => {
                    handleOptionSelect(option.value, field);
                  }}
                  sx={{
                    width: '100%',
                    height: '30px',
                    padding: '5px 10px',
                    backgroundColor: selectedValues.includes(option.value)
                      ? '#e0e0e0'
                      : 'transparent',
                  }}
                >
                  {option.label}
                </Box>
              ))}
            </>
          </Menu>
        </>
      )}
    />
  );
}
