import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Button,
  MenuItem,
  Typography,
  useTheme,
  Grid,
} from '@mui/material';

import CommonModal from '@/components/CommonModal';
import Search from '@/components/Search';

import {
  addaNumberDefaultValues,
  addaNumberFiltersDataArray,
  addaNumberValidationSchema,
  citiesData,
} from './AddaNumber.data';

import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';

import { CallFilledImage } from '@/assets/images';

import { styles } from './AddaNumber.style';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const AddaNumber = () => {
  const theme = useTheme();

  const [callingSearch, setCallingSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAreaCodeSelected, setIsAreaCodeSelected] = useState(false);
  const [isVerificationNumberModal, setIsVerificationNumberModal] =
    useState(false);

  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedAreaCode, setSelectedAreaCode] = useState<any>(null);

  const methodsFaqsFilters = useForm({
    resolver: yupResolver(addaNumberValidationSchema),
    defaultValues: addaNumberDefaultValues,
  });

  const onSubmit = () => {
    setSelectedAreaCode(false);
  };
  const { handleSubmit } = methodsFaqsFilters;

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
              onClick={() => setIsVerificationNumberModal(true)}
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
          </Box>
        )}
      </Box>
      <CommonModal
        open={isVerificationNumberModal}
        handleClose={() => setIsVerificationNumberModal(false)}
        handleSubmit={handleSubmit(onSubmit)}
        title="Enter a number to link"
        okText="Send Code"
        cancelText="Cancel"
        footer={true}
        // footerFill
      >
        <>
          <Typography variant="body2" mb={1}>
            Inbound calls to your Air Apple voice number will be forwareded to
            this number
          </Typography>
          <FormProvider
            methods={methodsFaqsFilters}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {addaNumberFiltersDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
          <Box>
            <Typography variant="body2" mt={1}>
              Air AppleCart Voice will send you a text message containing a
              6-digit code. You can also&nbsp;
              <Link
                href=""
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                verify by phone.
              </Link>
            </Typography>
          </Box>
        </>
      </CommonModal>
    </Box>
  );
};

export default AddaNumber;
