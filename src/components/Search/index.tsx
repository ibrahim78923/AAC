import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchShared from '@/assets/icons/shared/search-shared';

function Search({ onChange, label, width }: any) {
  return (
    <TextField
      onChange={onChange}
      sx={{
        background: 'transparent',
        '& .MuiOutlinedInput-root ': {
          '& fieldset': {
            textAlign: 'right',
            borderColor: '#E5E7EB',
            width: width,
            borderRadius: '8px',
            color: '#6B7280',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#E5E7EB',
          },
        },
      }}
      id="outlined-basic"
      label={label}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchShared />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Search;
