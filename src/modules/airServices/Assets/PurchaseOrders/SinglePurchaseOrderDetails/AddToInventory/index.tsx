import {
  ItemStatusImage,
  ItemToInventoryImage,
  TotalItemImage,
} from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Chip, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { addToInventoryItemStatus } from './AddToInventory.data';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useAddToInventoryDrawer from './useAddToInventory';
import { v4 as uuidv4 } from 'uuid';

export const AddToInventory = (props: any) => {
  const { isADrawerOpen, setIsADrawerOpen } = props;
  const {
    methodsTwo,
    methodsNo,
    methodsYes,
    boolVariable,
    filteredYes,
    filteredNo,
    submitHandlerTwo,
    submitHandlerNo,
    submitHandlerYes,
    handleRadioChange,
    toShow,
    setToShow,
  } = useAddToInventoryDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={isADrawerOpen}
      onClose={() => {
        setIsADrawerOpen(false);
      }}
      title="Dell Monitor"
      submitHandler={
        boolVariable
          ? toShow === true
            ? submitHandlerYes
            : submitHandlerNo
          : submitHandlerTwo
      }
      footer={true}
      isOk={true}
      okText={
        boolVariable
          ? toShow === true
            ? 'Next'
            : 'Add to Inventory'
          : 'Add to Inventory'
      }
    >
      {boolVariable ? (
        <>
          <Divider />
          <Grid
            container
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Grid item xs={6} display={'flex'} flexDirection={'row'}>
              <Image
                src={TotalItemImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h6" sx={{ ml: '0.5rem' }}>
                  Total items received:
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ mt: '0.5rem', ml: '0.5rem' }}
                >
                  5/5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} display={'flex'} flexDirection={'row'}>
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box
                display={'flex'}
                flexDirection={'column'}
                marginLeft={'0.5rem'}
              >
                <Typography variant="h6">Item Status</Typography>
                <Chip
                  label="Received"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: '0.5rem' }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            display={'Flex'}
            flexDirection={'column'}
            borderRadius="8px"
            border="2px solid #EBFAF8"
            marginTop="1rem"
            marginBottom="1rem"
          >
            <Grid item xs={12} display={'flex'} flexDirection={'column'}>
              <Typography variant="h5">Items added to inventory</Typography>
              <Typography variant="body1" sx={{ mt: '0.5rem', ml: '0.5rem' }}>
                2
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={'row'}
              marginTop={'0.5rem'}
              padding={'1rem'}
            >
              <Box sx={{ width: '180px' }}>
                <FormProvider onSubmit={() => {}} methods={methodsYes}>
                  <RHFTextField
                    name="description"
                    fullWidth
                    placeholder="2"
                    label="Add"
                    required={true}
                  />
                </FormProvider>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                marginLeft={'1rem'}
                marginTop={'2.5rem'}
              >
                <Typography variant="h6">Items to inventory</Typography>
                <Box marginLeft={'0.5rem'} marginTop={'0.1rem'}>
                  <Image
                    src={ItemToInventoryImage}
                    height={24}
                    width={24}
                    alt="item Status"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={toShow ? 'Add New' : 'Update Existing'}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                onClick={() => {
                  setToShow(true);
                }}
                control={<Radio />}
                label="Add New"
                value="Add New"
              />
              <FormControlLabel
                onClick={() => {
                  setToShow(false);
                }}
                control={<Radio />}
                label="Update Existing"
                value="Update Existing"
              />
            </RadioGroup>
            <FormProvider
              methods={toShow === true ? methodsYes : methodsNo}
              onSubmit={toShow === true ? submitHandlerYes : submitHandlerNo}
            >
              <Grid container spacing={2}>
                {toShow === true
                  ? filteredYes?.map((item: any) => (
                      <Grid item xs={4} md={item?.md} key={uuidv4()}>
                        {item?.component && (
                          <item.component
                            {...item.componentProps}
                            size={'small'}
                          >
                            {item?.componentProps?.select
                              ? item?.options?.map((option: any) => (
                                  <option
                                    key={option?.value}
                                    value={option?.value}
                                  >
                                    {option?.label}
                                  </option>
                                ))
                              : null}
                          </item.component>
                        )}
                      </Grid>
                    ))
                  : filteredNo?.map(
                      (item: any) =>
                        item?.component && (
                          <Grid item xs={12} md={item?.md} key={uuidv4()}>
                            {item.componentProps.select ? (
                              <item.component
                                {...item.componentProps}
                                size="small"
                              >
                                {item.options?.map((option: any) => (
                                  <option
                                    key={option?.value}
                                    value={option?.value}
                                  >
                                    {option?.label}
                                  </option>
                                ))}
                              </item.component>
                            ) : (
                              <item.component
                                {...item.componentProps}
                                size="small"
                              />
                            )}
                          </Grid>
                        ),
                    )}
              </Grid>
            </FormProvider>
          </Grid>
        </>
      ) : (
        <>
          <Divider />
          <Grid
            container
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
          >
            <Grid
              item
              xs={6}
              display={'flex'}
              flexDirection={'row'}
              marginBottom={'2rem'}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box>
                <Typography variant="h6">Item Status</Typography>
                <Chip
                  label="Received"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: '0.5rem' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormProvider methods={methodsTwo} onSubmit={submitHandlerTwo}>
                <Grid container spacing={2}>
                  {addToInventoryItemStatus?.map((item: any) => (
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
            </Grid>
          </Grid>
        </>
      )}
    </CommonDrawer>
  );
};
