import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDownIcon } from '@/assets/icons';

import { useFormContext, Controller } from 'react-hook-form';
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';

export default function RHFMultiSearchableSelectWithAccordion({
  name,
  options,
  isCheckBox,
  isSearch,
  defaultOpen,
  setIsDropdownClose,
  ...other
}: any) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');

  // const [isSelectAll, setIsSelectAll] = useState<any>();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValueImage, setSelectedValueImage] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
    if (setIsDropdownClose) {
      setIsDropdownClose(false);
    }
  };

  // const handelSelectAll = (field: any) => {
  //   if (isSelectAll) {
  //     setSelectedValues([]);
  //     field.onChange([]);
  //   } else {
  //     setSelectedValues(options?.map((option: any) => option?.value));
  //     field.onChange(options?.map((option: any) => option?.value));
  //   }
  //   setIsSelectAll(!isSelectAll);
  // };

  const handleOptionSelect = (value: string, field: any, image: any) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
      field.onChange([...selectedValues, value]);
      setSelectedValueImage([...selectedValueImage, image]);
    } else {
      setSelectedValues(selectedValues?.filter((val) => val !== value));
      field.onChange(selectedValues?.filter((val) => val !== value));
    }
  };

  const filteredOptions = options
    ?.map((parentOption: any) => {
      const filteredParentOptions = {
        ...parentOption,
        options: parentOption?.options?.filter(
          (childOption: any) =>
            childOption?.label
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()),
        ),
      };

      // Only include parent options if there are filtered child options
      return filteredParentOptions?.options?.length > 0
        ? filteredParentOptions
        : null;
    })
    .filter(Boolean);

  const searchHandler = isSearch === false ? false : true;
  // const isAllSelectHandler = isAllSelect === true ? true : false;

  const getSelectedLabels = () => {
    return selectedValues
      ?.map((value) => {
        const parentOption = options?.find(
          (option: any) =>
            option?.options?.some((child: any) => child?.value === value),
        );

        if (parentOption) {
          const childOption = parentOption?.options?.find(
            (child: any) => child?.value === value,
          );
          return childOption?.label;
        }

        return undefined;
      })
      .filter((label) => label !== undefined);
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
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={getSelectedLabels()?.join(', ')}
            onClick={handleClick}
            InputProps={{
              inputRef: inputRef,
              endAdornment: (
                <InputAdornment position="start">
                  <ArrowDownIcon />
                </InputAdornment>
              ),
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
                <Search
                  searchBy={searchTerm}
                  setSearchBy={setSearchTerm}
                  label="Search By Name"
                  fullWidth
                  size="small"
                  sx={{ marginBottom: '15px' }}
                />
              )}
              {/* {isAllSelectHandler && (
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
                    onChange={() => handelSelectAll(field)}
                    checked={
                      selectedValues?.length === options?.length ? true : false
                    }
                  />
                  <Typography variant="body1">All</Typography>
                </Box>
              )} */}

              {filteredOptions &&
                filteredOptions?.map((option: any) => (
                  <Accordion key={uuidv4()}>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{
                        backgroundColor: '#f1f1f17a',
                        borderRadius: '5px',
                        display: 'flex',
                        marginBottom: '5px',
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
                      <Typography sx={{ marginLeft: '10px' }}>
                        {option?.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {option?.options?.map((option: any) => (
                        <Box
                          key={option?.value}
                          onClick={() => {
                            {
                              isCheckBox
                                ? null
                                : handleOptionSelect(
                                    option?.value,
                                    field,
                                    option?.image,
                                  );
                            }
                          }}
                          sx={{
                            width: '100%',
                            height: '40px',
                            padding: '5px 10px',
                            display: 'flex',
                            marginBottom: '10px',
                            gap: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            backgroundColor: isCheckBox
                              ? 'transparent'
                              : selectedValues?.includes(option?.value)
                              ? '#e0e0e0'
                              : 'transparent',
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          }}
                        >
                          {/* 
                          {isCheckBox && (
                            <Checkbox
                              onClick={() => {
                                handleOptionSelect(option?.value, field);
                              }}
                              checked={
                                selectedValues?.includes(option?.value) ? true : false
                              }
                            />
                          )} */}

                          <Box sx={{ display: 'flex', marginTop: '5px' }}>
                            {option?.image && (
                              <Image
                                width={24}
                                height={24}
                                alt="user"
                                src={option?.image}
                              />
                            )}
                            <Typography
                              variant="body1"
                              sx={{ marginLeft: '5px' }}
                            >
                              {option?.label}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </>
          </Menu>

          {/* {selectedValues.length > 0 && (
            <Box
              sx={{
                width: 'fit-content',
                background: '#F3F4F6',
                borderRadius: '20px',
                color: '#6E7191',
                padding: '1px 6px',
                display: 'flex',
              }}
            >
                  {option?.label}
            
            </Box>
          )} */}
        </>
      )}
    />
  );
}
