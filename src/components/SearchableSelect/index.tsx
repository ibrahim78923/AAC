import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const SearchableSelect = () => {
  const [isSearchableSelect, setIsSearchableSelect] = useState(false);

  const textFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target as Node)
      ) {
        setIsSearchableSelect(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchFieldClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        placeholder="Select"
        onClick={() => setIsSearchableSelect(true)}
        sx={{
          width: '100%',
          height: '44px',
          '& .css-s5zijf-MuiInputBase-root-MuiOutlinedInput-root': {
            borderRadius: '8px',
            border: ' #E5E7EB',
          },
        }}
        ref={textFieldRef}
      />

      {isSearchableSelect && (
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            left: '0',
            top: '58px',
            borderRadius: '8px',
            border: '1px solid #F3F4F6',
            background: '#fff',
            boxShadow:
              '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
          }}
        >
          <TextField
            id="search-field"
            label=""
            variant="outlined"
            placeholder="Select"
            onClick={handleSearchFieldClick}
            sx={{
              width: { lg: '440px', md: '440px', sm: '100%', xs: '100%' },
              borderRadius: '8px',
            }}
          />
          <MenuItem value={10}>
            <Typography variant="h6" sx={{ color: 'red' }}>
              h6 (Air Apple Cart)
            </Typography>
          </MenuItem>
        </Box>
      )}
    </Box>
  );
};

export default SearchableSelect;
