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
  textareaSearchDropdown,
  wrapperSearchDropdown,
} from './SearchableSelect.style';
import { Controller } from 'react-hook-form';

const SearchableSelect: React.FC<SearchableSelectPropsI> = ({
  dropdownData,
  renderOption,
  name,
  control,
  rules,
}) => {
  const [isSearchableSelect, setIsSearchableSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const [setSelectedDropdownValue] = useState('');
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
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Box
            sx={{
              width: '100%',
              position: 'relative',
            }}
          >
            <TextField
              id={name}
              variant="outlined"
              value={field?.value?.label}
              placeholder="Select"
              contentEditable={false}
              onClick={() => setIsSearchableSelect(true)}
              sx={textareaSearchDropdown}
              ref={textFieldRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ArrowDownIcon />
                  </InputAdornment>
                ),
              }}
              error={fieldState.invalid}
              helperText={fieldState.error?.message || ''}
              {...field}
            />
            {isSearchableSelect && (
              <Box sx={wrapperSearchDropdown}>
                <TextField
                  id={`${name}-search-field`}
                  label=""
                  // value={searchQuery}
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
                      onClick={() => {
                        field.onChange(item.label);
                        setSelectedDropdownValue(item.label);
                        setIsSearchableSelect(false);
                      }}
                    >
                      {renderOption(item)}
                    </MenuItem>
                  ))}
              </Box>
            )}
          </Box>
        </>
      )}
    />
  );
};

export default SearchableSelect;
