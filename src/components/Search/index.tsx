import React from 'react';

import { TextFieldProps } from '@mui/material';
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
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '54%',
          right: '10px',
          transform: 'translateY(-50%)',
        }}
      >
        <SearchSharedIcon />
      </div>
      <input
        type="text"
        onChange={handleChangeSearch}
        style={{
          padding: '14px 10px',

          borderRadius: '8px',
          width: width,
          border: `1px solid ${theme?.palette?.grey[700]}`,
          ':hover': {
            borderColor: theme?.palette?.custom?.light_green,
            boxShadow: `0px 0px 0px 3px ${theme?.palette?.custom?.aqua_breeze}`,
          },
          ':focus': {
            borderColor: theme?.palette?.grey[700],
          },
          '&::placeholder': {
            color: theme?.palette?.common?.black,
          },
        }}
        placeholder={label}
        {...rest}
      />
    </div>
  );
};

export default Search;
