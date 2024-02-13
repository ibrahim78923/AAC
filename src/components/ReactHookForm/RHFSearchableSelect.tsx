import React, { useState } from 'react';

import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  useTheme,
  Typography,
} from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import { ArrowDownIcon } from '@/assets/icons';
import Search from '../Search';

export default function RHFSearchableSelect({
  name,
  options,
  isFooter,
  footerText,
  footerActionHandler,
  label,
  ...other
}: any) {
  const theme = useTheme();
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const filteredOptions = options?.filter(
    (option: any) =>
      option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ marginBottom: '6px' }}
          >
            {label}
          </Typography>
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={selectedValue ? selectedValue : ' '}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            placeholder="sss"
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
              {filteredOptions?.map((option: any) => (
                <Box
                  key={option?.value}
                  onClick={() => {
                    handleClose(),
                      field.onChange(option?.value),
                      setSelectedValue(option?.label);
                  }}
                  sx={{
                    width: '100%',
                    height: '30px',
                    padding: '5px 10px',
                    display: 'flex',
                    marginBottom: '10px',
                    gap: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: selectedValue?.includes(option?.value)
                      ? '#e0e0e0'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                  }}
                >
                  {option.label}
                </Box>
              ))}
              {isFooter && (
                <Box
                  color={theme?.palette?.primary?.main}
                  sx={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={footerActionHandler}
                >
                  <Typography variant="body1" fontWeight={500}>
                    {footerText}
                  </Typography>
                </Box>
              )}
            </>
          </Menu>
        </>
      )}
    />
  );
}
