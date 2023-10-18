import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Typography,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { ArrowDownIcon } from '@/assets/icons';

export default function UserSearchableSelect({
  name,
  options,
  placeholder,
  label,
  showAsterisk = false,
  ...other
}) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const filteredOptions = options.filter(
    (option) =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (option.des &&
        option.des.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: 'column',
            }}
          >
            {label}
            {showAsterisk && (
              <Typography style={{ color: 'red' }}>*</Typography>
            )}
            <TextField
              sx={{ mt: 2 }}
              {...field}
              fullWidth
              error={!!error}
              helperText={error?.message}
              placeholder={placeholder}
              {...other}
              value={selectedValue ? selectedValue : ' '}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <ArrowDownIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  placeholder={placeholder || 'Search...'}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ height: '44px', marginBottom: '20px' }}
                />
                {filteredOptions.map((option, index) => (
                  <Box
                    key={option.value}
                    onClick={() => {
                      handleClose();
                      field.onChange(option.value);
                      setSelectedValue(option.title);
                    }}
                    sx={{
                      width: '100%',
                      height: '30px',
                      padding: '5px 10px',
                      mt: index === 0 ? '2px' : '32px',
                    }}
                  >
                    <Typography
                      component="div"
                      variant="subtitle1"
                      sx={{
                        color: '#4B5563',
                        fontSize: '14px',
                        fontWeight: 700,
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      component="div"
                      variant="body1"
                      sx={{
                        color: '#4B5563',
                        fontWeight: 500,
                      }}
                    >
                      {option.des}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          </Menu>
        </>
      )}
    />
  );
}
