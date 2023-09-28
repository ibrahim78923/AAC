import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';

import {
  DropdownDataPropsI,
  SearchableSelectPropsI,
} from './SearchableSelect.interface';

import { ArrowDownIcon } from '@/assets/icons';
import {
  SearchSelectStyles,
  wrapperSearchDropdown,
} from './SearchableSelect.style';

const SearchableSelect: React.FC<SearchableSelectPropsI> = ({
  dropdownData,
  renderOption,
  setValue,
  selectedValue,
}) => {
  const [isSearchableSelect, setIsSearchableSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
  const theme = useTheme();
  const selectOptions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dropdownData.filter((option: DropdownDataPropsI) => {
      for (const key in option) {
        if (
          typeof option[key] === 'string' &&
          option[key].toLowerCase().includes(query)
        ) {
          return true;
        }
      }
      return false;
    });
  }, [dropdownData, searchQuery]);

  const handleSearchFieldClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
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
        value={selectedValue ? selectedValue : selectedDropdownValue}
        placeholder="Select"
        contentEditable={false}
        onClick={() => setIsSearchableSelect(true)}
        sx={{
          '& div': {
            border: 'none',
            '&:hover fieldset': {
              borderColor: '#88DFD3 !important',
              boxShadow: '0px 0px 0px 3px #A0E5DB80',
            },
          },
          width: '100%',
          '& input': {
            height: '44px',
            border: `none`,
            borderRadius: '8px',
            fontSize: '16px',
            padding: '0px 10px',
            color: 'black',
          },
        }}
        ref={textFieldRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDownIcon />
            </InputAdornment>
          ),
        }}
      />
      {isSearchableSelect && (
        <Box sx={wrapperSearchDropdown}>
          <TextField
            id="search-field"
            label=""
            value={searchQuery}
            variant="outlined"
            placeholder="Search Here"
            onClick={handleSearchFieldClick}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={() => SearchSelectStyles.searchSelect(theme)}
          />
          {selectOptions &&
            selectOptions.map((item: DropdownDataPropsI) => (
              <MenuItem
                value={item.id}
                key={item.id}
                onClick={() => (
                  setValue(item), setSelectedDropdownValue(item.label)
                )}
              >
                {renderOption(item)}
              </MenuItem>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchableSelect;
