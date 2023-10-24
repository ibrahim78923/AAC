import {
  ItemStatusImage,
  ItemToInventoryImage,
  TotalItemImage,
} from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import {
  addInventoryDefaultValuesOne,
  addInventoryDefaultValuesOneUpdate,
  addInventoryDefaultValuesTwo,
  addToInventoryDrawerArray,
  addToInventorySecondDrawerArray,
} from './AddToInventoryDrawer.data';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import useAddToInventoryDrawer from './useAddToInventoryDrawer';
import { v4 as uuidv4 } from 'uuid';
import { addToInventoryDrawerStyle } from './AddToInventoryDrawer.style';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
export const AddToInventoryDrawer = ({
  isADrawerOpen,
  setIsADrawerOpen,
}: any) => {
  const {
    methodsTwo,
    handleSubmit2,
    handleSubmitYes,
    methodsNo,
    methodsYes,
    handleSubmitNo,
  } = useAddToInventoryDrawer();
  const [boolVariable, setBoolVariable] = useState(true);
  const [toShow, setToShow] = React.useState(true);

  const handleRadioChange = (event) => {
    setToShow(event.target.value === 'Add New');
  };

  const submitHandlerYes = handleSubmitYes(() => {
    setBoolVariable(false);
    methodsYes.reset(addInventoryDefaultValuesOne);
  });

  const submitHandlerNo = handleSubmitNo(() => {
    setBoolVariable(false);
    methodsNo.reset(addInventoryDefaultValuesOneUpdate);
  });
  const submitHandler2 = handleSubmit2(() => {
    enqueueSnackbar('item added to inventory Successfully', {
      variant: 'success',
    });
    setIsADrawerOpen(false);
    setBoolVariable(true);
    methodsTwo.reset(addInventoryDefaultValuesTwo);
  });

  const filteredYes = addToInventoryDrawerArray.filter((item: any) => {
    return item.toShow === 'Yes';
  });
  const filteredNo = addToInventoryDrawerArray.filter((item: any) => {
    return item.toShow === 'No';
  });

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
          : submitHandler2
      }
      footer={true}
      isOk={true}
      okText={boolVariable ? 'Next' : 'Add to Inventory'}
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
            <Grid item xs={6} sx={addToInventoryDrawerStyle?.firstGridStyling}>
              <Image
                src={TotalItemImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.firstMainGridBoxStyling}>
                <Typography variant="h6">Total items received:</Typography>
                <Typography variant="h6" component="span" sx={{ ml: '0.5rem' }}>
                  5/5
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              sx={addToInventoryDrawerStyle?.secondMainGridStyling}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography
                  component="span"
                  sx={addToInventoryDrawerStyle?.recievedBoxStyling}
                >
                  Received
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            display={'Flex'}
            flexDirection={'column'}
            sx={addToInventoryDrawerStyle?.mainGridStyling}
          >
            <Grid
              item
              xs={12}
              sx={{ flexDirection: 'column', mb: '0rem', p: '1rem' }}
            >
              <Typography variant="h5">Items added to inventory</Typography>
              <Typography variant="body1">2</Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              sx={addToInventoryDrawerStyle?.secondGridStyling}
            >
              <Box sx={{ width: '180px' }}>
                <FormProvider onSubmit={() => {}} methods={methodsTwo}>
                  <RHFTextField
                    name="description"
                    fullWidth
                    placeholder="2"
                    label="Add"
                  />
                </FormProvider>
              </Box>
              <Box sx={addToInventoryDrawerStyle?.secondBoxStyling}>
                <Typography variant="h6">Items to inventory</Typography>
                <Box sx={addToInventoryDrawerStyle?.thirdBoxStyling}>
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
                  : filteredNo?.map((item: any) => (
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
                    ))}
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
              sx={addToInventoryDrawerStyle?.secondMainsGridStyling}
            >
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={addToInventoryDrawerStyle?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography
                  component="span"
                  sx={addToInventoryDrawerStyle?.recievedBoxStyling}
                >
                  Received
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormProvider methods={methodsTwo} onSubmit={submitHandler2}>
                <Grid container spacing={2}>
                  {addToInventorySecondDrawerArray?.map((item: any) => (
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
