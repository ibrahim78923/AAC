import React from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { debouncedSearch } from '@/utils';

import { SearchPropsI } from './Search.interface';

import SearchSharedIcon from '@/assets/icons/shared/search-shared';

type CombinedProps = TextFieldProps & SearchPropsI;
const Search = ({ label, width, setSearchBy, ...rest }: CombinedProps) => {
  const theme = useTheme();

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    debouncedSearch(value, setSearchBy);
  };

  return (
    <TextField
      onChange={handleChangeSearch}
      sx={{
        background: 'transparent',
        width: { width },
        '@media (max-width: 600px)': {
          width: '100%',
        },
        '& .MuiOutlinedInput-root ': {
          height: '44px',
          '& fieldset': {
            textAlign: 'right',
            borderColor: theme?.palette?.grey[700],
            borderRadius: '8px',
          },
          '&:hover fieldset': {
            borderColor: theme?.palette?.custom?.light_green,
            boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
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
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchSharedIcon />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default Search;
