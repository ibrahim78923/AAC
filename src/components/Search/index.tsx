import React from 'react';

import { TextField, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { debouncedSearch } from '@/utils';

import { SearchPropsI } from '@/types/shared/Search';

import SearchSharedIcon from '@/assets/icons/shared/search-shared';

const Search = ({ label, width, searchBy, setSearchBy }: SearchPropsI) => {
  const theme = useTheme();
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value);
    debouncedSearch(e.target.value, setSearchBy);
  };

  return (
    <TextField
      onChange={handleChangeSearch}
      value={searchBy}
      sx={{
        background: 'transparent',
        '& .MuiOutlinedInput-root ': {
          '& fieldset': {
            textAlign: 'right',
            borderColor: theme?.palette?.grey[700],
            width: width,
            borderRadius: '8px',
            '@media (max-width: 600px)': {
              width: '100%', // Adjust the width for smaller screens
            },
          },
          '&:hover fieldset': {
            borderColor: theme?.palette?.primary?.main,
          },
          '& .MuiInputBase-input': {
            color: theme?.palette?.common?.black,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme?.palette?.grey[700],
          },
        },
      }}
      id="outlined-basic"
      placeholder={label}
      variant="outlined"
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchSharedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
