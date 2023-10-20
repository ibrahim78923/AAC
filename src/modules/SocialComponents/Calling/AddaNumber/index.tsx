import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Box, Button, MenuItem, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';

import { citiesData } from './AddaNumber.data';

import { CallFilledImage } from '@/assets/images';

import { styles } from './AddaNumber.style';

import { v4 as uuidv4 } from 'uuid';

const AddaNumber = () => {
  const theme = useTheme();

  const [callingSearch, setCallingSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAreaCodeSelected, setIsAreaCodeSelected] = useState(false);

  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>(null);

  const dataToRender = selectedCity?.areaCodes
    ? selectedCity?.areaCodes
    : citiesData;

  const filteredOptions = dataToRender?.filter((option: any) =>
    option.label.toLowerCase().includes(callingSearch.toLowerCase()),
  );

  useEffect(() => {
    if (selectedAreaCode) {
      setIsAreaCodeSelected(true);
    }
  }, [selectedAreaCode]);

  return (
    <Box>
      <Typography variant="h3">Call</Typography>
      <Box sx={styles.wrapperContainer}>
        <Box sx={styles.insetWrapper}>
          <Image src={CallFilledImage} alt="call" />
          <Typography variant="h2">
            {isAreaCodeSelected
              ? `You Selected ${selectedAreaCode.label}`
              : 'Select Air Apple Voice Number'}
          </Typography>
          <Typography
            variant="h4"
            color={theme.palette.custom.grayish_blue}
            fontWeight={500}
            textAlign={'center'}
          >
            {isAreaCodeSelected
              ? 'To complete setup and start using Air Apple Voice Feature, You need to verify your existing phone number.'
              : 'Look for available numbers by city or area code.'}
          </Typography>
          {!isAreaCodeSelected && (
            <Typography
              variant="h4"
              color={theme.palette.custom.grayish_blue}
              textAlign={'center'}
            >
              You Must have an existing code UK-based mobile or landline phone
              number to qualify.
            </Typography>
          )}
          {isAreaCodeSelected && (
            <Button
              variant="contained"
              className="large"
              sx={{ width: '145px', fontSize: '18px', mt: '2' }}
            >
              Verify
            </Button>
          )}
        </Box>
        {!isAreaCodeSelected && (
          <Box sx={{ width: '440px' }}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ padding: '10px 5px' }}
            >
              City
            </Typography>
            <Box onClick={() => setIsDropdownOpen(true)}>
              <Search
                label={'Search here'}
                searchBy={callingSearch}
                setSearchBy={setCallingSearch}
                fullWidth
              />
            </Box>
            {isDropdownOpen && (
              <Box sx={styles.dropDown}>
                <>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    sx={{ padding: '10px 5px' }}
                  >
                    Near by cities
                  </Typography>
                  {filteredOptions.length ? (
                    filteredOptions.map((item: any) => (
                      <MenuItem
                        key={uuidv4()}
                        sx={{ borderRadius: '5px' }}
                        onClick={() => {
                          if (selectedCity) {
                            setSelectedAreaCode(item);
                          } else {
                            setSelectedCity(item);
                          }
                          setCallingSearch('');
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={400}
                            color={theme.palette.grey[600]}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            variant="body3"
                            fontWeight={400}
                            color={theme.palette.grey[600]}
                          >
                            {selectedCity?.label}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      mt={2}
                      mb={2}
                      textAlign={'center'}
                    >
                      No data found
                    </Typography>
                  )}
                </>
              </Box>
            )}
            <Box></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddaNumber;
