import React, { useState } from 'react';

import Image from 'next/image';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Checkbox,
  Typography,
} from '@mui/material';
import Search from '../Search';

import { ArrowDownIcon } from '@/assets/icons';

import { useFormContext, Controller } from 'react-hook-form';

export default function RHFMultiSearchableSelect({
  name,
  options,
  isCheckBox,
  ...other
}: any) {
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

  const filteredOptions = options?.filter((option: any) =>
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
                padding: '10px',
              },
            }}
          >
            <>
              <Search
                searchBy={searchTerm}
                setSearchBy={setSearchTerm}
                label="Search By Name"
                fullWidth
                size="small"
                sx={{ marginBottom: '15px' }}
              />
              {filteredOptions.map((option: any) => (
                <Box
                  key={option.value}
                  onClick={() => {
                    {
                      isCheckBox
                        ? null
                        : handleOptionSelect(option.value, field);
                    }
                  }}
                  sx={{
                    width: '100%',
                    height: '30px',
                    padding: '5px 10px',
                    display: 'flex',
                    marginBottom: '10px',
                    gap: '5px',
                    backgroundColor: isCheckBox
                      ? 'transparent'
                      : selectedValues.includes(option.value)
                      ? '#e0e0e0'
                      : 'transparent',
                  }}
                >
                  {option.image && (
                    <Image
                      width={24}
                      height={24}
                      alt="user"
                      src={option.image}
                    />
                  )}
                  {isCheckBox && (
                    <Checkbox
                      onClick={() => {
                        handleOptionSelect(option.value, field);
                      }}
                      checked={
                        selectedValues.includes(option.value) ? true : false
                      }
                    />
                  )}
                  <Typography variant="body2">{option.label}</Typography>
                </Box>
              ))}
            </>
          </Menu>
        </>
      )}
    />
  );
}
