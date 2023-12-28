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
import Search from '../Search';

import { ArrowDownIcon } from '@/assets/icons';

import { useFormContext, Controller } from 'react-hook-form';

export default function RHFMultiSearchableSelect({
  name,
  options,
  isCheckBox,
  isSearch,
  isAllSelect,
  defaultOpen,
  isFooter,
  footerText,
  footerActionHandler,
  setIsDropdownClose,
  label,
  size,
  ...other
}: any) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  const [isSelectAll, setIsSelectAll] = useState<any>();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  const handelSelectAll = (field: any) => {
    if (isSelectAll) {
      setSelectedValues([]);
      field?.onChange([]);
    } else {
      setSelectedValues(options?.map((option: any) => option?.value));
      field?.onChange(options?.map((option: any) => option?.value));
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleOptionSelect = (value: string, field: any) => {
    if (!selectedValues?.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      field?.onChange([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues?.filter((val) => val !== value));
      field?.onChange(selectedValues?.filter((val) => val !== value));
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
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography sx={{ margin: '0px 0px 6px 0px' }}>{label}</Typography>
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={getSelectedLabels()?.join(', ')}
            onClick={handleClick}
            size={size}
            InputProps={{
              inputRef: inputRef,
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDownIcon />
                </InputAdornment>
              ),
            }}
            sx={{ height: '40px' }}
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
                <Search
                  searchBy={searchTerm}
                  setSearchBy={setSearchTerm}
                  label="Search By Name"
                  fullWidth
                  size="small"
                />
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
                    overflow: 'scroll',
                    maxHeight: '200px',
                  }}
                >
                  <Checkbox
                    onChange={() => handelSelectAll(field)}
                    checked={
                      selectedValues?.length === options?.length ? true : false
                    }
                  />
                  <Typography variant="body1">All</Typography>
                </Box>
              )}
              <Box sx={{ overflow: 'scroll', maxHeight: '200px' }}>
                {filteredOptions &&
                  filteredOptions?.map((option: any) => (
                    <Box
                      key={option?.value}
                      onClick={() => {
                        {
                          isCheckBox
                            ? null
                            : handleOptionSelect(option?.value, field);
                        }
                      }}
                      sx={{
                        width: '100%',
                        height: '30px',
                        padding: '5px 10px',
                        display: 'flex',
                        marginBottom: '10px',
                        marginTop: '10px',
                        gap: '5px',
                        borderRadius: '5px',
                        backgroundColor: isCheckBox
                          ? 'transparent'
                          : selectedValues?.includes(option?.value)
                          ? theme?.palette?.custom?.hex_grey
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: theme?.palette?.custom?.hex_grey,
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
                            handleOptionSelect(option?.value, field);
                          }}
                          checked={
                            selectedValues?.includes(option?.value)
                              ? true
                              : false
                          }
                        />
                      )}
                      <Typography variant="body1">{option?.label}</Typography>
                    </Box>
                  ))}
              </Box>
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
      )}
    />
  );
}
