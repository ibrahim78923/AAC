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
import { v4 as uuidv4 } from 'uuid';

export default function UsersSearchableSelect({
  name,
  options,
  placeholder,
  label,
  showAsterisk = false,
  showSearchBar = false,
  showDescription = true,
  ...other
}) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const filteredOptions = options.filter((option: any) => {
    const isTitleMatch = option.title
      ? option.title.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    const isDescriptionMatch =
      showDescription && option.des
        ? option.des.toLowerCase().includes(searchTerm.toLowerCase())
        : false;

    return isTitleMatch || isDescriptionMatch;
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Box sx={{ width: { sm: '484px', xs: '100%' } }}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
              <Typography>
                {label}
                {showAsterisk && (
                  <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                )}
              </Typography>
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
                  padding: '8px',
                  paddingBottom: '54px',
                },
              }}
            >
              <>
                <Box>
                  {showSearchBar && (
                    <TextField
                      fullWidth
                      placeholder={placeholder || 'Search...'}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ height: '44px', mb: '40px' }}
                    />
                  )}
                  {filteredOptions.map((option, index) => (
                    <Box
                      key={uuidv4()}
                      onClick={() => {
                        handleClose();
                        field.onChange(option.value);
                        setSelectedValue(option.title);
                      }}
                      sx={{
                        width: '100%',
                        height: '30px',
                        padding: '5px 10px',
                        mt: index === 0 ? '2px' : '42px',
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
                      {showDescription && (
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
                      )}
                    </Box>
                  ))}
                </Box>
              </>
            </Menu>
          </Box>
        </>
      )}
    />
  );
}
