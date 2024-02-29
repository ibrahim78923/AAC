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
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDownIcon } from '@/assets/icons';

import { useFormContext, Controller } from 'react-hook-form';
import Search from '@/components/Search';
import CloseIcon from '@mui/icons-material/Close';
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
  const theme = useTheme();
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');

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

      return filteredParentOptions?.options?.length > 0
        ? filteredParentOptions
        : null;
    })
    .filter(Boolean);

  const searchHandler = isSearch === false ? false : true;

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

  const handleRemove = (valueToRemove: any) => {
    const updatedValues = selectedValues.filter(
      (value) => value !== valueToRemove,
    );
    setSelectedValues(updatedValues);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (defaultOpen) {
      setAnchorEl(inputRef?.current);
    }
  }, [defaultOpen]);

  return (
    <>
      <Typography>Add Social Account</Typography>
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
                    label="Search here"
                    fullWidth
                    size="small"
                    sx={{
                      marginBottom: '15px',
                      '& input': {
                        height: '15px',
                      },
                    }}
                  />
                )}

                {filteredOptions &&
                  filteredOptions?.map((option: any) => (
                    <Accordion key={uuidv4()}>
                      <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          backgroundColor:
                            theme?.palette?.custom?.accordian_color,
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
                                ? theme?.palette?.custom?.hex_grey
                                : 'transparent',
                              '&:hover': {
                                backgroundColor:
                                  theme?.palette?.custom?.hex_grey,
                              },
                            }}
                          >
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

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {selectedValues?.map((option: any) => (
                <Box
                  key={uuidv4()}
                  sx={{
                    width: 'fit-content',
                    background: theme?.palette?.grey[400],
                    borderRadius: '20px',
                    color: theme?.palette?.custom?.dim_blue,
                    padding: '1px 8px',
                    display: 'flex',
                    marginRight: '10px',
                    alignItems: 'center',
                    marginTop: '15px',
                  }}
                >
                  {option}

                  <CloseIcon
                    sx={{ fontSize: '18px' }}
                    onClick={() => handleRemove(option)}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
      />
    </>
  );
}
