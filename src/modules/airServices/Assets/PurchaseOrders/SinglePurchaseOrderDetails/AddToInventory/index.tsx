import {
  ItemStatusImage,
  ItemToInventoryImage,
  TotalItemImage,
} from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { addToInventorySecondDrawerArray } from './AddToInventory.data';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useAddToInventoryDrawer from './useAddToInventory';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './AddToInventory.style';

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
            <Grid item xs={6} sx={styles?.firstGridStyling}>
              <Image
                src={TotalItemImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={styles?.firstMainGridBoxStyling}>
                <Typography variant="h6">Total items received:</Typography>
                <Typography variant="h6" component="span" sx={{ mt: '0.5rem' }}>
                  5/5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} sx={styles?.secondMainGridStyling}>
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={styles?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography component="span" sx={styles?.recievedBoxStyling}>
                  Received
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            display={'Flex'}
            flexDirection={'column'}
            sx={styles?.mainGridStyling}
          >
            <Grid item xs={12} sx={styles?.firstGridMainStyling}>
              <Typography variant="h5">Items added to inventory</Typography>
              <Typography variant="body1">2</Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} sx={styles?.secondGridStyling}>
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
              <Box sx={styles?.secondBoxStyling}>
                <Typography variant="h6">Items to inventory</Typography>
                <Box sx={styles?.thirdBoxStyling}>
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
            <Grid item xs={6} sx={styles?.secondMainsGridStyling}>
              <Image
                src={ItemStatusImage}
                height={24}
                width={24}
                alt="item Status"
              />
              <Box sx={styles?.fourthBoxStyling}>
                <Typography variant="h6">Item Status</Typography>
                <Typography component="span" sx={styles?.recievedBoxStyling}>
                  Received
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormProvider methods={methodsTwo} onSubmit={submitHandlerTwo}>
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
