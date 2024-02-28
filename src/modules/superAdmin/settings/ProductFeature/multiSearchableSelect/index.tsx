import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Checkbox,
  Typography,
  Button,
  useTheme,
} from '@mui/material';

import Search from '@/components/Search';

import { ArrowDownIcon } from '@/assets/icons';

export default function MultiSearchableSelect({
  options,
  isCheckBox,
  isSearch,
  isAllSelect,
  defaultOpen,
  isFooter,
  footerText,
  footerActionHandler,
  setIsDropdownClose,
  setValue,
  ...other
}: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
    if (setIsDropdownClose) {
      setIsDropdownClose(false);
    }
  };

  const handleOptionSelect = (value: string) => {
    if (!selectedValues?.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      setValue([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues?.filter((val) => val !== value));
      setValue(selectedValues?.filter((val) => val !== value));
    }
  };

  const filteredOptions = options?.filter(
    (option: any) =>
      option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  const searchHandler = isSearch === false ? false : true;
  const isAllSelectHandler = isAllSelect === true ? true : false;

  const getSelectedLabels = () => {
    return selectedValues
      ?.map(
        (value) =>
          options?.find((option: any) => option?.value === value)?.label,
      )
      ?.filter((label) => label !== undefined);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (defaultOpen) {
      setAnchorEl(inputRef?.current);
    }
  }, [defaultOpen]);

  return (
    <>
      <TextField
        fullWidth
        {...other}
        value={getSelectedLabels()?.join(', ')}
        onClick={handleClick}
        placeholder="Select Products"
        InputProps={{
          inputRef: inputRef,
          endAdornment: (
            <InputAdornment position="start">
              <ArrowDownIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .css-1y9xby2-MuiInputBase-input-MuiOutlinedInput-input': {
            height: '11px',
          },
          '& .css-4sveug-MuiInputBase-root-MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
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
            width: anchorEl ? anchorEl?.clientWidth : 'auto',
            padding: '10px',
          },
        }}
      >
        <>
          {searchHandler && (
            <Box sx={{ mb: 1 }}>
              <Search
                searchBy={searchTerm}
                setSearchBy={setSearchTerm}
                label="Search By Name"
                fullWidth
                size="small"
                width={'100%'}
                sx={{ marginBottom: '15px' }}
              />
            </Box>
          )}
          {isAllSelectHandler && (
            <Box
              sx={{
                width: '100%',
                height: '30px',
                padding: '5px 10px',
                display: 'flex',
                marginBottom: '10px',
                gap: '5px',
                borderRadius: '5px',
              }}
            >
              <Checkbox
                // onChange={() => handelSelectAll(field)}
                checked={
                  selectedValues?.length === options?.length ? true : false
                }
              />
              <Typography variant="body1">All</Typography>
            </Box>
          )}
          {filteredOptions &&
            filteredOptions?.map((option: any) => (
              <Box
                key={option?.value}
                onClick={() => {
                  {
                    isCheckBox ? null : handleOptionSelect(option?.value);
                  }
                }}
                sx={{
                  width: '100%',
                  height: '30px',
                  padding: '5px 10px',
                  display: 'flex',
                  marginBottom: '10px',
                  gap: '5px',
                  borderRadius: '5px',
                  backgroundColor: isCheckBox
                    ? 'transparent'
                    : selectedValues?.includes(option?.value)
                      ? `${theme?.palette?.custom?.hex_grey}`
                      : 'transparent',
                  '&:hover': {
                    backgroundColor: `${theme?.palette?.custom?.hex_grey}`,
                  },
                }}
              >
                {option?.image && (
                  <Image
                    width={24}
                    height={24}
                    alt="user"
                    src={option?.image}
                  />
                )}
                {isCheckBox && (
                  <Checkbox
                    onClick={() => {
                      handleOptionSelect(option?.value);
                    }}
                    checked={
                      selectedValues?.includes(option?.value) ? true : false
                    }
                  />
                )}
                <Typography variant="body1">{option?.label}</Typography>
              </Box>
            ))}

          {isFooter && (
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={footerActionHandler}
            >
              {footerText}
            </Button>
          )}
        </>
      </Menu>
    </>
  );
}
